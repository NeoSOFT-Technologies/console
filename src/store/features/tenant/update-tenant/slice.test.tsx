import store from "../../../../store/index";
import { updateTenant } from "./slice";

test("calling the state of update-tenant", async () => {
  let state = store.getState().updateTenantState;

  expect(state.loading).toBeFalsy();

  await store.dispatch(
    updateTenant({
      id: 2,
      tenantId: 2,
      tenantName: "Test",
      description: "i am Test",
      createdDateTime: "",
      databaseName: "db-Test",
      host: "127.0.0.1",
      port: 3306,
      policy: "",
    })
  );

  state = store.getState().updateTenantState;
});
