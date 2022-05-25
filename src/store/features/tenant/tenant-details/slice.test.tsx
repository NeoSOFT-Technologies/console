import mockApi from "../../../../resources/tenant/testconfig";
import store from "../../../index";
import { tenantDetails } from "./slice";

const response = {};

test("calling the state of tenant-details", async () => {
  mockApi.onGet("/api/tenant-info?tenantName=Tenant2").reply(200, {});
  const result = await store.dispatch(tenantDetails("Tenant2"));

  expect(result.type).toBe("tenant/details/fulfilled");
});

test("calling the state of tenant-details", async () => {
  mockApi.onGet("/api/tenant-info?tenantName=Tenant2").reply(404, response);
  const result = await store.dispatch(tenantDetails("Tenant2"));

  expect(result.type).toBe("tenant/details/rejected");
});
