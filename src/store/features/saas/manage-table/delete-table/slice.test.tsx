import mockApi from "../../../../../resources/tenant/testconfig";
import store from "../../../../index";
import { deleteTable } from "./slice";

describe("SAAS - CREATE Table Slice", () => {
  test("SAAS - DELETE TABLE Success", async () => {
    mockApi.onDelete("manage/table/testTable?tenantId=1").reply(200, {});
    const result = await store.dispatch(
      deleteTable({ tenantId: "1", tableName: "testTable" })
    );

    // console.log(result.type);
    expect(result.type).toBe("deleteTableByTableName/fulfilled");
  });

  test("SAAS - DELETE TABLE Failure", async () => {
    mockApi.onDelete("manage/table/testTable?tenantId=1").reply(400, {});
    const result = await store.dispatch(
      deleteTable({ tenantId: "1", tableName: "testTable" })
    );

    // console.log(result.type)
    expect(result.type).toBe("deleteTableByTableName/rejected");
  });
});
