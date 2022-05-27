import mockApi from "../../../../resources/tenant/testconfig";
import store from "../../../../store/index";
import { deleteUser } from "./slice";

test("calling the state of delete-user", async () => {
  mockApi.onDelete("/api/user/deepthi").reply(200, {});
  const result = await store.dispatch(deleteUser("deepthi"));
  expect(result.type).toBe("tenantUser/list/fulfilled");
});

test("calling the state of delete-user", async () => {
  mockApi.onDelete("/api/user/deepthi").reply(404, {});
  const result = await store.dispatch(deleteUser("deepthi"));
  expect(result.type).toBe("tenantUser/list/rejected");
});
