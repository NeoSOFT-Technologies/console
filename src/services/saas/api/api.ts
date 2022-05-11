import { ITableCreateData, IUpdateTableSchemaData } from "../../../types/saas";
import apiFactory from "../../../utils/api";

export function getTablesService(tenantId: string) {
  return apiFactory().get(`manage/table/?tenantId=${tenantId}`);
}
export function createTableService(tenantId: string, data: ITableCreateData) {
  return apiFactory().post(`manage/table/?tenantId=${tenantId}`, data);
}
export function getCapacityPlansService() {
  return apiFactory().get(`manage/table/capacity-plans`);
}
export function getTableSchemaService(tableName: string, tenantId: string) {
  return apiFactory().get(`manage/table/${tableName}/?tenantId=${tenantId}`);
}
export function deleteTableService(tableName: string, tenantId: string) {
  return apiFactory().delete(`manage/table/${tableName}/?tenantId=${tenantId}`);
}
export function restoreTableService(tableName: string, tenantId: string) {
  return apiFactory().put(
    `manage/table/restore/${tableName}/?tenantId=${tenantId}`
  );
}
export function updateTableSchemaService(
  tableName: string,
  tenantId: string,
  data: IUpdateTableSchemaData
) {
  return apiFactory().put(
    `manage/table/${tableName}/?tenantId=${tenantId}`,
    data
  );
}
export function inputDataNrtService(
  tableName: string,
  tenantId: string,
  inputData: string
) {
  return apiFactory().post(
    `ingest-nrt/${tableName}/?tenantId=${tenantId}`,
    inputData
  );
}
export function inputDataService(
  tableName: string,
  tenantId: string,
  inputData: string
) {
  return apiFactory().post(
    `ingest/${tableName}/?tenantId=${tenantId}`,
    inputData
  );
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
