import {
  IGetDeleteTableByTenant,
  IPagination,
  ISearchDataWithQuery,
  ISearchDataWithQueryField,
  ITableCreateData,
  IUpdateTableSchemaData,
} from "../../../types/saas";
import apiFactory from "../../../utils/api";

export function getTablesService(tenantId: string) {
  return apiFactory(process.env.REACT_APP_SAAS_API).get(
    `manage/table/?tenantId=${tenantId}`
  );
}
export function createTableService(
  tenantId: string,
  tenantName: string,
  data: ITableCreateData
) {
  return apiFactory().post(
    `manage/table/?tenantName=${tenantName}&tenantId=${tenantId}`,
    data
  );
}
export function getCapacityPlansService() {
  return apiFactory().get(`manage/table/capacity-plans`);
}
export function getTableSchemaService(tableName: string, tenantId: string) {
  return apiFactory(process.env.REACT_APP_SAAS_API).get(
    `manage/table/${tableName}?tenantId=${tenantId}`
  );
}
export function deleteTableService(tableName: string, tenantId: string) {
  return apiFactory().delete(`manage/table/${tableName}?tenantId=${tenantId}`);
}
export function restoreTableService(tableName: string, tenantId: string) {
  return apiFactory().put(
    `manage/table/restore/${tableName}?tenantId=${tenantId}`
  );
}
export function updateTableSchemaService(
  tableName: string,
  tenantId: string,
  data: IUpdateTableSchemaData
) {
  return apiFactory().put(
    `manage/table/${tableName}?tenantId=${tenantId}`,
    data
  );
}
export function inputDataNrtService(
  tableName: string,
  tenantId: string,
  inputData: string
) {
  return apiFactory().post(
    `ingest-nrt/${tableName}?tenantId=${tenantId}`,
    inputData
  );
}
export function inputDataService(
  tableName: string,
  tenantId: string,
  inputData: string
) {
  return apiFactory().post(
    `ingest/${tableName}?tenantId=${tenantId}`,
    inputData
  );
}
export function searchDataWithQueryFieldService(
  data: ISearchDataWithQueryField
) {
  return apiFactory().get(
    `${data.requestParams.tableName}?tenantId=${data.requestParams.tenantId}&queryField=${data.queryField}&searchTerm=${data.searchTerm}&startRecord=${data.startRecord}&pageSize=${data.pageSize}&orderBy=${data.orderBy}&order=${data.order}`
  );
}
export function searchDataWithQueryService(data: ISearchDataWithQuery) {
  return apiFactory().get(
    `${data.requestParams.tableName}?tenantId=${data.requestParams.tenantId}&searchQuery=${data.searchQuery}&startRecord=${data.startRecord}&pageSize=${data.pageSize}&orderBy=${data.orderBy}&order=${data.order}`
  );
}
export function getAllTablesService(data: IPagination) {
  return apiFactory().get(
    `manage/table/all-tables?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`
  );
}
export function getAllDeletedTableService(data: IPagination) {
  return apiFactory().get(
    `manage/table/deletion/all-tables?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`
  );
}

export function getDeleteTableByTenantService(data: IGetDeleteTableByTenant) {
  return apiFactory().get(
    `manage/table/deletion?tenantId=${data.tenantId}&pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`
  );
}
export function getTenantListService() {
  return apiFactory(process.env.REACT_APP_API_BASEURL).get(`/api/tenants`);
}
export function getTableByTenantService(data: IGetDeleteTableByTenant) {
  return apiFactory().get(
    `manage/table/tables-list?tenantId=${data.tenantId}&pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`
  );
}
