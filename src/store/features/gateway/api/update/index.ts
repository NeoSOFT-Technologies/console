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
  SelectedTabIndex: string;
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
  CertIds: string[];
  OpenidOptions: {
    Providers: {
      Issuer: string;
      Client_ids: {
        ClientId: string;
        Policy: string;
      }[];
    }[];
  };
  EnableRoundRobin: boolean;
  LoadBalancingTargets: [];
  IsQuotaDisabled: boolean;
  CORS: {
    IsEnabled: boolean;
    AllowedOrigins: [];
    AllowedMethods: [];
    AllowedHeaders: [];
    ExposedHeaders: [];
    AllowCredentials: boolean;
    MaxAge: number;
    OptionsPassthrough: boolean;
    Debug: boolean;
  };
}

export interface IError {
  AllowedOrigins: string;
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
  isQuotaDisabled: string;
  LoadBalancingTargets: string;
  OverrideTarget: string;
  Versions: [
    {
      OverrideTarget: string;
    }
  ];
  issuer: string;
  ClientId: string;
  Policy: string;
  Whitelist: string;
  Blacklist: string;
}
