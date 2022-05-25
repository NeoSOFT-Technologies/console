import { IPolicyCreateState } from "./index";

export const initialState: IPolicyCreateState = {
  data: {
    form: {
      Name: "",
      Active: true,
      KeysInactive: true,
      MaxQuota: -1,
      QuotaRate: -1,
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
    },
    errors: {
      Name: "",
      Policies: "",
      GlobalLimit: {
        ApiId: "",
        Per: "",
        Rate: "",
        Quota: "",
        Expires: "",
        QuotaRenewalRate: "",
        ThrottleInterval: "",
        ThrottleRetries: "",
      },
      PerApiLimit: [],
    },
  },
  loading: false,
  error: undefined,
};

export const emptyState: IPolicyCreateState = { ...initialState };
