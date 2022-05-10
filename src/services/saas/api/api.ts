import { ITableCreateData } from "../../../types/saas";
import apiFactory from "../../../utils/api";

export function getTablesService(tenantId: string) {
  return apiFactory().get(`manage/table/?tenantId=${tenantId}`);
}
export function createTableService(tenantId: string, data: ITableCreateData) {
  return apiFactory().post(`manage/table/?tenantId=${tenantId}`, data);
}
// export function apiListService(currentPage: number, pageSize: number) {
//   return apiFactory().get(
//     `ApplicationGateway?pageNum=${currentPage}&pageSize=${pageSize}`
//   );
// }
// export function addApiService(data: IApiFormData) {
//   return apiFactory().post(`ApplicationGateway/CreateApi`, data);
// }

// export function getApiByIdService(Id: string) {
//   return apiFactory().get(`ApplicationGateway/` + Id);
// }

// export function updateApiService(data: IGetApiByIdData) {
//   return apiFactory().put(`ApplicationGateway`, data);
// }

// export function deleteApiService(Id: string) {
//   return apiFactory().delete(`ApplicationGateway/` + Id);
// }
