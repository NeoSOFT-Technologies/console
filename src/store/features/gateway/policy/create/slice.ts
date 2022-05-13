import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import {
  addPolicyService,
  getPolicyByIdService,
  updatePolicyService,
} from "../../../../../services/gateway/policy/policy";
import error from "../../../../../utils/error";
import { initialState } from "./payload";
import { IGetPolicyByIdData, IPolicyCreateState } from ".";
// export const emptyState: IPolicyCreateState = { ...initialState };
export let policystate: IPolicyCreateState;
export const createPolicy = createAsyncThunk(
  "policy",
  async (data: IGetPolicyByIdData) => {
    try {
      const response = await addPolicyService(data);
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
      for (let i = 0; i < response.data.Data.APIs.length; i++) {
        if (response.data.Data.APIs[i].Limit === null) {
          const limits = {
            rate: 0,
            per: 0,
            throttle_interval: 0,
            throttle_retry_limit: 0,
            quota_max: 0,
            quota_renews: 0,
            quota_remaining: 0,
            quota_renewal_rate: 0,
          };
          response.data.Data.APIs[i].Limit = limits;
        }
      }
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
      const response = await updatePolicyService(data);

      // console.log(response);
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
      // state.data = action.payload;
    });
    builder.addCase(createPolicy.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information
      action.payload = action.error;
      state.error = error(action.payload);
    });
    builder.addCase(getPolicybyId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPolicybyId.fulfilled, (state, action) => {
      state.loading = false;
      state.data.form = action.payload.Data;
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
      // state.data = action.payload;
    });
    builder.addCase(updatePolicy.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information
      action.payload = action.error;
      state.error = error(action.payload);
    });
  },
});

export const { setForm, setFormError } = slice.actions;
export default slice.reducer;
