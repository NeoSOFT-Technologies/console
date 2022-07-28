import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { deleteApiService } from "../../../../../services/gateway/api/api";
import error from "../../../../../utils/error";
import { IDeleteApiState } from ".";

const initialState: IDeleteApiState = {
  isDeleted: false,
  loading: false,
  error: undefined,
};
export const deleteApi = createAsyncThunk(
  "api/deleteapi",
  async (Id: string) => {
    try {
      const response = await deleteApiService(Id);
      return response.data;
    } catch (_error) {
      const myError = _error as Error | AxiosError;
      throw axios.isAxiosError(myError) && myError.response
        ? myError.response.data.Errors[0]
        : myError.message;
    }
  }
);

const slice = createSlice({
  name: "deleteapi",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(deleteApi.pending, (state) => {
      state.loading = true;
      state.isDeleted = false;
    });
    builder.addCase(deleteApi.fulfilled, (state) => {
      state.loading = false;
      state.isDeleted = true;
      //
    });
    builder.addCase(deleteApi.rejected, (state, action) => {
      state.loading = false;
      state.isDeleted = false;
      // action.payload contains error information
      action.payload = action.error;
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
