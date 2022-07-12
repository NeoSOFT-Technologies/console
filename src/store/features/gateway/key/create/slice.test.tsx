import mockApi from "../../../../../resources/gateway/testconfig";
import store from "../../../../../store/index";
import { initialState } from "./payload";
import { createKey, getKeyById, updateKey } from "./slice";

describe("create key redux state tests", () => {
  it("Should initially set keySTate to an empty object", () => {
    const state = store.getState().createKeyState;
    expect(state.data).toEqual(initialState.data);
  });
  const keyId = "f7764699-e83d-4971-aed3-3e508ac97d70";
  const response = {
    KeyId: "f7764699-e83d-4971-aed3-3e508ac97d70",
    KeyName: "key1",
    SelectedTabIndex: "applyPolicy",
    Per: 0,
    Rate: 0,
    Quota: -1,
    Expires: 0,
    isInActive: false,
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
          QuotaRenewalRate: 0,
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

  // key/create
  test("key/create/fulfilled-calling the state of successfully creating key", async () => {
    mockApi.onPost("/Key/CreateKey").reply(200, response);

    const result = await store.dispatch(
      createKey({
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
              QuotaRenewalRate: 0,
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
      })
    );

    expect(result.type).toBe("key/create/fulfilled");
  });
  test("key/create/rejected-calling the state of create key-404", async () => {
    mockApi.onPost("/Key/CreateKey").reply(400);
    const result = await store.dispatch(
      createKey({
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
            ApiId: "",
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
              QuotaRenewalRate: 0,
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
      })
    );
    expect(result.type).toBe("key/create/rejected");
    expect(result.payload.message).toBe(
      "Cannot read properties of undefined (reading 'Errors')"
    );
  });
  test("Network error- failed for calling the state of create key page", async () => {
    mockApi.onPost("/Key/CreateKey").networkError();

    const result = await store.dispatch(
      createKey({
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
              QuotaRenewalRate: 0,
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
      })
    );
    expect(result.type).toBe("key/create/rejected");
    expect(result.payload.message).toBe("Network Error");
  });

  // key/getbyid
  test("key/getKeyById/fulfilled- calling the state of get key by Id", async () => {
    mockApi.onGet("Key/GetKey?keyId=" + keyId).reply(200, response);

    const result = await store.dispatch(getKeyById(keyId));
    expect(result.type).toBe("key/getKeyById/fulfilled");
  });
  test("key/getKeyById/rejected- failed for calling get key by Id", async () => {
    mockApi
      .onGet("Key/GetKey?keyId=" + keyId)
      .reply(404, `Entity ${keyId} is not found`);

    const result = await store.dispatch(getKeyById(keyId));
    expect(result.type).toBe("key/getKeyById/rejected");
  });
  test("Network error- failed for calling the state of get key by Id", async () => {
    mockApi.onGet("Key/GetKey?keyId=").networkError();

    const result = await store.dispatch(getKeyById(""));
    expect(result.payload.message).toBe("Network Error");
    expect(result.type).toBe("key/getKeyById/rejected");
  });

  // update
  test("calling the state of update key", async () => {
    mockApi.onPut("/Key/UpdateKey").reply(200, {});
    const result = await store.dispatch(
      updateKey({
        KeyId: "f7764699-e83d-4971-aed3-3e508ac97d70",
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
        Policies: ["policy1"],
        PolicyByIds: [
          {
            Global: {
              Name: "",
              MaxQuota: 0,
              QuotaRenewalRate: 0,
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
      })
    );
    expect(result.type).toBe("key/Update/fulfilled");
  });
  test("calling the state of update key-404", async () => {
    mockApi.onPut("/Key/UpdateKey").reply(404, {});
    const result = await store.dispatch(
      updateKey({
        KeyId: "f7764699-e83d-4971-aed3-3e508ac97d70",
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
        Policies: ["policy1"],
        PolicyByIds: [
          {
            Global: {
              Name: "",
              MaxQuota: 0,
              QuotaRenewalRate: 0,
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
      })
    );
    expect(result.type).toBe("key/Update/rejected");
  });
  test("Network error- failed for calling the state of update key page", async () => {
    mockApi.onPut("/Key/UpdateKey").networkError();

    const result = await store.dispatch(
      updateKey({
        KeyId: "f7764699-e83d-4971-aed3-3e508ac97d70",
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
        Policies: ["policy1"],
        PolicyByIds: [
          {
            Global: {
              Name: "",
              MaxQuota: 0,
              QuotaRenewalRate: 0,
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
      })
    );
    expect(result.type).toBe("key/Update/rejected");
    expect(result.payload.message).toBe("Network Error");
  });
});
