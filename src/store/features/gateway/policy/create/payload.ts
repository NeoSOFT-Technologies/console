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
      ApIs: [
        // {
        //   Id: null,
        //   Name: "",
        //   Versions: [],
        //   AllowedUrls: [
        //     {
        //       url: "",
        //       methods: [],
        //     },
        //   ],
        //   Limit: {
        //     rate: 0,
        //     per: 0,
        //     throttle_interval: 0,
        //     throttle_retry_limit: 0,
        //     max_query_depth: 0,
        //     quota_max: 0,
        //     quota_renews: 0,
        //     quota_remaining: 0,
        //     quota_renewal_rate: 0,
        //     set_by_policy: false,
        //   },
        // },
      ],
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
  error: null,
};
