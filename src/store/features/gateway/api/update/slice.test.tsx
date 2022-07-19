import mockApi from "../../../../../resources/tenant/testconfig";
import store from "../../../../../store/index";
import { getApiById, updateApi } from "./slice";

const response = {
  data: {
    Data: {
      ApiId: "b9eef321-8bb7-43d3-982a-59e8c9225ca5",
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
      Versions2: ["Default"],
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
    },
  },
};

const responseNew = {
  data: {
    Data: {
      ApiId: "b9eef321-8bb7-43d3-982a-59e8c9225ca5",
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
      Versions2: ["Default"],
      Versions: [],
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
    },
  },
};

test("calling the state of update api", async () => {
  mockApi.onPut("/ApplicationGateway").reply(200, {});

  const result = await store.dispatch(
    updateApi({
      ApiId: "b9eef321-8bb7-43d3-982a-59e8c9225ca5",
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
      Versions2: ["Default"],
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
  expect(result.type).toBe("api/update/fulfilled");
});

test("calling the state of update api rejected", async () => {
  mockApi.onPut("/ApplicationGateway").reply(404, {});

  const result = await store.dispatch(
    updateApi({
      ApiId: "b9eef321-8bb7-43d3-982a-59e8c9225ca5",
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
      Versions2: ["Default"],
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

test("calling the state of getById api", async () => {
  mockApi
    .onGet("ApplicationGateway/b9eef321-8bb7-43d3-982a-59e8c9225ca5")
    .reply(200, response.data);
  const result = await store.dispatch(
    getApiById("b9eef321-8bb7-43d3-982a-59e8c9225ca5")
  );
  expect(result.type).toBe("api/getApiById/fulfilled");
});

test("calling the state of getById api- else condition", async () => {
  mockApi
    .onGet("ApplicationGateway/b9eef321-8bb7-43d3-982a-59e8c9225ca5")
    .reply(200, responseNew.data);
  const resultNew = await store.dispatch(
    getApiById("b9eef321-8bb7-43d3-982a-59e8c9225ca5")
  );
  expect(resultNew.type).toBe("api/getApiById/fulfilled");
});

test("calling the state of getById api rejected", async () => {
  mockApi
    .onGet("ApplicationGateway/b9eef321-8bb7-43d3-982a-59e8c9225ca5")
    .reply(404, {});
  const result = await store.dispatch(
    getApiById("b9eef321-8bb7-43d3-982a-59e8c9225ca5")
  );
  expect(result.type).toBe("api/getApiById/rejected");
});

test("calling the state of getById api network error", async () => {
  mockApi
    .onGet("ApplicationGateway/b9eef321-8bb7-43d3-982a-59e8c9225ca5")
    .networkError();
  const result = await store.dispatch(
    getApiById("b9eef321-8bb7-43d3-982a-59e8c9225ca5")
  );
  expect(result.type).toBe("api/getApiById/rejected");
});

test("calling the state of update api network error", async () => {
  mockApi.onPut("/ApplicationGateway").networkError();

  const result = await store.dispatch(
    updateApi({
      ApiId: "b9eef321-8bb7-43d3-982a-59e8c9225ca5",
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
      Versions2: ["Default"],
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
