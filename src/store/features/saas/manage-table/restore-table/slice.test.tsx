import mockApi from "../../../../../resources/tenant/testconfig";
import store from "../../../../index";
import { restoreTable } from "./slice";

describe("SAAS - RESTORE Table Slice", () => {
  test("SAAS - RESTORE Table Success", async () => {
    mockApi.onPut("manage/table/restore/testTable?tenantId=1").reply(200, {});

    const result = await store.dispatch(
      restoreTable({
        tenantId: "1",
        tableName: "testTable",
        tenantName: "master",
      })
    );

    expect(result.type).toBe("restoreTableByTableName/fulfilled");
  });

  test("SAAS - RESTORE Table Failure", async () => {
    mockApi.onPut("manage/table/restore/testTable?tenantId=1").reply(400, {});
    const result = await store.dispatch(
      restoreTable({
        tenantId: "1",
        tableName: "testTable",
        tenantName: "master",
      })
    );

    expect(result.type).toBe("restoreTableByTableName/rejected");
  });
});
