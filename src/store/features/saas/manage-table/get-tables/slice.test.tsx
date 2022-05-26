import mockApi from "../../../../../resources/tenant/testconfig";
import store from "../../../../index";
import { getTables } from "./slice";

test("calling the state of add-tenant", async () => {
  mockApi.onGet("/getTable/getTabdles/").reply(200, {});

  await store.dispatch(getTables("1"));
});
