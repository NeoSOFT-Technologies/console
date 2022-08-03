import mockApi from "../../../../../resources/tenant/testconfig";
import store from "../../../../index";
import { createPolicy, getPolicybyId, updatePolicy } from "./slice";
import { IGetPolicyByIdData } from ".";
const policyid = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
const ApIid = "7fa85f64-5717-4532-b3fc-2c963f66asa6";
const conUrl = "https://httpbin.orgs";
const onGet = "/Policy/3fa85f64-5717-4562-b3fc-2c963f66afa6";
const responseData: IGetPolicyByIdData = {
  PolicyId: policyid,
  Name: "poliy1",
  Active: true,
  KeysInactive: true,
  Quota: 0,
  QuotaRenewalRate: 0,
  Rate: 0,
  Per: 0,
  ThrottleInterval: 0,
  ThrottleRetries: 0,
  State: "true",
  KeyExpiresIn: 0,
  Tags: [""],
  APIs: [
    {
      ApiId: ApIid,
      ApiName: "api1",
      Versions: [""],
      MasterVersions: [""],
      AuthType: "standard",
      isRateLimitDisabled: false,
      isQuotaDisbaled: false,
      AllowedUrls: [
        {
          Url: conUrl,
          Methods: [""],
        },
      ],
      Limit: {
        Rate: 0,
        Per: 0,
        Throttle_interval: 0,
        Throttle_retry_limit: 0,
        Max_query_depth: 0,
        Quota_max: 0,
        Quota_renews: 0,
        Quota_remaining: 0,
        Quota_renewal_rate: 0,
        Set_by_policy: true,
      },
    },
  ],
  Partitions: {
    quota: true,
    rate_limit: true,
    complexity: false,
    acl: false,
    per_api: false,
  },
};
const response = {
  data: {
    Data: responseData,
  },
};
test("calling the state of create policy", async () => {
  mockApi.onPost("/Policy").reply(200, {});

  const result = await store.dispatch(
    createPolicy({
      Name: "policy1",
      Active: true,
      KeysInactive: true,
      Quota: -1,
      QuotaRenewalRate: -1,
      Rate: 0,
      Per: 0,
      ThrottleInterval: -1,
      ThrottleRetries: -1,
      State: "active",
      KeyExpiresIn: 0,
      Tags: [],
      APIs: [
        {
          ApiId: policyid,
          ApiName: "api1",
          Versions: [""],
          AuthType: "standard",
          MasterVersions: ["Default"],
          isRateLimitDisabled: false,
          isQuotaDisbaled: false,
          AllowedUrls: [
            {
              Url: conUrl,
              Methods: [""],
            },
          ],
          Limit: {
            Rate: 0,
            Per: 0,
            Throttle_interval: 0,
            Throttle_retry_limit: 0,
            Max_query_depth: 0,
            Quota_max: 0,
            Quota_renews: 0,
            Quota_remaining: 0,
            Quota_renewal_rate: 0,
            Set_by_policy: true,
          },
        },
      ],
      Partitions: {
        quota: false,
        rate_limit: false,
        complexity: false,
        acl: false,
        per_api: true,
      },
    })
  );
  expect(result.type).toBe("policy/fulfilled");
});

test("calling the state of create policy rejected", async () => {
  mockApi.onPost("/Policy").reply(404);

  const result = await store.dispatch(
    createPolicy({
      Name: "policy1",
      Active: true,
      KeysInactive: true,
      Quota: -1,
      QuotaRenewalRate: -1,
      Rate: 0,
      Per: 0,
      ThrottleInterval: -1,
      ThrottleRetries: -1,
      State: "active",
      KeyExpiresIn: 0,
      Tags: [],
      APIs: [],
      Partitions: {
        quota: false,
        rate_limit: false,
        complexity: false,
        acl: false,
        per_api: true,
      },
    })
  );
  expect(result.type).toBe("policy/rejected");
});

test("calling the state of getById policy", async () => {
  mockApi.onGet(onGet).reply(200, response.data);
  const result = await store.dispatch(getPolicybyId(policyid));
  expect(result.type).toBe("Policy/GetById/fulfilled");
});

test("calling the state of getById policy rejected", async () => {
  mockApi.onGet(onGet).reply(404);
  const result = await store.dispatch(getPolicybyId(policyid));
  expect(result.type).toBe("Policy/GetById/rejected");
});

test("calling the state of update policy", async () => {
  mockApi.onPut("Policy").reply(200, {});
  const result = await store.dispatch(updatePolicy(response.data.Data));
  expect(result.type).toBe("Policy/Update/fulfilled");
});

test("calling the state of update policy  rejected", async () => {
  mockApi.onPut("Policy").reply(404, {});
  const result = await store.dispatch(updatePolicy(response.data.Data));
  expect(result.type).toBe("Policy/Update/rejected");
});

test("calling the state of update policy network Error", async () => {
  mockApi.onPut("Policy").networkError();
  const result = await store.dispatch(updatePolicy(response.data.Data));
  expect(result.type).toBe("Policy/Update/rejected");
});

test("calling the state of getById policy network Error", async () => {
  mockApi.onGet(onGet).networkError();
  const result = await store.dispatch(getPolicybyId(policyid));
  expect(result.type).toBe("Policy/GetById/rejected");
});

test("calling the state of create policy network Error", async () => {
  mockApi.onPost("/Policy").networkError();

  const result = await store.dispatch(
    createPolicy({
      Name: "policy1",
      Active: true,
      KeysInactive: true,
      Quota: -1,
      QuotaRenewalRate: -1,
      Rate: 0,
      Per: 0,
      ThrottleInterval: -1,
      ThrottleRetries: -1,
      State: "active",
      KeyExpiresIn: 0,
      Tags: [],
      APIs: [],
      Partitions: {
        quota: false,
        rate_limit: false,
        complexity: false,
        acl: false,
        per_api: true,
      },
    })
  );
  expect(result.type).toBe("policy/rejected");
});
