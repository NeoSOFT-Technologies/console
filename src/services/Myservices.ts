import { ITenantData } from "../types";
import apiFactory from "../utils/api";

export function getUserData(email: string, password: string) {
  const data = { email, password };
  return apiFactory().post(`/api/login`, data);
}

export function deleteTenantData(id: number) {
  return apiFactory().delete(`/api/tenant/${id}`);
}

export function updateTenantData(id: number, data: ITenantData) {
  return apiFactory().put(`/api/tenant/${id}`, data);
}

export function addTenantData(data: ITenantData) {
  return apiFactory().post(`/api/tenant`, data);
}

export function tenantListService(currentPage: number, search: string) {
  return apiFactory().get(
    `/api/tenant?type=tenant&_page=${currentPage}&name_like=${search}`
  );
}
export function tenantUserListService(currentPage: number, search: string) {
  return apiFactory().get(
    `/api/tenant-user?_page=${currentPage}&name_like=${search}`
  );
}
