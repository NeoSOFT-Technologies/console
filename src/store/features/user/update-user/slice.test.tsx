import store from "../../../../store/index";
import { updateUser } from "./slice";

test("Deletes a book from list with id", async () => {
  let state = store.getState().updateUser;

  expect(state.loading).toBeFalsy();

  await store.dispatch(updateUser({ id: 9, password: "deepthi" }));

  state = store.getState().updateUser;
  if (state.loading === false) {
    expect(state.isUpdated).toBeTruthy();
  }
});
