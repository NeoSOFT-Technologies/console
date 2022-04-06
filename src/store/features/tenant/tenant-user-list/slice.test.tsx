import store from "../../../../store/index";
import { getTenantUserList } from "./slice";

test("calling the state of tenant-user-list", async () => {
  let state = store.getState().tenantUserList;

  expect(state.loading).toBeFalsy();

  await store.dispatch(
    getTenantUserList({
      tenantName: "deepthi",
      userName: "deepthi",
      currentPage: 2,
    })
  );

  state = store.getState().tenantUserList;
});
