import { IKeyCreateState } from "./index";

export const initialState: IKeyCreateState = {
  data: {
    form: {
      KeyName: "",
      Per: 0,
      Rate: 0,
      Quota: 0,
      Expires: 0,
      // isInActive: false,
      QuotaRenewalRate: 0,
      ThrottleInterval: 0,
      ThrottleRetries: 0,
      AccessRights: [],
      // [
      //   {
      //     ApiId: "",
      //     ApiName: "",
      //     Versions: [],
      //     AllowedUrls: [
      //       {
      //         url: "",
      //         methods: [],
      //       },
      //     ],
      //     Limit: {
      //       Rate: 0,
      //       Throttle_interval: 0,
      //       Throttle_retry_limit: 0,
      //       Max_query_depth: 0,
      //       Quota_max: 0,
      //       Quota_renews: 0,
      //       Quota_remaining: 0,
      //       Quota_renewal_rate: 0,
      //     },
      //   },
      // ],
      Policies: [],
      PolicyByIds: [],
      Tags: [],
    },
    errors: {
      KeyName: "",
      AccessRights: "",
      Policies: "",
      Expires: "",
    },
  },
  loading: false,
  error: null,
};
