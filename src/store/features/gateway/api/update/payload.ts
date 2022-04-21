import { IApiGetByIdState } from ".";

export const initialState: IApiGetByIdState = {
  data: {
    form: {
      ApiId: "",
      Name: "",
      ListenPath: "",
      StripListenPath: false,
      TargetUrl: "",
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
        Location: "1",
        Key: "",
      },
      IsVersioningDisabled: true,
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
          ExtendedPaths: null,
        },
      ],
      AuthType: "",
      EnableMTLS: false,
      CertIds: [],
      OpenidOptions: {
        Providers: [
          {
            issuer: "",
            client_ids: [
              {
                clientId: "",
                policy: "",
              },
            ],
          },
        ],
      },
      LoadBalancingTargets: [],
      IsQuotaDisabled: false,
    },
    errors: {
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
      version: "",
      isQuotaDisabled: "",
      LoadBalancingTargets: "",
      OverrideTarget: "",
    },
  },
  loading: false,
  error: null,
};
