import mockApi from "../../../../../resources/tenant/testconfig";
import store from "../../../../index";
import { getTables } from "./slice";

describe("SAAS - GET Tables Slice", () => {
  test("SAAS - GET Tables Success", async () => {
    mockApi.onGet("manage/table/?tenantId=1").reply(200, {});

    const result = await store.dispatch(getTables("1"));

    // console.log(result.type);
    expect(result.type).toBe("getTable/getTables/fulfilled");
  });

  test("SAAS - GET Tables Failure", async () => {
    mockApi.onGet("manage/table/?tenantId=1").reply(400, {});
    const result = await store.dispatch(getTables("1"));

    // console.log(result.type);
    expect(result.type).toBe("getTable/getTables/rejected");
  });
});
