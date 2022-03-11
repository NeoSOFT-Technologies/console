import { ITenantData } from "../types";
import apiFactory from "../utils/api";

interface CreateUser {
  name: string;
  email: string;
  password: string;
}


export function updateTenantDataService(id: number, data: ITenantData) {
  return apiFactory().put(`/api/tenant/${id}`, data);
}

export function tenantUserListService(currentPage: number, search: string) {
  return apiFactory().get(
    `/api/tenant-user?_page=${currentPage}&name_like=${search}`
  );
}

export function createNewUserService(data: CreateUser) {
  return apiFactory().post(`/api/user`, data);
}

export function deleteUserDataService() {
  return apiFactory().delete(`/api/user`); // modify here
}
