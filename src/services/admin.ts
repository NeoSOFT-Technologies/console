import { ITenantRegisterData } from "../types";
import apiFactory from "../utils/api";

export function addTenantDataService(data: ITenantRegisterData) {
  return apiFactory().post(`/api/tenants`, data);
}

export function deleteTenantDataService(tenantName: string) {
  return apiFactory().delete(`/api/tenants/${tenantName}`);
}

export function tenantListService(currentPage: number) {
  return apiFactory().get(`/api/tenants?page=${currentPage}`);
}

export function adminLoginData() {
  return apiFactory().get(`/api/admin`);
}
