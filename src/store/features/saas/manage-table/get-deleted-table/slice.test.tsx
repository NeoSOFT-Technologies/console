import mockApi from "../../../../../resources/tenant/testconfig";
import store from "../../../../index";
import { getDeletedTableByTenant } from "./slice";

describe("SAAS - GET Deleted Tables By TenantId Slice", () => {
  test("SAAS - GET Deleted Tables By TenantId Success", async () => {
    mockApi
      .onGet("manage/table/deletion?tenantId=1&pageNumber=1&pageSize=6")
      .reply(200, {});

    const result = await store.dispatch(
      getDeletedTableByTenant({ tenantId: "1", pageNumber: "1", pageSize: "6" })
    );

    expect(result.type).toBe("getDeleteTable/fulfilled");
  });

  test("SAAS - GET Deleted Tables By TenantId Failure", async () => {
    mockApi
      .onGet("manage/table/deletion?tenantId=1&pageNumber=1&pageSize=6")
      .reply(400, {});
    const result = await store.dispatch(
      getDeletedTableByTenant({
        tenantId: "1",
        pageNumber: "1",
        pageSize: "6",
      })
    );

    expect(result.type).toBe("getDeleteTable/rejected");
  });
});
