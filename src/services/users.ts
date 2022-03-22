import apiFactory from "../utils/api";

export function getUserListService(tenantName: string) {
  return apiFactory().get(`/api/user?tenantName=${tenantName}`);
}

export function updateUserPassword(id: number, password: string) {
  return apiFactory().post(`/api/user/updatepassword?id=${id}`, password);
}
