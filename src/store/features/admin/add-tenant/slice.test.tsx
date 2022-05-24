import mockApi from "../../../../resources/tenant/testconfig";
import store from "../../../index";
import { addNewTenant } from "./slice";

test("calling the state of add-tenant", async () => {
  mockApi.onPost("/api/tenants").reply(200, {});

  const result = await store.dispatch(
    addNewTenant({
      tenantName: "Test",
      email: "Test@gmail.com",
      password: "Test@123",
      description: "i am Test",
      databaseName: "db-Test",
      databaseDescription: "",
      username: "",
    })
  );
  // console.log(result);
  expect(result.type).toBe("tenant/addnewtenant/fulfilled");
});

test("calling the state of add-tenant", async () => {
  mockApi.onPost("/api/tenants").reply(404);

  const result = await store.dispatch(
    addNewTenant({
      tenantName: "Test",
      email: "Test@gmail.com",
      password: "Test@123",
      description: "i am Test",
      databaseName: "db-Test",
      databaseDescription: "",
      username: "",
    })
  );
  expect(result.type).toBe("tenant/addnewtenant/rejected");
});
