import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { policyListService } from "../../../../services/policy/policy";
import { IPolicyListState } from "./index";
import error from "../../../../utils/error";
import axios, { AxiosError } from "axios";
interface IConditions {
  currentPage: number;
}

const initialState: IPolicyListState = {
  data: null,
  loading: false,
  error: null,
};

export const getPolicyList = createAsyncThunk(
  "policy/list",
  async (conditions: IConditions) => {
    const { currentPage } = conditions;
    try {
      const response = await policyListService(currentPage);
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
        TotalCount: Math.ceil(action.payload.TotalCount / 3),
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
