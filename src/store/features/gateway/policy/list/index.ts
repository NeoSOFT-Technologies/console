export interface IPolicyListState {
  data?: ISetPolicyList | null;
  loading: boolean;
  error?: string | null;
}
export interface ISetPolicyList {
  Policies: IPolicyData[];
  TotalCount: number;
}
export interface IPolicyData {
  Id?: string;
  Name: string;
  State: string;
  Apis: string[];
  AuthType: string;
}
export interface IPolicyDataList {
  list: IPolicyData[];
  fields: string[];
}
