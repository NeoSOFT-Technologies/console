import mockApi from "../../../../resources/tenant/testconfig";
import store from "../../../index";
import { getUserDetails } from "./slice";

test("calling the state of user-details", async () => {
  mockApi
    .onGet("/api/user-info?tenantName=Tenant2&userName=tenantadmin")
    .reply(200, {});

  const result = await store.dispatch(
    getUserDetails({ tenantName: "Tenant2", userName: "tenantadmin" })
  );
  expect(result.type).toBe("user/details/fulfilled");
});

test("calling the state of user-details", async () => {
  mockApi
    .onGet("/api/user-info?tenantName=Tenant2&userName=tenantadmin")
    .reply(404);

  const result = await store.dispatch(
    getUserDetails({ tenantName: "Tenant2", userName: "tenantadmin" })
  );
  expect(result.type).toBe("user/details/rejected");
});
