import mockApi from "../../../../../resources/tenant/testconfig";
import store from "../../../../index";
import { inputTableDataWithNrt } from "./slice";

describe("SAAS - INPUT DATA NRT Slice", () => {
  test("SAAS - INPUT DATA NRT Success", async () => {
    mockApi.onPost("ingest-nrt/testTable?tenantId=1").reply(200, {});

    const result = await store.dispatch(
      inputTableDataWithNrt({
        inputData: "abcd",
        requestParams: {
          tenantId: "1",
          tableName: "testTable",
          tenantName: "master",
        },
      })
    );

    expect(result.type).toBe("inputDataWithNrt/fulfilled");
  });

  test("SAAS - INPUT DATA NRT Failure", async () => {
    mockApi.onPost("ingest-nrt/testTable?tenantId=1").reply(400, {});

    const result = await store.dispatch(
      inputTableDataWithNrt({
        inputData: "abcd",
        requestParams: {
          tenantId: "1",
          tableName: "testTable",
          tenantName: "master",
        },
      })
    );

    expect(result.type).toBe("inputDataWithNrt/rejected");
  });
});
