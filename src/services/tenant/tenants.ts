import { ICreateNewUser, ITenantDetail } from "../../types";
import apiFactory from "../../utils/api";

export function updateTenantDataService(data: ITenantDetail) {
  const body = {
    action: {
      ...data,
    },
  };
  return apiFactory().patch(
    `${process.env.REACT_APP_NODE_API}/api/tenants`,
    body
  );
}

export function createNewUserService(data: ICreateNewUser) {
  console.log(data);
  const body = {
    userDetails: {
      userName: data.userName,
      email: data.email,
      password: data.password,
      roles: data.roles,
      attributes: data.permissions,
    },
  };
  return apiFactory().post(`${process.env.REACT_APP_NODE_API}/api/user`, body);
}

export function deleteUserDataService(userName: string) {
  return apiFactory().delete(
    `${process.env.REACT_APP_NODE_API}/api/user/${userName}`
  );
}

export function userPermissionService(tenantName: string) {
  return apiFactory().get(
    `${process.env.REACT_APP_NODE_API}/api/permission?tenantName=${tenantName}`
  );
}

export function tenantRolesService(tenantName: string) {
  return apiFactory().get(
    `${process.env.REACT_APP_NODE_API}/api/roles?tenantName=${tenantName}`
  );
}

export function getTenantDetailsService(tenantName: string) {
  return apiFactory().get(
    `${process.env.REACT_APP_NODE_API}/api/tenants/${tenantName}`
  );
}

export function tenantPermissionsService(tenantName: string) {
  return apiFactory().get(
    `${process.env.REACT_APP_NODE_API}/api/permission?tenantName=${tenantName}`
  );
}
