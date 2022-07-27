import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { getAllCertificateService } from "../../../../../services/gateway/api/api";
import error from "../../../../../utils/error";
import { ICertificateState, IGetAllCertificateState } from ".";

const initialState: IGetAllCertificateState = {
  data: undefined,
  loading: false,
  error: undefined,
};
export const getAllCertificate = createAsyncThunk(
  "get/certificate",
  async () => {
    try {
      const response = await getAllCertificateService();

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
  name: "getcertificate",
  initialState,
  reducers: {
    setFormCert: (state, action) => {
      (state.data as ICertificateState).CertificateCollection = action.payload;
    },
  },
  extraReducers(builder): void {
    builder.addCase(getAllCertificate.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllCertificate.fulfilled, (state, action) => {
      state.loading = false;
      state.data = {
        CertificateCollection: action.payload.CertificateCollection,
      };
    });
    builder.addCase(getAllCertificate.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information
      action.payload = action.error;
      state.error = error(action.payload);
    });
  },
});

export const { setFormCert } = slice.actions;
export default slice.reducer;
