import store from "../../../../store/index";
import { addNewTenant } from "./slice";

test("calling the state of add-tenant", async () => {
  let state = store.getState().addNewTenant;

  expect(state.loading).toBeFalsy();

  await store.dispatch(addNewTenant({ tenantName: "deepthi", roles: [] }));

  state = store.getState().addNewTenant;
  if (state.loading === false) {
    expect(state.tenantAdded).toBeTruthy();
  }
});
