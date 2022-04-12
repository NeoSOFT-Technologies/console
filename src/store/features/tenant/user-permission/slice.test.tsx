import mockApi from "../../../../resources/testconfig";
import store from "../../../../store/index";
import { userPermission } from "./slice";

test("calling the state of user-permission", async () => {
  mockApi.onGet("/api/permission?tenantName=deepthi").reply(200, {});

  await store.dispatch(userPermission("deepthi"));
});

test("calling the state of user-permission", async () => {
  mockApi.onGet("/api/permission?tenantName=deepthi").reply(404);

  await store.dispatch(userPermission("deepthi"));
});
