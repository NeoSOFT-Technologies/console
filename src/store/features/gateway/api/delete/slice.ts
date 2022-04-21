import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import error from "../../../../utils/error";
import { deleteApiService } from "../../../../services/api/api";
import axios, { AxiosError } from "axios";
import { IDeleteApiState } from ".";

const initialState: IDeleteApiState = {
  isDeleted: false,
  loading: false,
  error: null,
};
export const deleteApi = createAsyncThunk(
  "api/deleteapi",
  async (Id: string) => {
    try {
      const response = await deleteApiService(Id);
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
      // console.log("state ", current(state));
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
