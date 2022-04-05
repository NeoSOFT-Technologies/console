import store from "../../../../store/index";
import { tenantDetails } from "./slice";

test("calling the state of tenant-details", async () => {
  let state = store.getState().tenantDetails;

  expect(state.loading).toBeFalsy();

  await store.dispatch(tenantDetails("deepthi"));

  state = store.getState().tenantDetails;
});
