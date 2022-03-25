import store from "../../../../store/index";
import { getTenantUserList } from "./slice";

test("Deletes a book from list with id", async () => {
  let state = store.getState().tenantUserList;

  expect(state.loading).toBeFalsy();

  await store.dispatch(
    getTenantUserList({ currentPage: 2, search: "deepthi" })
  );

  state = store.getState().tenantUserList;
  //   if (state.loading === false) {
  //     expect(state.tenantAdded).toBeTruthy();
  //   }
});
