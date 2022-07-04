import mockApi from "../../../../../resources/tenant/testconfig";
import store from "../../../../../store/index";
import { updateApi } from "./slice";

test("calling the state of update api", async () => {
  mockApi.onPatch("/ApplicationGateway").reply(200, {});
  //   const result = await store.dispatch(
  //     updateApi({
  //       ApiId: "f7764699-e83d-4971-aed3-3e508ac97d70",
  //       Name: "api1",
  //       ListenPath: "/api1/",
  //       StripListenPath: true,
  //       TargetUrl: "https://httpbin.org",
  //       SelectedTabIndex: "1",
  //       IsActive: true,
  //       IsInternal: false,
  //       Protocol: "http",
  //       RateLimit: {
  //         Rate: 1,
  //         Per: 1,
  //         IsDisabled: false,
  //       },
  //       Blacklist: [],
  //       Whitelist: [],
  //       VersioningInfo: {
  //         Location: 1,
  //         Key: "key",
  //       },
  //       IsVersioningDisabled: false,
  //       DefaultVersion: "v1",
  //       Versions: [
  //         {
  //           Name: "v1",
  //           OverrideTarget: "https://httpbin.orgs",
  //           Expires: "",
  //           GlobalRequestHeaders: {},
  //           GlobalRequestHeadersRemove: [],
  //           GlobalResponseHeaders: {},
  //           GlobalResponseHeadersRemove: [],
  //           ExtendedPaths: undefined,
  //         },
  //       ],
  //       AuthType: "standard",
  //       EnableMTLS: false,
  //       CertIds: [],
  //       OpenidOptions: {
  //         Providers: [],
  //       },
  //       EnableRoundRobin: false,
  //       LoadBalancingTargets: [],
  //       IsQuotaDisabled: false,
  //       CORS: {
  //         IsEnabled: false,
  //         AllowedOrigins: [],
  //         AllowedMethods: [],
  //         AllowedHeaders: [],
  //         ExposedHeaders: [],
  //         AllowCredentials: false,
  //         MaxAge: 0,
  //         OptionsPassthrough: false,
  //         Debug: false,
  //       },
  //     })
  //   );
  //   expect(result.type).toBe("api/update/fulfilled");
});

test("calling the state of update api", async () => {
  mockApi.onDelete("/ApplicationGateway").reply(404, {});

  const result = await store.dispatch(
    updateApi({
      ApiId: "0",
      Name: "api1",
      ListenPath: "/api1/",
      StripListenPath: false,
      TargetUrl: "https://httpbin.org",
      SelectedTabIndex: "1",
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
      Versions2: [],
      Versions: [
        {
          Name: "v1",
          OverrideTarget: "https://httpbin.orgs",
          Expires: "",
          GlobalRequestHeaders: {},
          GlobalRequestHeadersRemove: [],
          GlobalResponseHeaders: {},
          GlobalResponseHeadersRemove: [],
          ExtendedPaths: undefined,
        },
      ],
      AuthType: "standard",
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
    })
  );
  expect(result.type).toBe("api/update/rejected");
});
