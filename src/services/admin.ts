import { ITenantRegisterData } from "../types";
import apiFactory from "../utils/api";

export function addTenantDataService(data: ITenantRegisterData) {
  return apiFactory().post(
    `${process.env.REACT_APP_NODE_API}/api/tenants`,
    data
  );
}

export function deleteTenantDataService(tenantName: string) {
  return apiFactory().delete(
    `${process.env.REACT_APP_NODE_API}/api/tenants/${tenantName}`
  );
}

export function adminLoginData() {
  return apiFactory().get(`${process.env.REACT_APP_NODE_API}/api/admin`);
}
