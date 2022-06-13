import mockApi from "../../../../resources/tenant/testconfig";
import store from "../../../index";
import { getTenantRoles } from "./slice";

test("calling the state of tenant-role", async () => {
  mockApi.onGet("/api/roles?tenantName=").reply(200, {});

  const result = await store.dispatch(getTenantRoles());
  expect(result.type).toBe("tenant/roles/fulfilled");
});

test("calling the state of tenant-roles", async () => {
  mockApi.onGet("/api/roles?tenantName=").reply(404);

  const result = await store.dispatch(getTenantRoles());
  expect(result.type).toBe("tenant/roles/rejected");
});
