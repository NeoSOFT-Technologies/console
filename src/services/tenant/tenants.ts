import { ICreateNewUser, ITenantDetail } from "../../types";
import apiFactory from "../../utils/api";

export function updateTenantDataService(data: ITenantDetail) {
  const body = {
    action: {
      ...data,
    },
  };
  return apiFactory().patch(`api/tenants`, body);
}

export function createNewUserService(data: ICreateNewUser) {
  const body = {
    userDetails: {
      userName: data.userName,
      email: data.email,
      password: data.password,
      roles: data.roles,
      attributes: data.permissions,
    },
  };
  return apiFactory().post(`api/user`, body);
}

export function deleteUserDataService(userName: string) {
  return apiFactory().delete(`api/user/${userName}`);
}

export function userPermissionService(tenantName: string) {
  return apiFactory().get(`api/permission?tenantName=${tenantName}`);
}

export function tenantRolesService(tenantName: string) {
  return apiFactory().get(`api/roles?tenantName=${tenantName}`);
}

export function getTenantDetailsService(tenantName: string) {
  return apiFactory().get(`api/tenant-info?tenantName=${tenantName}`);
}

export function tenantPermissionsService(tenantName: string) {
  return apiFactory().get(`api/permission?tenantName=${tenantName}`);
}
