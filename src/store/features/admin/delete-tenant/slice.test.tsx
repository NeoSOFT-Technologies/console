import store from "../../../../store/index";
import { deleteTenant } from "./slice";
test("Deletes a book from list with id", async () => {
  let state = store.getState().deleteTenant;

  expect(state.isDeleted).toBeFalsy();

  await store.dispatch(deleteTenant(9));

  state = store.getState().deleteTenant;
  if (state.loading === false) {
    expect(state.isDeleted).toBeTruthy();
  }
});
test("Deletes a book from list with id", async () => {
  let state = store.getState().deleteTenant;

  expect(state.isDeleted).toBeTruthy();

  await store.dispatch(deleteTenant(9));

  state = store.getState().deleteTenant;
  // console.log(state);
  if (state.loading === true) {
    // console.log(state);
    expect(state.isDeleted).toBeFalsy();
  }
});
