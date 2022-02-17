import { tenantListService } from "../../config/Myservices";

export const getTenantList = async () => {
  let res = await tenantListService();
  return { type: "getTenants", payload: [...res.data] };
};
