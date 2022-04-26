import mockApi from "../../../../resources/tenant/testconfig";
import store from "../../../../store/index";
import { deleteUser } from "./slice";

test("calling the state of delete-user", async () => {
  mockApi.onDelete("/api/user/deepthi").reply(200, {});
  await store.dispatch(deleteUser("deepthi"));
});

test("calling the state of delete-user", async () => {
  mockApi.onDelete("/api/user/deepthi").reply(404, {});
  await store.dispatch(deleteUser("deepthi"));
});
