import store from "../../../../store/index";
import { getTenantPermissions } from "./slice";

test("calling the state of tenant-permissions", async () => {
  let state = store.getState().tenantPermissionsList;

  expect(state.loading).toBeFalsy();

  await store.dispatch(getTenantPermissions("deepthi"));

  state = store.getState().tenantPermissionsList;
});
