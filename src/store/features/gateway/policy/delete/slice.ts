import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import error from "../../../../utils/error";
import { deletePolicyService } from "../../../../services/policy/policy";
import axios, { AxiosError } from "axios";
import { IDeletePolicyState } from ".";

const initialState: IDeletePolicyState = {
  isDeleted: false,
  loading: false,
  error: null,
};
export const deletePolicy = createAsyncThunk(
  "api/deletepolicy",
  async (Id: string) => {
    try {
      const response = await deletePolicyService(Id);
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
      // console.log("state ", current(state));
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
