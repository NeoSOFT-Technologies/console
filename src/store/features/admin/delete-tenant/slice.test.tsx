import mockApi from "../../../../resources/testconfig";
import store from "../../../index";
import { deleteTenant } from "./slice";

test("calling the state of delete-tenant", async () => {
  mockApi.onDelete("/api/tenants/mihir").reply(200, {});
  await store.dispatch(deleteTenant("mihir"));
});

test("calling the state of delete-tenant", async () => {
  mockApi.onDelete("/api/tenants/mihir").reply(404, {});
  await store.dispatch(deleteTenant("mihir"));
});
