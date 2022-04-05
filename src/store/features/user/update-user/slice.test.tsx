import store from "../../../../store/index";
import { updateUser } from "./slice";

test("calling the state of update-user", async () => {
  let state = store.getState().updateUser;

  expect(state.loading).toBeFalsy();

  await store.dispatch(
    updateUser({ userName: "deepthi", email: "deepthi@gmail.com" })
  );

  state = store.getState().updateUser;
  if (state.loading === false) {
    expect(state.isUpdated).toBeTruthy();
  }
});
