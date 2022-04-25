export interface IPolicyCreateState {
  data: ICreateState;
  loading: boolean;
  error?: string | null;
}
export interface ICreateState {
  form: IGetPolicyByIdData;
  errors?: IError;
}
export interface IGetPolicyByIdData {
  PolicyId?: string;
  Name: string;
  Active: boolean;
  KeysInactive: boolean;
  MaxQuota: number;
  QuotaRate: number;
  Rate: number;
  Per: number;
  ThrottleInterval: number;
  ThrottleRetries: number;
  State: string;
  KeyExpiresIn: number;
  Tags?: string[];
  APIs:
    | [
        {
          Id: string | null;
          Name: string;
          Versions: string[];
          AllowedUrls:
            | {
                url: string;
                methods: string[];
              }[];
          Limit: {
            rate?: number;
            per: number;
            throttle_interval?: number;
            throttle_retry_limit?: number;
            max_query_depth?: number;
            quota_max?: number;
            quota_renews?: number;
            quota_remaining?: number;
            quota_renewal_rate?: number;
            set_by_policy: boolean;
          } | null;
        }
      ]
    | [];
  ApIs:
    | [
        {
          Id: string | null;
          Name: string;
          Versions: string[];
          AllowedUrls:
            | {
                url: string;
                methods: string[];
              }[];
          Limit: {
            rate?: number;
            per: number;
            throttle_interval?: number;
            throttle_retry_limit?: number;
            max_query_depth?: number;
            quota_max?: number;
            quota_renews?: number;
            quota_remaining?: number;
            quota_renewal_rate?: number;
            set_by_policy: boolean;
          } | null;
        }
      ]
    | [];
  Partitions: {
    quota: boolean;
    rate_limit: boolean;
    complexity: boolean;
    acl: boolean;
    per_api: boolean;
  };
}
export interface IError {
  Name: string;
  ApIs?: string;
  Partitions?: string;
  Per?: string;
  Rate?: string;
  Quota?: string;
  Expires?: string;
  ThrottleInterval?: string;
  ThrottleRetries?: string;
}
