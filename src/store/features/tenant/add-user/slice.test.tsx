import mockApi from "../../../../resources/tenant/testconfig";
import store from "../../../../store/index";
import { addNewUser } from "./slice";

test("calling the state of add-user", async () => {
  mockApi.onPost("/api/user").reply(200, {});

  const result = await store.dispatch(
    addNewUser({
      userName: "deepthi",
      email: "deepthi@gmail.com",
      password: "deepthi123",
      roles: ["user"],
      permissions: ["view", "write"],
    })
  );
  expect(result.type).toBe("tenantUser/addUser/fulfilled");
});

test("calling the state of add-user", async () => {
  mockApi.onPost("/api/user").reply(404);

  const result = await store.dispatch(
    addNewUser({
      userName: "deepthi",
      email: "deepthi@gmail.com",
      password: "deepthi123",
      roles: ["user"],
      permissions: ["view", "write"],
    })
  );
  expect(result.type).toBe("tenantUser/addUser/rejected");
});
