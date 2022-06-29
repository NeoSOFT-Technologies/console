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
  Quota: number;
  QuotaRenewalRate: number;
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
          Id: string;
          Name: string;
          ApiId: string | null;
          ApiName: string | null;
          Versions: string[];
          MasterVersions: string[];
          AuthType: string;
          isRateLimitDisabled: boolean;
          isQuotaDisbaled: boolean;
          AllowedUrls:
            | {
                Url: string;
                Methods: string[];
              }[];
          Limit?:
            | {
                Rate?: number;
                Per: number;
                Throttle_interval?: number;
                Throttle_retry_limit?: number;
                Max_query_depth?: number;
                Quota_max?: number;
                Quota_renews?: number;
                Quota_remaining?: number;
                Quota_renewal_rate?: number;
                Set_by_policy: boolean;
              }
            | undefined;
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
export interface Limiting {
  ApiId: string;
  ApiName: string;
  Per: string;
  Rate: string;
  Quota: string;
  Expires: string;
  QuotaRenewalRate: string;
  ThrottleInterval: string;
  ThrottleRetries: string;
}

export interface IError {
  Name: "";
  Policies: "";
  GlobalLimit: Limiting;
  PerApiLimit: Limiting[];
}
