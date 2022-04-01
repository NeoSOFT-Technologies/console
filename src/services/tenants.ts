// import { ITenantData } from "../types";
import apiFactory from "../utils/api";

interface CreateUser {
  userName: string;
  email: string;
  password: string;
  roles: string[];
}

interface IData {
  createdDateTime: string;
  description: string;
  host: string;
  id: number;
  policy: string;
  port: number;
  tenantDbName: string;
  tenantId: number;
  tenantName: string;
}

export function updateTenantDataService(data: IData) {
  const body = {
    action: {
      ...data,
    },
  };
  return apiFactory().patch(`/api/tenants`, body);
}

export function tenantUserListService(
  tenantName: string,
  userName: string,
  currentPage: number
  // search: string
  // isActive: string
) {
  return apiFactory().get(
    `/api/user?tenantName=${tenantName}&page=${currentPage}&userName=${userName}`
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

export function deleteUserDataService(userName: string) {
  return apiFactory().delete(`/api/user/${userName}`);
}

export function userPermissionService(tenantName: string, clientName: string) {
  return apiFactory().get(
    `/api/permission?tenantName=${tenantName}&clientName=${clientName}`
  );
}

export function tenantRolesService(tenantName: string) {
  return apiFactory().get(`/api/roles?tenantName=${tenantName}`);
}

export function getTenantDetailsService(tenantName: string) {
  console.log("tenantName", tenantName);
  return apiFactory().get(`/api/tenants/2`); // put tenantName here
}

export function tenantPermissionsService(tenantName: string) {
  return apiFactory().get(`/api/permission?tenantName=${tenantName}`);
}
