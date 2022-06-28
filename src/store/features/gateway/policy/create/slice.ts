import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import {
  addPolicyService,
  getPolicyByIdService,
  updatePolicyService,
} from "../../../../../services/gateway/policy/policy";
import error from "../../../../../utils/error";
// import { IDGetPolicyByIdData } from "./duplicate-index";
import { IDGetPolicyByIdData } from "./duplicate-index";
import { initialState } from "./payload";
import { IGetPolicyByIdData, IPolicyCreateState } from ".";
// export const emptyState: IPolicyCreateState = { ...initialState };
let dataduplicate: IDGetPolicyByIdData;
function bindPolicyData(state: any, action: any) {
  console.log("action result", action);
  state.data.form.Quota = action.payload.Data.MaxQuota;
  state.data.form.QuotaRenewalRate = action.payload.Data.QuotaRate;
  for (let i = 0; i < action.payload.Data.APIs.length; i++) {
    if (action.payload.Data.APIs[i].Limit !== null) {
      const limits = {
        Max_query_depth: action.payload.Data.APIs[i].Limit.max_query_depth,
        Per: action.payload.Data.APIs[i].Limit.per,
        Quota_max: action.payload.Data.APIs[i].Limit.quota_max,
        Quota_remaining: action.payload.Data.APIs[i].Limit.quota_remaining,
        Quota_renewal_rate:
          action.payload.Data.APIs[i].Limit.quota_renewal_rate,
        Quota_renews: action.payload.Data.APIs[i].Limit.quota_renews,
        Rate: action.payload.Data.APIs[i].Limit.rate,
        Set_by_policy: action.payload.Data.APIs[i].Limit.set_by_policy,
        Throttle_interval: action.payload.Data.APIs[i].Limit.throttle_interval,
        Throttle_retry_limit:
          action.payload.Data.APIs[i].Limit.throttle_retry_limit,
      };
      state.data.form.APIs[i].Limit = limits;
    }
  }
}
function Insertdata(data: any) {
  dataduplicate = {
    APIs: data.APIs,
    Partitions: data.Partitions,
    Tags: data.Tags,
    Active: data.Active,
    KeyExpiresIn: data.KeyExpiresIn,
    KeysInactive: data.KeysInactive,
    MaxQuota: data.Quota,
    QuotaRate: data.QuotaRenewalRate,
    Name: data.Name,
    Per: data.Per,
    PolicyId: data.PolicyId,
    Rate: data.Rate,
    ThrottleInterval: data.ThrottleInterval,
    ThrottleRetries: data.ThrottleRetries,
    State: data.State,
  };
}
export let policystate: IPolicyCreateState;
export const createPolicy = createAsyncThunk(
  "policy",
  async (data: IGetPolicyByIdData) => {
    try {
      Insertdata(data);
      const response = await addPolicyService(dataduplicate);
      // console.log(response);
      return response.data;
    } catch (error_) {
      const myError = error_ as Error | AxiosError;
      throw axios.isAxiosError(myError) && myError.response
        ? myError.response.data.Errors[0]
        : myError.message;
    }
  }
);
export const getPolicybyId = createAsyncThunk(
  "Policy/GetById",
  async (id: string) => {
    try {
      const response = await getPolicyByIdService(id);
      policystate = {
        data: {
          form: response.data.Data,
        },
        loading: false,
        error: undefined,
      };
      // emptyState.data.form = response.data;
      return response.data;
    } catch (error_) {
      const myError = error_ as Error | AxiosError;
      throw axios.isAxiosError(myError) && myError.response
        ? myError.response.data.Errors[0]
        : myError.message;
    }
  }
);
export const updatePolicy = createAsyncThunk(
  "Policy/Update",
  async (data: IGetPolicyByIdData) => {
    try {
      Insertdata(data);
      const response = await updatePolicyService(dataduplicate);
      return response.data;
    } catch (error__) {
      const myError = error__ as Error | AxiosError;
      const error_ =
        axios.isAxiosError(myError) && myError.response
          ? myError.response.data.Errors[0]
          : myError.message;
      throw error_;
    }
  }
);

const slice = createSlice({
  name: "policyCreate",
  initialState,
  reducers: {
    setForm: (state, action) => {
      state.data.form = action.payload;
    },
    setFormError: (state, action) => {
      state.data.errors = action.payload;
    },
  },
  extraReducers(builder): void {
    builder.addCase(createPolicy.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createPolicy.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createPolicy.rejected, (state, action) => {
      state.loading = false;
      action.payload = action.error;
      state.error = error(action.payload);
    });
    builder.addCase(getPolicybyId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPolicybyId.fulfilled, (state, action) => {
      state.loading = false;
      state.data.form = action.payload.Data;
      bindPolicyData(state, action);
    });
    builder.addCase(getPolicybyId.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information
      action.payload = action.error;
      state.error = error(action.payload);
    });

    builder.addCase(updatePolicy.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePolicy.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updatePolicy.rejected, (state, action) => {
      state.loading = false;
      action.payload = action.error;
      state.error = error(action.payload);
    });
  },
});

export const { setForm, setFormError } = slice.actions;
export default slice.reducer;
