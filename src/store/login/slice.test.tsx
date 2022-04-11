import mockApi from "../../resources/testconfig";
import store from "../index";
import { commonLogin } from "./slice";

test("calling the state of login", async () => {
  mockApi.onPost("/api/login").reply(200, {});
  const result = await store.dispatch(
    commonLogin({
      userName: "deepthi",
      password: "deepti@1",
      tenantName: "paras",
    })
  );
  expect(result.type).toBe("user/get_acessToken/fulfilled");
});

test("should give an error", async () => {
  mockApi.onPost("/api/login").reply(404);
  const result = await store.dispatch(
    commonLogin({
      userName: "deepthi",
      password: "deepti@1",
      tenantName: "paras",
    })
  );
  expect(result.type).toBe("user/get_acessToken/rejected");
});
