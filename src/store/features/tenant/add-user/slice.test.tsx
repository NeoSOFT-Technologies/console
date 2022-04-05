import store from "../../../../store/index";
import { addNewUser } from "./slice";

test("calling the state of add-user", async () => {
  let state = store.getState().addNewUser;

  expect(state.loading).toBeFalsy();

  await store.dispatch(
    addNewUser({
      userName: "deepthi",
      email: "deepthi@gmail.com",
      password: "deepthi123",
      roles: [],
    })
  );

  state = store.getState().addNewUser;
  if (state.loading === false) {
    expect(state.isAdded).toBeTruthy();
  }
});
