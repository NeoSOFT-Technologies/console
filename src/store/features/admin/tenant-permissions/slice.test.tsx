import mockApi from "../../../../resources/testconfig";
import store from "../../../index";
import { getTenantPermissions } from "./slice";

test("calling the state of tenant-permission", async () => {
  mockApi.onGet("/api/permission?tenantName=deepthi").reply(200, {});

  await store.dispatch(getTenantPermissions("deepthi"));
});

test("calling the state of tenant-permission", async () => {
  mockApi.onGet("/api/permission?tenantName=deepthi").reply(404);

  await store.dispatch(getTenantPermissions("deepthi"));
});
