import mockApi from "../../../../../resources/tenant/testconfig";
import store from "../../../../../store/index";
import { getApiById, updateApi } from "./slice";
import { IGetApiByIdData } from ".";
const apiId = "b9eef321-8bb7-43d3-982a-59e8c9225ca5";
const updateApiPath = "/ApplicationGateway";
const getByIdPath = "ApplicationGateway/b9eef321-8bb7-43d3-982a-59e8c9225ca5";
const targetUrl = "https://httpbin.org";
const responseData: IGetApiByIdData = {
  ApiId: apiId,
  Name: "api1",
  ListenPath: "/api1/",
  StripListenPath: false,
  TargetUrl: targetUrl,
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
};
const response = {
  data: {
    Data: responseData,
  },
};

const responseNew = {
  data: {
    Data: {
      ApiId: apiId,
      Name: "api1",
      ListenPath: "/api1/",
      StripListenPath: false,
      TargetUrl: targetUrl,
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
  mockApi.onPut(updateApiPath).reply(200, {});
  const result = await store.dispatch(updateApi(response.data.Data));
  expect(result.type).toBe("api/update/fulfilled");
});

test("calling the state of update api rejected", async () => {
  mockApi.onPut(updateApiPath).reply(404, {});
  const result = await store.dispatch(updateApi(response.data.Data));
  expect(result.type).toBe("api/update/rejected");
});

test("calling the state of getById api", async () => {
  mockApi.onGet(getByIdPath).reply(200, response.data);
  const result = await store.dispatch(getApiById(apiId));
  expect(result.type).toBe("api/getApiById/fulfilled");
});

test("calling the state of getById api- else condition", async () => {
  mockApi.onGet(getByIdPath).reply(200, responseNew.data);
  const resultNew = await store.dispatch(getApiById(apiId));
  expect(resultNew.type).toBe("api/getApiById/fulfilled");
});

test("calling the state of getById api rejected", async () => {
  mockApi.onGet(getByIdPath).reply(404, {});
  const result = await store.dispatch(getApiById(apiId));
  expect(result.type).toBe("api/getApiById/rejected");
});

test("calling the state of getById api network error", async () => {
  mockApi.onGet(getByIdPath).networkError();
  const result = await store.dispatch(getApiById(apiId));
  expect(result.type).toBe("api/getApiById/rejected");
});

test("calling the state of update api network error", async () => {
  mockApi.onPut(updateApiPath).networkError();
  const result = await store.dispatch(updateApi(response.data.Data));
  expect(result.type).toBe("api/update/rejected");
});
