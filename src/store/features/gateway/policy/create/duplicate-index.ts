export interface IDPolicyCreateState {
  data: IDCreateState;
  loading: boolean;
  error?: string | null;
}
export interface IDCreateState {
  form: IDGetPolicyByIdData;
  errors?: IDError;
}
export interface IDGetPolicyByIdData {
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
          Id: string;
          Name: string;
          Versions: string[];
          MasterVersions: string[];
          AuthType: string;
          isRateLimitDisabled: boolean;
          isQuotaDisbaled: boolean;
          AllowedUrls:
            | {
                url: string;
                methods: string[];
              }[];
          Limit:
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
export interface DLimiting {
  ApiId: string;
  Per: string;
  Rate: string;
  Quota: string;
  Expires: string;
  QuotaRenewalRate: string;
  ThrottleInterval: string;
  ThrottleRetries: string;
}

export interface IDError {
  Name: "";
  Policies: "";
  GlobalLimit: DLimiting;
  PerApiLimit: DLimiting[];
}
