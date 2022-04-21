import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { IGetPolicyByIdData } from ".";
import {
  addPolicyService,
  getPolicyByIdService,
  updatePolicyService,
} from "../../../../services/policy/policy";
import error from "../../../../utils/error";
import { initialState } from "./payload";

export const createPolicy = createAsyncThunk(
  "policy",
  async (data: IGetPolicyByIdData) => {
    try {
      const response = await addPolicyService(data);
      // console.log(response);
      return response.data;
    } catch (err) {
      const myError = err as Error | AxiosError;
      if (axios.isAxiosError(myError) && myError.response)
        throw myError.response.data.Errors[0];
      else throw myError.message;
    }
  }
);
export const getPolicybyId = createAsyncThunk(
  "Policy/GetById",
  async (id: string) => {
    try {
      const response = await getPolicyByIdService(id);
      // console.log("response", response.data);
      return response.data;
    } catch (err) {
      const myError = err as Error | AxiosError;
      if (axios.isAxiosError(myError) && myError.response)
        throw myError.response.data.Errors[0];
      else throw myError.message;
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
    } catch (err) {
      const myError = err as Error | AxiosError;
      if (axios.isAxiosError(myError) && myError.response)
        throw myError.response.data.Errors[0];
      else throw myError.message;
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
    builder.addCase(createPolicy.fulfilled, (state, action) => {
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
    builder.addCase(updatePolicy.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
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
