export interface IApiGetByIdState {
  data: IUpdateState;
  loading: boolean;
  error?: string | null;
}

export interface IUpdateState {
  form: IGetApiByIdData;
  errors?: IError;
}

export interface IGetApiByIdData {
  ApiId: string;
  Name: string;
  ListenPath: string;
  StripListenPath: boolean;
  TargetUrl: string;
  IsActive: boolean;
  IsInternal: boolean;
  Protocol: string;
  RateLimit: {
    Rate: number;
    Per: number;
    IsDisabled: boolean;
  };
  Blacklist: [];
  Whitelist: [];
  VersioningInfo: {
    Location: string;
    Key: string;
  };
  IsVersioningDisabled: boolean;
  DefaultVersion: string;
  Versions: [
    {
      Name: string;
      OverrideTarget: string;
      Expires: string;
      GlobalRequestHeaders: {};
      GlobalRequestHeadersRemove: [];
      GlobalResponseHeaders: {};
      GlobalResponseHeadersRemove: [];
      ExtendedPaths: null | undefined;
    }
  ];
  AuthType: string;
  EnableMTLS: boolean;
  CertIds: [];
  OpenidOptions: {
    Providers: {
      Issuer: string;
      Client_ids: {
        ClientId: string;
        Policy: string;
      }[];
    }[];
  };
  LoadBalancingTargets: [];
  IsQuotaDisabled: boolean;
}

export interface IError {
  ApiId: string;
  Name: string;
  ListenPath: string;
  stripListenPath: string;
  TargetUrl: string;
  isActive: string;
  Rate: string;
  Per: string;
  versioningInfo: string;
  defaultVersion: string;
  version: string;
  isQuotaDisabled: string;
  LoadBalancingTargets: string;
  OverrideTarget: string;
}
