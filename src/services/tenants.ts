import { ICreateNewUser, ITenantDetail } from "../types";
import { ICreatePolicyFormData } from "../types/create-policy.types";
import apiFactory from "../utils/api";

export function updateTenantDataService(data: ITenantDetail) {
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

export function createNewUserService(data: ICreateNewUser) {
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

export function userPermissionService(tenantName: string) {
  return apiFactory().get(`/api/permission?tenantName=${tenantName}`);
}

export function tenantRolesService(tenantName: string) {
  return apiFactory().get(`/api/roles?tenantName=${tenantName}`);
}

export function getTenantDetailsService(tenantName: string) {
  console.log("tenantName", tenantName);
  return apiFactory().get(`/api/tenants/4`); // put tenantName here
}

export function tenantPermissionsService(tenantName: string) {
  return apiFactory().get(`/api/permission?tenantName=${tenantName}`);
}
export function createNewPolicyService(data: ICreatePolicyFormData) {
  const body = {
    tenantName: data.tenantName,
    policyType: "Role",
    clientName: "my-nest-application",
    policyDetails: {
      name: data.policyName,
      description: data.description,
    },
  };
  return apiFactory().post("/api/policy", body);
}
