import store from "../../../../store/index";
import { getTenantRoles } from "./slice";

test("calling the state of tenant-roles", async () => {
  let state = store.getState().rolesList;

  expect(state.loading).toBeFalsy();

  await store.dispatch(getTenantRoles());

  state = store.getState().rolesList;
});
