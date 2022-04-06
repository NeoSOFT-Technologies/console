import store from "../../../../store/index";
import { updateUser } from "./slice";

test("calling the state of update-user", async () => {
  let state = store.getState().updateUserData;

  expect(state.loading).toBeFalsy();

  await store.dispatch(
    updateUser({
      username: "deepthi",
      email: "deepthi@gmail.com",
      roles: ["user"],
    })
  );

  state = store.getState().updateUserData;
  if (state.loading === false) {
    expect(state.isUpdated).toBeTruthy();
  }
});
