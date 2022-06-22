import mockApi from "../../../../../resources/tenant/testconfig";
import store from "../../../../../store/index";
import { createKey } from "./slice";

test("calling the state of create key", async () => {
  mockApi.onPost("Key/CreateKey").reply(200, {});

  const result = await store.dispatch(
    createKey({
      KeyName: "key1",
      SelectedTabIndex: "1",
      Per: 1,
      Rate: 1,
      Quota: 1,
      Expires: 1,
      IsInActive: false,
      QuotaRenewalRate: 1,
      ThrottleInterval: 1,
      ThrottleRetries: 1,
      AccessRights: [],
      Policies: ["policy1"],
      PolicyByIds: [
        {
          Global: {
            Name: "policy2",
            MaxQuota: 1,
            QuotaRate: 1,
            Rate: 1,
            Per: 1,
            ThrottleInterval: 1,
            ThrottleRetries: 1,
          },

          APIs: [],
          policyName: "policy2",
          AuthType: "standard",
        },
      ],
      Tags: [],
    })
  );
  expect(result.type).toBe("key/create/fulfilled");
});

test("calling the state of create api", async () => {
  mockApi.onPost("Key/CreateKey").reply(404);

  const result = await store.dispatch(
    createKey({
      KeyName: "key1",
      SelectedTabIndex: "1",
      Per: 1,
      Rate: 1,
      Quota: 1,
      Expires: 1,
      IsInActive: false,
      QuotaRenewalRate: 1,
      ThrottleInterval: 1,
      ThrottleRetries: 1,
      AccessRights: [],
      Policies: ["policy1"],
      PolicyByIds: [
        {
          Global: {
            Name: "policy2",
            MaxQuota: 1,
            QuotaRate: 1,
            Rate: 1,
            Per: 1,
            ThrottleInterval: 1,
            ThrottleRetries: 1,
          },

          APIs: [],
          policyName: "policy2",
          AuthType: "standard",
        },
      ],
      Tags: [],
    })
  );
  expect(result.type).toBe("key/create/rejected");
});
