import mockApi from "../../../../resources/tenant/testconfig";
import store from "../../../../store/index";
import { updateUser } from "./slice";

const response = {
  data: {
    userName: "deepthi",
    action: { email: "mailto:deepthi@gmail.com", realmRoles: ["user"] },
  },
};

test("calling the state of update-user", async () => {
  mockApi.onPatch("/api/user").reply(200, {});
  const result = await store.dispatch(
    updateUser({
      username: "deepthi",
      email: "mailto:deepthi@gmail.com",
      roles: ["user"],
    })
  );
  expect(result.type).toBe("user/update/fulfilled");
});

test("calling the state of update-user", async () => {
  mockApi.onPatch("/api/user").reply(404, response);
  const result = await store.dispatch(
    updateUser({
      username: "deepthi",
      email: "mailto:deepthi@gmail.com",
      roles: ["user"],
    })
  );
  expect(result.type).toBe("user/update/rejected");
});
