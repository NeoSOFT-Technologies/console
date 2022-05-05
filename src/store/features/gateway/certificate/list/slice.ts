import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { getAllCertificateService } from "../../../../../services/gateway/api/api";
import error from "../../../../../utils/error";
import { IGetAllCertificateState } from ".";

const initialState: IGetAllCertificateState = {
  data: undefined,
  loading: false,
  error: undefined,
};
export const getAllCertificate = createAsyncThunk(
  "add/certificate",
  async () => {
    try {
      const response = await getAllCertificateService();
      console.log("response", response);
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
  name: "apiUpdate",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(getAllCertificate.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllCertificate.fulfilled, (state, action) => {
      state.loading = false;
      state.data!.form = action.payload.data.CertificateCollection;
      console.log("slice", state.data!.form);
    });
    builder.addCase(getAllCertificate.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information
      action.payload = action.error;
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
