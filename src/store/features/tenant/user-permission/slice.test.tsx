import store from "../../../../store/index";
import { userPermission } from "./slice";

test("calling the state of user-permission", async () => {
  let state = store.getState().updateTenant;

  expect(state.loading).toBeFalsy();

  await store.dispatch(
    userPermission({ tenantName: "deepthi", clientName: "deepthi" })
  );

  state = store.getState().updateTenant;
});
