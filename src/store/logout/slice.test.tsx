import mockApi from "../../resources/tenant/testconfig";
import store from "../index";
import { commonLogout } from "./slice";

test("calling the state of logout", async () => {
  mockApi.onPost("api/logout").reply(200, {});
  const result = await store.dispatch(commonLogout());
  expect(result.type).toBe("user/logout/fulfilled");
});

test("calling the state of logout should give an error", async () => {
  mockApi.onPost("api/logout").reply(404);
  const result = await store.dispatch(commonLogout());
  expect(result.type).toBe("user/logout/rejected");
});
