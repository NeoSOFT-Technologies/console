import store from "../../../../store/index";
import { addNewTenant } from "./slice";

test("Deletes a book from list with id", async () => {
  let state = store.getState().addNewTenant;

  expect(state.loading).toBeFalsy();

  await store.dispatch(addNewTenant({}));

  state = store.getState().addNewTenant;
  if (state.loading === false) {
    expect(state.tenantAdded).toBeTruthy();
  }
});
