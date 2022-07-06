export const regexForColName = /^[A-Za-z][\dA-Za-z]{1,29}$/;
export const ColNameErrMsg =
  "column name should only consist Alphanumeric values (2-30)";
export const TableNameErrMsg =
  "Table name should only consist Alphanumeric values (2-30)";
export const multivaledDataTypes: string[] = [
  "strings",
  "ints",
  "floats",
  "doubles",
  "longs",
  "Dates",
];
export const singleValedDataTypes: string[] = [
  "string",
  "int",
  "float",
  "double",
  "long",
  "Date",
];
export const tableHeadings: string[] = [
  "Name",
  "Multivalue",
  "Partial Search",
  "Type",
  "Sortable",
  "Required",
  "Filterable",
  "Storable",
  "View",
  "Delete",
];
export const dataTypelist: string[] = [
  "string",
  "strings",
  "int",
  "ints",
  "float",
  "floats",
  "double",
  "doubles",
  "long",
  "longs",
  "Date",
  "Dates",
];
