import mockApi from "../../../../resources/testconfig";
import store from "../../../../store/index";
import { addNewUser } from "./slice";

test("calling the state of add-user", async () => {
  mockApi.onPost("/api/user").reply(200, {});

  await store.dispatch(
    addNewUser({
      userName: "deepthi",
      email: "deepthi@gmail.com",
      password: "deepthi123",
      roles: ["user"],
    })
  );
});

test("calling the state of add-user", async () => {
  mockApi.onPost("/api/user").reply(404);

  await store.dispatch(
    addNewUser({
      userName: "deepthi",
      email: "deepthi@gmail.com",
      password: "deepthi123",
      roles: ["user"],
    })
  );
});
