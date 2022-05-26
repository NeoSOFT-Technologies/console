import mockApi from "../../../../../resources/tenant/testconfig";
import store from "../../../../index";
import { capacityPlans } from "./slice";

describe("SAAS - GET Capacity Plans Slice", () => {

    test("SAAS - GET Capacity Plans Success", async () => {
      mockApi.onGet("manage/table/capacity-plans").reply(200, {});

      const result = await store.dispatch(capacityPlans());
        
    //   console.log(result.type);
      expect(result.type).toBe("getCapacityPlans/fulfilled");
    });
  
    test("SAAS - GET Capacity Plans Failure", async () => {
      mockApi.onGet("manage/table/capacity-plans").reply(400, {});
      const result = await store.dispatch(capacityPlans());
  
    //   console.log(result.type)
      expect(result.type).toBe("getCapacityPlans/rejected");
    });
  
  });
  
