import mockApi from "../../../../../resources/tenant/testconfig";
import store from "../../../../index";
import { getTableSchema } from "./slice";

describe("SAAS - GET Table Schema Slice", () => {
  test("SAAS - GET Table Schema Success", async () => {
    mockApi.onGet("manage/table/testTable?tenantId=1").reply(200, {
      statusCode: 200,
      message: "Table Information retrieved successfully",
      data: {
        tableName: "testTable",
        columns: [
          {
            name: "id",
            type: "string",
            required: true,
            multiValue: false,
            sortable: false,
            filterable: true,
            storable: true,
            partialSearch: false,
          },
          {
            name: "name",
            type: "strings",
            required: true,
            multiValue: true,
            sortable: false,
            filterable: true,
            storable: true,
            partialSearch: true,
          },
        ],
      },
    });

    const result = await store.dispatch(
      getTableSchema({ tenantId: "1", tableName: "testTable" })
    );

    expect(result.type).toBe("getTableSchemaByTableName/fulfilled");
  });

  test("SAAS - GET Table Schema Failure", async () => {
    mockApi.onGet("manage/table/testTable?tenantId=1").reply(400, {});
    const result = await store.dispatch(
      getTableSchema({ tenantId: "1", tableName: "testTable" })
    );

    expect(result.type).toBe("getTableSchemaByTableName/rejected");
  });
});
