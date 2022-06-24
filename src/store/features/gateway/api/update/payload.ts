import { IApiGetByIdState } from ".";

export const initialState: IApiGetByIdState = {
  data: {
    form: {
      ApiId: "",
      Name: "",
      ListenPath: "",
      StripListenPath: false,
      TargetUrl: "",
      SelectedTabIndex: "",
      IsActive: true,
      IsInternal: false,
      Protocol: "http",
      RateLimit: {
        Rate: 0,
        Per: 0,
        IsDisabled: false,
      },
      Blacklist: [],
      Whitelist: [],
      VersioningInfo: {
        Location: 1,
        Key: "",
      },
      IsVersioningDisabled: false,
      DefaultVersion: "",
      Versions: [
        {
          Name: "",
          OverrideTarget: "",
          Expires: "",
          GlobalRequestHeaders: {},
          GlobalRequestHeadersRemove: [],
          GlobalResponseHeaders: {},
          GlobalResponseHeadersRemove: [],
          ExtendedPaths: undefined,
        },
      ],
      AuthType: "",
      EnableMTLS: false,
      CertIds: [],
      OpenidOptions: {
        Providers: [],
      },
      EnableRoundRobin: false,
      LoadBalancingTargets: [],
      IsQuotaDisabled: false,
      CORS: {
        IsEnabled: false,
        AllowedOrigins: [],
        AllowedMethods: [],
        AllowedHeaders: [],
        ExposedHeaders: [],
        AllowCredentials: false,
        MaxAge: 0,
        OptionsPassthrough: false,
        Debug: false,
      },
    },
    errors: {
      AllowedOrigins: "",
      ApiId: "",
      Name: "",
      ListenPath: "",
      stripListenPath: "",
      TargetUrl: "",
      isActive: "",
      Rate: "",
      Per: "",
      versioningInfo: "",
      defaultVersion: "",
      isQuotaDisabled: "",
      LoadBalancingTargets: "",
      OverrideTarget: "",
      Versions: [
        {
          // Version: "Default",
          Version: "",
          OverrideTarget: "",
        },
      ],
      issuer: "",
      ClientId: "",
      Policy: "",
      Whitelist: "",
      Blacklist: "",
    },
  },
  loading: false,
  error: undefined,
};
