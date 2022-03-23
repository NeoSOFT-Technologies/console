import { ITenantData } from "../types";
import apiFactory from "../utils/api";

interface CreateUser {
  userName: string;
  email: string;
  password: string;
  roles: string[];
}

interface DeleteUser {
  userName: string;
}

export function updateTenantDataService(data: ITenantData) {
  const body = {
    action: {
      ...data,
    },
  };
  return apiFactory().patch(`/api/tenant`, body);
}

export function tenantUserListService(
  currentPage: number,
  search: string,
  tenantName: string
  // isActive: string
) {
  return apiFactory().get(
    `/api/user?tenantName=${tenantName}&page=${currentPage}`
  );
}

export function createNewUserService(data: CreateUser) {
  const body = {
    userDetails: {
      ...data,
    },
  };
  return apiFactory().post(`/api/user`, body);
}

export function deleteUserDataService(data: DeleteUser) {
  return apiFactory().delete(`/api/user`); // modify here
}
