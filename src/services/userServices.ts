import apiFactory from "../utils/api";

export function getUserListService(tenantName: string) {
  return apiFactory().get(`/api/user?tenantName=${tenantName}`);
}

export function updateUserDataService() {
  // need to modify
  return apiFactory().put(`/api/user`);
}
