import mockApi from "../../../../../resources/gateway/testconfig";
import store from "../../../../../store/index";
import { initialState } from "./payload";
import { createKey, getKeyById, updateKey } from "./slice";
import { IGetKeyByIdData } from ".";

it("Should initially set keySTate to an empty object", () => {
  const state = store.getState().createKeyState;
  expect(state.data).toEqual(initialState.data);
});
const keyId = "f7764699-e83d-4971-aed3-3e508ac97d70";
const createPath = "/Key/CreateKey";
const getByIdPath = "Key/GetKey?keyId=";
const updateKeyPath = "/Key/UpdateKey";
const _error = "Network Error";
const createKeys: IGetKeyByIdData = {
  KeyName: "key1",
  SelectedTabIndex: "applyPolicy",
  Per: 0,
  Rate: 0,
  Quota: -1,
  Expires: 0,
  // isInActive: false,
  QuotaRenewalRate: -1,
  ThrottleInterval: -1,
  ThrottleRetries: -1,
  AccessRights: [
    {
      ApiId: "api1",
      ApiName: "api1",
      Versions: [],
      MasterVersions: ["Default"],
      AuthType: "standard",
      isRateLimitDisabled: false,
      isQuotaDisbaled: false,
      AllowedUrls: [],
      Limit: {
        Rate: 0,
        Throttle_interval: 0,
        Throttle_retry_limit: 0,
        Max_query_depth: 0,
        Quota_max: 0,
        Quota_renews: 0,
        Quota_remaining: 0,
        Quota_renewal_rate: 0,
      },
    },
  ],
  Policies: [],
  PolicyByIds: [
    {
      Global: {
        Name: "",
        MaxQuota: 0,
        QuotaRate: 0,
        Rate: 0,
        Per: 0,
        ThrottleInterval: 0,
        ThrottleRetries: 0,
      },
      APIs: [],
      policyName: "",
      AuthType: "",
    },
  ],
};
const response: IGetKeyByIdData = {
  KeyId: keyId,
  KeyName: "key1",
  SelectedTabIndex: "applyPolicy",
  Per: 0,
  Rate: 0,
  Quota: -1,
  Expires: 0,
  QuotaRenewalRate: -1,
  ThrottleInterval: -1,
  ThrottleRetries: -1,
  AccessRights: [
    {
      ApiId: "api1",
      ApiName: "api1",
      Versions: [],
      MasterVersions: ["Default"],
      AuthType: "standard",
      isRateLimitDisabled: false,
      isQuotaDisbaled: false,
      AllowedUrls: [],
      Limit: {
        Rate: 0,
        Throttle_interval: 0,
        Throttle_retry_limit: 0,
        Max_query_depth: 0,
        Quota_max: 0,
        Quota_renews: 0,
        Quota_remaining: 0,
        Quota_renewal_rate: 0,
      },
    },
  ],
  Policies: ["policy1"],
  PolicyByIds: [
    {
      Global: {
        Name: "",
        MaxQuota: 0,
        QuotaRate: 0,
        Rate: 0,
        Per: 0,
        ThrottleInterval: 0,
        ThrottleRetries: 0,
      },
      APIs: [],
      policyName: "",
      AuthType: "",
    },
  ],
};
// const response = responseData,

// key/create
test("key/create/fulfilled-calling the state of successfully creating key", async () => {
  mockApi.onPost(createPath).reply(200, response);

  const result = await store.dispatch(createKey(createKeys));

  expect(result.type).toBe("key/create/fulfilled");
});
test("key/create/rejected-calling the state of create key-404", async () => {
  mockApi.onPost(createPath).reply(400);
  const result = await store.dispatch(createKey(createKeys));
  expect(result.type).toBe("key/create/rejected");
});
test("Network error- failed for calling the state of create key page", async () => {
  mockApi.onPost(createPath).networkError();

  const result = await store.dispatch(createKey(createKeys));
  expect(result.type).toBe("key/create/rejected");
  expect(result.payload.message).toBe(_error);
});

// key/getbyid
test("key/getKeyById/fulfilled- calling the state of get key by Id", async () => {
  mockApi.onGet(getByIdPath + keyId).reply(200, response);

  const result = await store.dispatch(getKeyById(keyId));
  expect(result.type).toBe("key/getKeyById/fulfilled");
});
test("key/getKeyById/rejected- failed for calling get key by Id", async () => {
  mockApi.onGet(getByIdPath + keyId).reply(404, `Entity ${keyId} is not found`);

  const result = await store.dispatch(getKeyById(keyId));
  expect(result.type).toBe("key/getKeyById/rejected");
});
test("Network error- failed for calling the state of get key by Id", async () => {
  mockApi.onGet(getByIdPath).networkError();

  const result = await store.dispatch(getKeyById(""));
  expect(result.payload.message).toBe(_error);
  expect(result.type).toBe("key/getKeyById/rejected");
});

// update
test("calling the state of update key", async () => {
  mockApi.onPut(updateKeyPath).reply(200, {});
  const result = await store.dispatch(updateKey(response));
  expect(result.type).toBe("key/Update/fulfilled");
});
test("calling the state of update key-404", async () => {
  mockApi.onPut(updateKeyPath).reply(404, {});
  const result = await store.dispatch(updateKey(response));
  expect(result.type).toBe("key/Update/rejected");
});
test("Network error- failed for calling the state of update key page", async () => {
  mockApi.onPut(updateKeyPath).networkError();

  const result = await store.dispatch(updateKey(response));
  expect(result.type).toBe("key/Update/rejected");
  expect(result.payload.message).toBe(_error);
});
