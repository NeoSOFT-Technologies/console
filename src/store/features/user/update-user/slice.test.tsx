import mockApi from "../../../../resources/testconfig";
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
  await store.dispatch(
    updateUser({
      username: "deepthi",
      email: "mailto:deepthi@gmail.com",
      roles: ["user"],
    })
  );
});

test("calling the state of update-user", async () => {
  mockApi.onPatch("/api/user").reply(404, response);
  await store.dispatch(
    updateUser({
      username: "deepthi",
      email: "mailto:deepthi@gmail.com",
      roles: ["user"],
    })
  );
});
