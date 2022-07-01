export interface ITableColumnData {
  name: string;
  type: string;
  required: boolean;
  sortable: boolean;
  filterable: boolean;
  multiValue: boolean;
  storable: boolean;
  partialSearch: boolean;
}

export interface ITableCreateData {
  tableName: string;
  sku: string;
  columns: ITableColumnData[];
}
export interface ICreateTable {
  tenantId: string;
  requestData: ITableCreateData;
}

export interface IAllTableList {
  dataSize: number;
  tableList: ITableSchema[];
}
export interface ITableSchema {
  tenantId: string;
  tableName: string;
}
export interface IUpdateTableSchemaData {
  tableName: string;
  columns: ITableColumnData[];
}
export interface IUpdateTable {
  requestParams: ITableSchema;
  requestData: IUpdateTableSchemaData;
}
export interface IInputData {
  inputData: string;
  requestParams: ITableSchema;
}
export interface ISearchDataWithQueryField {
  queryField: string;
  searchTerm: string;
  startRecord: string;
  pageSize: string;
  orderBy: string;
  order: string;
  requestParams: ITableSchema;
}
export interface ISearchDataWithQuery {
  searchQuery: string;
  startRecord: string;
  pageSize: string;
  orderBy: string;
  order: string;
  requestParams: ITableSchema;
}
export interface IPagination {
  pageNumber: string;
  pageSize: string;
}

export interface ICapacityPlan {
  sku: string;
}

export interface ICapacityPlans {
  sku: string;
  name: string;
  replicas: string;
  shards: string;
}
export interface ITenantDetails {
  id: number;
  tenantName: string;
  email: string;
  description: string;
  databaseName: string;
  databaseDescription: string;
  createdDateTime: string;
}
export interface IErrorColumnInput {
  name: string;
  tableName?: string;
}
export interface IGetDeleteTableByTenant {
  tenantId: string;
  pageNumber: string;
  pageSize: string;
}
export interface ICustomeError {
  statusCode: string;
  message: string;
}
