import mockApi from "../../../../resources/testconfig";
import store from "../../../index";
import { addNewTenant } from "./slice";

test("calling the state of add-tenant", async () => {
  mockApi.onPost("/api/tenants").reply(200, {});

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
});

test("calling the state of add-tenant", async () => {
  mockApi.onPost("/api/tenants").reply(404);

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
});
