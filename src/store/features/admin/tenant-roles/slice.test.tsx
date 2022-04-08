import mockApi from "../../../../resources/testconfig";
import store from "../../../index";
import { getTenantRoles } from "./slice";

test("calling the state of tenant-roles", async () => {
  mockApi.onGet(" /api/roles?tenantName=").reply(200, {});

  await store.dispatch(getTenantRoles());
});

test("calling the state of tenant-roles", async () => {
  mockApi.onGet(" /api/roles?tenantName=").reply(404);

  await store.dispatch(getTenantRoles());
});
