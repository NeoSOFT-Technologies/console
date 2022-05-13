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
export interface ISearchRecords {
  id: string;
  title: string;
  productname: string;
  category: string[];
  price: string;
  vendorid: string[];
  _version_: string;
}
