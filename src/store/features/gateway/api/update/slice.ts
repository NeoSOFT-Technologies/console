import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import error from "../../../../utils/error";
import {
  getApiByIdService,
  updateApiService,
} from "../../../../services/api/api";
import { initialState } from "./payload";
import { IGetApiByIdData } from ".";
import axios, { AxiosError } from "axios";

export const getApiById = createAsyncThunk(
  "api/getApiById",
  async (Id: any) => {
    try {
      const response = await getApiByIdService(Id);
      return response?.data;
    } catch (err) {
      const myError = err as Error | AxiosError;
      if (axios.isAxiosError(myError) && myError.response)
        throw myError.response.data.Errors[0];
      else throw myError.message;
    }
  }
);
export const updateApi = createAsyncThunk(
  "api/update",
  async (data: IGetApiByIdData) => {
    try {
      const response = await updateApiService(data);
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
  name: "apiUpdate",
  initialState,
  reducers: {
    setForm: (state, action) => {
      state.data.form = action.payload;
      // console.log("form data : ", state.data.form);
    },
    setFormError: (state, action) => {
      state.data.errors = action.payload;
      // console.log("form error : ", state.data.errors);
    },
  },
  extraReducers(builder): void {
    builder.addCase(getApiById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getApiById.fulfilled, (state, action) => {
      state.loading = false;
      state.data.form = action.payload.Data;
    });
    builder.addCase(getApiById.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information
      action.payload = action.error;
      state.error = error(action.payload);
    });
    builder.addCase(updateApi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateApi.fulfilled, (state, action) => {
      state.loading = false;
      // state.data = action.payload;
    });
    builder.addCase(updateApi.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information
      action.payload = action.error;
      state.error = error(action.payload);
    });
  },
});

export const { setForm, setFormError } = slice.actions;
export default slice.reducer;
