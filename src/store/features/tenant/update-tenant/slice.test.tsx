import store from "../../../../store/index";
import { updateTenant } from "./slice";

test("Deletes a book from list with id", async () => {
  let state = store.getState().updateTenant;

  expect(state.loading).toBeFalsy();

  await store.dispatch(updateTenant({ id: 9, data: {} }));

  state = store.getState().updateTenant;
  //   if (state.loading === false) {
  //     expect(state.tenantAdded).toBeTruthy();
  //   }
});
