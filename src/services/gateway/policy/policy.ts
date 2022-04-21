// import { IApiData } from "../../types/api/index";
import { IGetPolicyByIdData } from "../../store/features/policy/create";
import apiFactory from "../../utils/api";

export function policyListService(currentPage: number) {
  return apiFactory().get(`Policy?pageNum=${currentPage}&pageSize=3`);
}
export function addPolicyService(data: IGetPolicyByIdData) {
  return apiFactory().post(`Policy`, data);
}
export function getPolicyByIdService(id: string) {
  return apiFactory().get(`Policy/` + id);
}
export function updatePolicyService(data: IGetPolicyByIdData) {
  return apiFactory().put(`Policy`, data);
}
export function deletePolicyService(id: string) {
  return apiFactory().delete(`Policy/` + id);
}
