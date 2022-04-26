import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { policyListService } from "../../../../../services/gateway/policy/policy";
import error from "../../../../../utils/error";
import { IPolicyListState } from "./index";

interface IConditions {
  currentPage: number;
  pageSize: number;
}

const initialState: IPolicyListState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const getPolicyList = createAsyncThunk(
  "policy/list",
  async (conditions: IConditions) => {
    const { currentPage, pageSize } = conditions;
    try {
      const response = await policyListService(currentPage, pageSize);
      return response.data;
    } catch (error_) {
      const myError = error_ as Error | AxiosError;
      throw axios.isAxiosError(myError) && myError.response
        ? myError.response.data.Errors[0]
        : myError.message;
    }
  }
);

const slice = createSlice({
  name: "policy",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(getPolicyList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPolicyList.fulfilled, (state, action) => {
      state.loading = false;
      state.data = {
        Policies: action.payload.Data.Policies,
        TotalCount: Math.ceil(
          action.payload.TotalCount / action.payload.PageSize
        ),
      };
    });
    builder.addCase(getPolicyList.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information
      action.payload = action.error;
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
