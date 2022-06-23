import mockApi from "../../../../../resources/tenant/testconfig";
import store from "../../../../../store/index";
import { createPolicy } from "./slice";

test("calling the state of create policy", async () => {
  mockApi.onPost("/Policy").reply(200, {});

  const result = await store.dispatch(
    createPolicy({
      Name: "policy2",
      Active: true,
      KeysInactive: false,
      MaxQuota: 1,
      QuotaRate: 1,
      Rate: 1,
      Per: 1,
      ThrottleInterval: 1,
      ThrottleRetries: 1,
      State: "Active",
      KeyExpiresIn: 1,
      Tags: [],
      APIs: [
        {
          Id: "0",
          Name: "api1",
          Versions: ["v1"],
          MasterVersions: ["v1"],
          AuthType: "standard",
          isRateLimitDisabled: false,
          isQuotaDisbaled: false,
          AllowedUrls: [],
          Limit: {
            Rate: 1,
            Per: 1,
            Throttle_interval: 1,
            Throttle_retry_limit: 1,
            Max_query_depth: 1,
            Quota_max: 1,
            Quota_renews: 1,
            Quota_remaining: 1,
            Quota_renewal_rate: 1,
            Set_by_policy: true,
          },
        },
      ],
      Partitions: {
        quota: true,
        rate_limit: true,
        complexity: false,
        acl: false,
        per_api: true,
      },
    })
  );
  expect(result.type).toBe("policy/fulfilled");
});

test("calling the state of create policy", async () => {
  mockApi.onPost("/Policy").reply(404);

  const result = await store.dispatch(
    createPolicy({
      Name: "policy2",
      Active: true,
      KeysInactive: false,
      MaxQuota: 1,
      QuotaRate: 1,
      Rate: 1,
      Per: 1,
      ThrottleInterval: 1,
      ThrottleRetries: 1,
      State: "Active",
      KeyExpiresIn: 1,
      Tags: [],
      APIs: [
        {
          Id: "0",
          Name: "api1",
          Versions: ["v1"],
          MasterVersions: ["v1"],
          AuthType: "standard",
          isRateLimitDisabled: false,
          isQuotaDisbaled: false,
          AllowedUrls: [],
          Limit: {
            Rate: 1,
            Per: 1,
            Throttle_interval: 1,
            Throttle_retry_limit: 1,
            Max_query_depth: 1,
            Quota_max: 1,
            Quota_renews: 1,
            Quota_remaining: 1,
            Quota_renewal_rate: 1,
            Set_by_policy: true,
          },
        },
      ],
      Partitions: {
        quota: true,
        rate_limit: true,
        complexity: false,
        acl: false,
        per_api: true,
      },
    })
  );
  expect(result.type).toBe("policy/rejected");
});
