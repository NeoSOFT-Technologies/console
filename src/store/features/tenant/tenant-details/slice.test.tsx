import mockApi from "../../../../resources/tenant/testconfig";
import store from "../../../index";
import { tenantDetails } from "./slice";

const response = {};

test("calling the state of tenant-details", async () => {
  mockApi.onGet("/api/tenants/4").reply(200, {});
  await store.dispatch(tenantDetails("deepthi"));
});

test("calling the state of tenant-details", async () => {
  mockApi.onGet("/api/tenants/4").reply(404, response);
  await store.dispatch(tenantDetails("deepthi"));
});
