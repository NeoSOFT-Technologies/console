import mockApi from "../../../../../resources/tenant/testconfig";
import store from "../../../../index";
import { searchDataWithQueryField } from "./slice";

describe("SAAS - SEARCH Tables With Query Field Slice", () => {
  test("SAAS - SEARCH Tables With Query Field Success", async () => {
    mockApi
      .onGet(
        "testTable?tenantId=1&queryField=id&searchTerm=a&startRecord=0&pageSize=5&orderBy=id&order=asc"
      )
      .reply(200, { data: {} });

    const result = await store.dispatch(
      searchDataWithQueryField({
        queryField: "id",
        searchTerm: "a",
        startRecord: "0",
        pageSize: "5",
        orderBy: "id",
        order: "asc",
        requestParams: { tenantId: "1", tableName: "testTable" },
      })
    );

    console.log(result.type);
    expect(result.type).toBe("searchDataWithQueryField/fulfilled");
  });

  test("SAAS - SEARCH Tables With Query Field Failure", async () => {
    mockApi
      .onGet(
        "testTable?tenantId=1&queryField=id&searchTerm=1&startRecord=0&pageSize=5&orderBy=id&order=asc"
      )
      .reply(400, {});
    const result = await store.dispatch(
      searchDataWithQueryField({
        queryField: "id",
        searchTerm: "1",
        startRecord: "0",
        pageSize: "5",
        orderBy: "id",
        order: "asc",
        requestParams: { tenantId: "1", tableName: "testTable" },
      })
    );

    // console.log(result.type);
    expect(result.type).toBe("searchDataWithQueryField/rejected");
  });
});
