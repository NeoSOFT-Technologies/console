import mockApi from "../../../../../resources/tenant/testconfig";
import store from "../../../../index";
import { getTableSchema } from "./slice";

describe("SAAS - GET Table Schema Slice", () => {

    test("SAAS - GET Table Schema Success", async () => {
      mockApi.onGet("manage/table/testTable?tenantId=1").reply(200, {});

      const result = await store.dispatch(getTableSchema({tenantId: "1", tableName: "testTable"}));
        
      // console.log(result.type);
      expect(result.type).toBe("getTableSchemaByTableName/fulfilled");
    });
  
    test("SAAS - GET Table Schema Failure", async () => {
      mockApi.onGet("manage/table/testTable?tenantId=1").reply(400, {});
      const result = await store.dispatch(getTableSchema({tenantId: "1", tableName: "testTable"}));
  
      // console.log(result.type)
      expect(result.type).toBe("getTableSchemaByTableName/rejected");
    });
  
  });
  
