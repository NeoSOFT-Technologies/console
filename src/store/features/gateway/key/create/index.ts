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
          AllowedUrls:
            | {
                url: string;
                methods: string[];
              }[];
          Limit?:
            | {
                rate?: number;
                per?: number;
                throttle_interval?: number;
                throttle_retry_limit?: number;
                max_query_depth?: number;
                quota_max?: number;
                quota_renews?: number;
                quota_remaining?: number;
                quota_renewal_rate?: number;
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
            QuotaRate: number;
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

export interface IError {
  KeyId?: string;
  KeyName?: string;
  AccessRights?: string;
  Policies?: string;
  Per?: string;
  Rate?: string;
  Quota?: string;
  Expires?: string;
  QuotaRenewalRate?: string;
  ThrottleInterval?: string;
  ThrottleRetries?: string;
}
