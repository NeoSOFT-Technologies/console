import mockApi from "../../../../../resources/tenant/testconfig";
import store from "../../../../index";
import { createTable } from "./slice";

describe("SAAS - CREATE Table Slice", () => {

  test("SAAS - CREATE TABLE Success", async () => {
    mockApi.onPost("manage/table/?tenantId=1").reply(200, {});

    const result = await store.dispatch(
      createTable({
        tenantId: "1",
        requestData: {
          tableName: "test",
          sku: "B",
          columns: [
            {
              name: "testCol",
              type: "string",
              required: true,
              sortable: true,
              filterable: true,
              multiValue: true,
              storable: true,
              partialSearch: false,
            },
          ],
        },
      })
    );

    // console.log(result.type);
    expect(result.type).toBe("createTable/fulfilled");
  });


  test("SAAS - CREATE TABLE Failure", async () => {
    mockApi.onPost("manage/table/?tenantId=1").reply(400, {});

    const result = await store.dispatch(
      createTable({
        tenantId: "1",
        requestData: {
          tableName: "test",
          sku: "B",
          columns: [
            {
              name: "testCol",
              type: "string",
              required: true,
              sortable: true,
              filterable: true,
              multiValue: true,
              storable: true,
              partialSearch: false,
            },
          ],
        },
      })
    );

    // console.log(result.type);
    expect(result.type).toBe("createTable/rejected");
  });


});
