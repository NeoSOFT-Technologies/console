import mockApi from "../../../../resources/tenant/testconfig";
import store from "../../../../store/index";
import { updateTenant } from "./slice";

const response = {
  data: {
    action: {
      id: 2,
      tenantId: 2,
      tenantName: "Test",
      description: "i am Test",
      createdDateTime: "",
      databaseName: "db-Test",
      host: "127.0.0.1",
      port: 3306,
      policy: "",
    },
  },
};

test("calling the state of  update-tenant", async () => {
  mockApi.onPatch("/api/tenants").reply(200, {});
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
});

test("calling the state of update-tenant", async () => {
  mockApi.onPatch("/api/tenants").reply(404, response);
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
});
