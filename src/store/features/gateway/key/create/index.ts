export interface IKeyCreateState {
  data: ICreateState;
  loading: boolean;
  error?: string | null;
}
export interface ICreateState {
  form: IGetKeyByIdData;
  errors?: IError;
}

export interface IGetKeyByIdData {
  KeyId?: string;
  KeyName: string;
  SelectedTabIndex: string;
  Per: number;
  Rate: number;
  Quota: number;
  Expires: number;
  IsInActive?: boolean;
  QuotaRenewalRate: number;
  ThrottleInterval: number;
  ThrottleRetries: number;
  AccessRights:
    | [
        {
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
                Per?: number;
                Throttle_interval?: number;
                Throttle_retry_limit?: number;
                Max_query_depth?: number;
                Quota_max?: number;
                Quota_renews?: number;
                Quota_remaining?: number;
                Quota_renewal_rate?: number;
              }
            | undefined;
        }
      ]
    | [];
  Policies: string[];
  PolicyByIds?: [
    {
      Global?:
        | {
            Name: string;
            MaxQuota: number;
            QuotaRenewalRate: number;
            Rate: number;
            Per: number;
            ThrottleInterval: number;
            ThrottleRetries: number;
          }
        | undefined;
      APIs?: any[] | undefined;
      policyName: string;
      AuthType: string;
    }
  ];
  Tags?: string[];
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
  KeyName: string;
  Policies: string;
  AccessRights: string;
  Expires: string;
  GlobalLimit: Limiting;
  PerApiLimit: Limiting[];
}
