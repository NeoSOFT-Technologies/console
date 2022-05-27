import mockApi from "../../../../../resources/tenant/testconfig";
import store from "../../../../index";
import { getAllTables } from "./slice";

describe("SAAS - GET All Tables Slice", () => {
  test("SAAS - GET All Tables Success", async () => {
    mockApi
      .onGet("manage/table/all-tables?pageNumber=1&pageSize=testTable")
      .reply(200, {});

    const result = await store.dispatch(
      getAllTables({ pageNumber: "1", pageSize: "testTable" })
    );

    //   console.log(result.type);
    expect(result.type).toBe("getAllTable/fulfilled");
  });

  test("SAAS - GET All Tables Failure", async () => {
    mockApi
      .onGet("manage/table/all-tables?pageNumber=1&pageSize=testTable")
      .reply(400, {});
    const result = await store.dispatch(
      getAllTables({ pageNumber: "1", pageSize: "testTable" })
    );

    //   console.log(result.type)
    expect(result.type).toBe("getAllTable/rejected");
  });
});
