import store from "../../../../store/index";
import { getTenantList } from "./slice";

test("calling the state of tenant-list", async () => {
  let state = store.getState().tenantList;

  expect(state.loading).toBeFalsy();

  await store.dispatch(getTenantList({ currentPage: 2, search: "deepthi" }));

  state = store.getState().addNewTenant;
});
