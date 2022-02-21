import { tenantListService } from "../../config/Myservices";

export const getTenantList = async (currentPage, search) => {
  let res = await tenantListService(currentPage, search);
  console.log(res);
  const total = res.headers["x-total-count"];
  return {
    type: "getTenants",
    payload: { list: [...res.data], count: Math.ceil(total / 10) },
  };
};
