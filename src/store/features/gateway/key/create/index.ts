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
          Limit: {
            Rate?: number;
            Per?: number;
            Throttle_interval?: number;
            Throttle_retry_limit?: number;
            Max_query_depth?: number;
            Quota_max?: number;
            Quota_renews?: number;
            Quota_remaining?: number;
            Quota_renewal_rate?: number;
          };
        }
      ]
    | [];
  Policies: string[];
  PolicyByIds?: [
    {
      global?:
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
      perApi?: any[] | undefined;
      policyName: string;
    }
  ];
  Tags?: string[];
}

export interface IError {
  KeyId?: string;
  KeyName: string;
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
