import { IPolicyCreateState } from "./index";

export const initialState: IPolicyCreateState = {
  data: {
    form: {
      Name: "",
      Active: true,
      KeysInactive: true,
      MaxQuota: 0,
      QuotaRate: 0,
      Rate: 0,
      Per: 0,
      ThrottleInterval: 0,
      ThrottleRetries: 0,
      State: "",
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
  },
  loading: false,
  error: undefined,
};

export const emptyState: IPolicyCreateState = { ...initialState };
