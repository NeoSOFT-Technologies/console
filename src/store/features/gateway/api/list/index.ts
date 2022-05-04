export interface IApiListState {
  data?: ISetApiList | null;
  TotalApisCount?: number;
  // pageSize?: number;
  loading?: boolean;
  error?: string | null;
}

export interface ISetApiList {
  Apis: IApiData[];
  TotalCount: number;
}
export interface IApiData {
  Action?: string;
  Name: string;
  CreatedDate: string;
  TargetUrl: string;
  IsActive: boolean;
  Id?: string;
}

export interface IApiDataList {
  list: IApiData[];
  fields: string[];
}
