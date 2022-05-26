import mockApi from "../../../../../resources/tenant/testconfig";
import store from "../../../../index";
import { updateTableSchema } from "./slice";

describe("SAAS - UPDATE Table Slice", () => {

  test("SAAS - UPDATE Table Success", async () => {
    mockApi.onPut("manage/table/testTable?tenantId=1").reply(200, {});

    const result = await store.dispatch(
      updateTableSchema({
        requestParams: { tenantId: "1", tableName: "testTable" },
        requestData: {
          tableName: "testTable",
          columns: [
            {
              name: "id",
              type: "string",
              required: true,
              sortable: true,
              filterable: true,
              multiValue: true,
              storable: true,
              partialSearch: true,
            },
          ],
        },
      })
    );

    // console.log(result.type);
    expect(result.type).toBe("updateSchemaTable/fulfilled");
  });


  test("SAAS - UPDATE Table Failure", async () => {
    mockApi.onPut("manage/table/testTable?tenantId=1").reply(400, {});

    const result = await store.dispatch(updateTableSchema({
        requestParams: { tenantId: "1", tableName: "testTable" },
        requestData: {
          tableName: "testTable",
          columns: [
            {
              name: "id",
              type: "string",
              required: true,
              sortable: true,
              filterable: true,
              multiValue: true,
              storable: true,
              partialSearch: true,
            },
          ],
        },
      }));

    // console.log(result.type);
    expect(result.type).toBe("updateSchemaTable/rejected");
  });
});
