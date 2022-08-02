import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
const mockStore = configureStore([thunk]);
export const updateStateApi = {
  loading: false,
  data: {
    form: {
      ApiId: 0,
      Name: "api1",
      ListenPath: "/api1/",
      StripListenPath: true,
      TargetUrl: "https://httpbin.org",
      IsActive: true,
      AuthType: "standard",
      CertIds: ["cert1"],
      RateLimit: {
        Rate: 5,
        Per: 10,
        IsDisabled: true,
      },
      VersioningInfo: {
        Location: 1,
        Key: "key",
      },
      Versions: [
        {
          Name: "default",
          OverrideTarget: "https://httpbin.org2",
        },
      ],
      Blacklist: [process.env.IP_ADDRESS],
      Whitelist: [process.env.IP_ADDRESS],
      OpenidOptions: {
        Providers: [
          {
            Issuer: "issuer",
            Client_ids: [
              {
                ClientId: "id",
                Policy: "policy1",
              },
              {
                ClientId: "id2",
                Policy: "policy2",
              },
            ],
          },
        ],
      },
      CORS: {
        IsEnabled: false,
        AllowedOrigins: ["https://google.co.in"],
        AllowedMethods: ["GET"],
        AllowedHeaders: ["ABC"],
        ExposedHeaders: ["XYZ"],
        AllowCredentials: true,
        MaxAge: 5,
        OptionsPassthrough: false,
        Debug: false,
      },
      EnableRoundRobin: false,
      LoadBalancingTargets: [],
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
      Versions: [""],
      issuer: "",
      ClientId: "",
      Policy: "",
      Whitelist: "",
      Blacklist: "",
    },
  },
};

export const componentStore = (name?: any) => {
  let store: any;
  if (name === "mutualTls") {
    store = mockStore({
      getAllCertificateState: {
        loading: false,
        data: {
          CertificateCollection: [
            {
              CertId: "cert1",
              Issuer: "test",
              SignatureAlgorithm: "test",
              Subject: "test",
              Thumbprint: "test",
              ValidNotAfter: "test",
              ValidNotBefore: "test",
              showDetails: true,
              addState: true,
            },
          ],
        },
      },
      updateApiState: updateStateApi,
    });
  } else if (name === "openIdConnect") {
    store = mockStore({
      policyListState: {
        loading: false,
        data: {
          Policies: [
            {
              Action: "",
              Id: "0",
              Name: "policy1",
              State: "active",
              Apis: ["api1", "api2"],
              AuthType: "standard",
            },
          ],
        },
      },
      updateApiState: updateStateApi,
    });
  } else {
    store = mockStore({
      updateApiState: updateStateApi,
    });
  }
  return store;
};
