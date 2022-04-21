import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import error from "../../../../utils/error";
import axios, { AxiosError } from "axios";
import { IDeleteKeyState } from ".";
import { deleteKeyService } from "../../../../services/key/key";

const initialState: IDeleteKeyState = {
  isDeleted: false,
  loading: false,
  error: null,
};
export const deleteKey = createAsyncThunk(
  "api/deletekey",
  async (Id: string) => {
    try {
      const response = await deleteKeyService(Id);
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
  name: "deletekey",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(deleteKey.pending, (state) => {
      state.loading = true;
      state.isDeleted = false;
    });
    builder.addCase(deleteKey.fulfilled, (state) => {
      state.loading = false;
      state.isDeleted = true;
      // console.log("state ", current(state));
    });
    builder.addCase(deleteKey.rejected, (state, action) => {
      state.loading = false;
      state.isDeleted = false;
      // action.payload contains error information
      action.payload = action.error;
      state.error = error(action.payload);
    });
  },
});
export default slice.reducer;
