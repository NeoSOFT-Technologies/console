import { tenantListService } from "../../config/Myservices";

export const getTenantList = async () => {
  let res = await tenantListService();
  if (res.data.err === 0) {
    return { type: "getTenants", payload: [...res.data.data] };
  } else if (res.data.err > 0) {
    return { type: "getTenants", payload: res.data };
  }
};
