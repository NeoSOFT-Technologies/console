import { ITenantData } from "../types";
import apiFactory from "../utils/api";

interface CreateUser {
  userName: string;
  email: string;
  password: string;
  roles: string[];
}

export function updateTenantDataService(data: ITenantData) {
  const body = {
    action: {
      tenantName: data.tenantName,
      email: data.email,
      description: data.description,
    },
  };
  console.log(
    "🚀 ~ file: tenants.ts ~ line 19 ~ updateTenantDataService ~ body",
    body
  );
  return apiFactory().patch(`/api/tenant`, body);
}

export function tenantUserListService(
  tenantName: string,
  userName: string,
  currentPage: number,
  search: string
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

export function tenantRolesService() {
  return apiFactory().get(`/api/roles`);
}

export function getTenantDetailsService(tenantName: string) {
  return apiFactory().get(`/api/tenants/${tenantName}`);
}
