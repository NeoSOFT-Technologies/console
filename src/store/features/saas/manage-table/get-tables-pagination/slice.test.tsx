import mockApi from "../../../../../resources/tenant/testconfig";
import store from "../../../../index";
import { getTableswithPage } from "./slice";
describe("SAAS - GET Tables Slice", () => {
  test("SAAS - GET Tables Success", async () => {
    mockApi
      .onGet("manage/table/tablesList?tenantId=1&pageNumber=1&pageSize=6")
      .reply(200, {});

    const result = await store.dispatch(
      getTableswithPage({ tenantId: "1", pageNumber: "1", pageSize: "6" })
    );

    expect(result.type).toBe("getTablePage/getTables/fulfilled");
  });

  test("SAAS - GET Tables Failure", async () => {
    mockApi
      .onGet("manage/table/tablesList?tenantId=1&pageNumber=1&pageSize=6")
      .reply(400, {});
    const result = await store.dispatch(
      getTableswithPage({ tenantId: "1", pageNumber: "1", pageSize: "6" })
    );

    expect(result.type).toBe("getTablePage/getTables/rejected");
  });
});
