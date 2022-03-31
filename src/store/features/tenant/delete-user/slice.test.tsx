import store from "../../../../store/index";
import { deleteUser } from "./slice";

test("calling the state of delete-user", async () => {
  let state = store.getState().deleteUser;

  expect(state.loading).toBeFalsy();

  await store.dispatch(deleteUser("deepthi"));

  state = store.getState().deleteUser;
});
