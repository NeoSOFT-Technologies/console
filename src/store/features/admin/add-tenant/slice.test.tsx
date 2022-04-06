import store from "../../../../store/index";
import { addNewTenant } from "./slice";

test("calling the state of add-tenant", async () => {
  let state = store.getState().addNewTenant;

  expect(state.loading).toBeFalsy();

  await store.dispatch(
    addNewTenant({
      tenantName: "Test",
      email: "Test@gmail.com",
      password: "Test@123",
      description: "i am Test",
      databaseName: "db-Test",
      databaseDescription: "",
    })
  );

  state = store.getState().addNewTenant;
  if (state.loading === false) {
    expect(state.tenantAdded).toBeTruthy();
  }
});
