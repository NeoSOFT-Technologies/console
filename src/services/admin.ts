import { ITenantData } from "../types";
import apiFactory from "../utils/api";

export function addTenantDataService(data: ITenantData) {
  return apiFactory().post(`/api/tenant`, data);
}

export function deleteTenantDataService(id: number) {
  return apiFactory().delete(`/api/tenant/${id}`);
}

export function tenantListService(currentPage: number, search: string) {
  return apiFactory().get(
    `/api/tenant?type=tenant&_page=${currentPage}&name_like=${search}`
  );
}
