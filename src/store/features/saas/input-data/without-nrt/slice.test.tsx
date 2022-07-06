import mockApi from "../../../../../resources/tenant/testconfig";
import store from "../../../../index";
import { inputTableDataWithoutNrt } from "./slice";

describe("SAAS - INPUT DATA WITHOUT NRT Slice", () => {
  test("SAAS - INPUT DATA WITHOUT NRT Success", async () => {
    mockApi.onPost("ingest/testTable?tenantId=1").reply(200, {});

    const result = await store.dispatch(
      inputTableDataWithoutNrt({
        inputData: "abcd",
        requestParams: { tenantId: "1", tableName: "testTable" },
      })
    );

    expect(result.type).toBe("inputDataWithoutNrt/fulfilled");
  });

  test("SAAS - INPUT DATA WITHOUT NRT Failure", async () => {
    mockApi.onPost("ingest/testTable?tenantId=1").reply(400, {});

    const result = await store.dispatch(
      inputTableDataWithoutNrt({
        inputData: "abcd",
        requestParams: { tenantId: "1", tableName: "testTable" },
      })
    );
    expect(result.type).toBe("inputDataWithoutNrt/rejected");
  });
});
