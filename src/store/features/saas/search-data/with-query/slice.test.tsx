import mockApi from "../../../../../resources/tenant/testconfig";
import store from "../../../../index";
import { searchDataWithQuery } from "./slice";

describe("SAAS - SEARCH Tables With Query Slice", () => {
  test("SAAS - SEARCH Tables With Query Success", async () => {
    mockApi
      .onGet(
        "testTable?tenantId=1&searchQuery=abc&startRecord=0&pageSize=5&orderBy=id&order=asc"
      )
      .reply(200, {});

    const result = await store.dispatch(
      searchDataWithQuery({
        searchQuery: "abc",
        startRecord: "0",
        pageSize: "5",
        orderBy: "id",
        order: "asc",
        requestParams: { tenantId: "1", tableName: "testTable" },
      })
    );

    // console.log(result.type);
    expect(result.type).toBe("searchDataWithQuery/fulfilled");
  });

  test("SAAS - SEARCH Tables With Query Failure", async () => {
    mockApi
      .onGet(
        "testTable?tenantId=1&searchQuery=*&startRecord=0&pageSize=5&orderBy=id&order=asc"
      )
      .reply(400, {});
    const result = await store.dispatch(
      searchDataWithQuery({
        searchQuery: "*",
        startRecord: "0",
        pageSize: "5",
        orderBy: "id",
        order: "asc",
        requestParams: { tenantId: "1", tableName: "testTable" },
      })
    );

    // console.log(result.type);
    expect(result.type).toBe("searchDataWithQuery/rejected");
  });
});
