import mockApi from "../../../../../resources/tenant/testconfig";
import store from "../../../../index";
import { getAllDeletedTables } from "./slice";

describe("SAAS - GET All Deleted Tables Slice", () => {
  test("SAAS - GET All Deleted Tables Success", async () => {
    mockApi
      .onGet("manage/table/deletion/all-tables?pageNumber=1&pageSize=testTable")
      .reply(200, {});

    const result = await store.dispatch(
      getAllDeletedTables({ pageNumber: "1", pageSize: "testTable" })
    );

    expect(result.type).toBe("getAllDeleteTable/fulfilled");
  });

  test("SAAS - GET All Deleted Tables Failure", async () => {
    mockApi
      .onGet("manage/table/deletion/all-tables?pageNumber=1&pageSize=testTable")
      .reply(400, {});
    const result = await store.dispatch(
      getAllDeletedTables({ pageNumber: "1", pageSize: "testTable" })
    );

    expect(result.type).toBe("getAllDeleteTable/rejected");
  });
});
