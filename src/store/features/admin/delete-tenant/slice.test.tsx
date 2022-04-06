import store from "../../../../store/index";
import { deleteTenant } from "./slice";
test("calling the state of delete-tenant", async () => {
  let state = store.getState().deleteTenant;

  expect(state.isDeleted).toBeFalsy();

  await store.dispatch(deleteTenant("mihir"));

  state = store.getState().deleteTenant;
  if (state.loading === false) {
    expect(state.isDeleted).toBeTruthy();
  }
});
test("calling the state of delete-tenant", async () => {
  let state = store.getState().deleteTenant;

  expect(state.isDeleted).toBeTruthy();

  await store.dispatch(deleteTenant("mihir"));

  state = store.getState().deleteTenant;

  if (state.loading === true) {
    expect(state.isDeleted).toBeFalsy();
  }
});
