import mockApi from "../../../../resources/tenant/testconfig";
import store from "../../../index";
import { deleteTenant } from "./slice";

test("calling the state of delete-tenant", async () => {
  mockApi.onDelete("/api/tenants/mihir").reply(200, {});
  const result = await store.dispatch(deleteTenant("mihir"));
  expect(result.type).toBe("tenant/deletetenant/fulfilled");
});

test("calling the state of delete-tenant", async () => {
  mockApi.onDelete("/api/tenants/mihir").reply(404, {});
  const result = await store.dispatch(deleteTenant("mihir"));
  expect(result.type).toBe("tenant/deletetenant/rejected");
});
