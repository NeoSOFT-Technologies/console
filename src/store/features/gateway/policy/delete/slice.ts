import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { deletePolicyService } from "../../../../../services/gateway/policy/policy";
import error from "../../../../../utils/error";
import { IDeletePolicyState } from ".";

const initialState: IDeletePolicyState = {
  isDeleted: false,
  loading: false,
  error: undefined,
};
export const deletePolicy = createAsyncThunk(
  "api/deletepolicy",
  async (Id: string) => {
    try {
      const response = await deletePolicyService(Id);
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
  name: "deletepolicy",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(deletePolicy.pending, (state) => {
      state.loading = true;
      state.isDeleted = false;
    });
    builder.addCase(deletePolicy.fulfilled, (state) => {
      state.loading = false;
      state.isDeleted = true;
      //
    });
    builder.addCase(deletePolicy.rejected, (state, action) => {
      state.loading = false;
      state.isDeleted = false;
      // action.payload contains error information
      action.payload = action.error;
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
