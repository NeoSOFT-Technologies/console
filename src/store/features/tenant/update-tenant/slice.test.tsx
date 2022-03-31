import store from "../../../../store/index";
import { updateTenant } from "./slice";

test("calling the state of update-tenant", async () => {
  let state = store.getState().updateTenant;

  expect(state.loading).toBeFalsy();

  await store.dispatch(updateTenant({ tenantName: "deepthi", roles: [] }));

  state = store.getState().updateTenant;
});
