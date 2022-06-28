// import { IApiData } from "../../types/api/index";
// import { IGetPolicyByIdData } from "../../../store/features/gateway/policy/create";
import { IDGetPolicyByIdData } from "../../../store/features/gateway/policy/create/duplicate-index";
import apiFactory from "../../../utils/api";

export function policyListService(currentPage: number, pageSize: number) {
  return apiFactory().get(`Policy?pageNum=${currentPage}&pageSize=${pageSize}`);
}
export function addPolicyService(data: IDGetPolicyByIdData) {
  return apiFactory().post(`Policy`, data);
}
export function getPolicyByIdService(id: string) {
  return apiFactory().get(`Policy/` + id);
}
export function updatePolicyService(data: IDGetPolicyByIdData) {
  return apiFactory().put(`Policy`, data);
}
export function deletePolicyService(id: string) {
  return apiFactory().delete(`Policy/` + id);
}
