import { IKeyCreateState } from "./index";

export const initialState: IKeyCreateState = {
  data: {
    form: {
      KeyName: "",
      SelectedTabIndex: "applyPolicy",
      Per: 0,
      Rate: 0,
      Quota: -1,
      Expires: 0,
      // isInActive: false,
      QuotaRenewalRate: -1,
      ThrottleInterval: -1,
      ThrottleRetries: -1,
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
      Tags: [],
    },
    errors: {
      KeyName: "",
      Expires: "",
      Policies: "",
      AccessRights: "",
      GlobalLimit: {
        ApiId: "",
        ApiName: "",
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

export const emptyState: IKeyCreateState = { ...initialState };
