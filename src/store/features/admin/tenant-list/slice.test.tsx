import store from "../../../../store/index";
import { getTenantList } from "./slice";

test("Deletes a book from list with id", async () => {
  let state = store.getState().tenantList;

  expect(state.loading).toBeFalsy();

  await store.dispatch(getTenantList({ currentPage: 2, search: "deepthi" }));

  state = store.getState().addNewTenant;
  //   if (state.loading === false) {
  //     expect(state.data === "action.payload").toBeDefined();
  //   }
});
