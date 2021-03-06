import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import {
  getApiByIdService,
  updateApiService,
} from "../../../../../services/gateway/api/api";
import error from "../../../../../utils/error";
import { initialState } from "./payload";
import { IGetApiByIdData, IApiGetByIdState } from ".";

function rejectedAction(state: IApiGetByIdState, action: any) {
  state.loading = false;
  // action.payload contains error information
  action.payload = action.error;
  state.error = error(action.payload);
}

export const getApiById = createAsyncThunk(
  "api/getApiById",
  async (Id: any) => {
    try {
      const response = await getApiByIdService(Id);
      return response?.data;
    } catch (_error) {
      const myError = _error as Error | AxiosError;
      throw axios.isAxiosError(myError) && myError.response
        ? myError.response.data.Errors[0]
        : myError.message;
    }
  }
);
export const updateApi = createAsyncThunk(
  "api/update",
  async (data: IGetApiByIdData) => {
    try {
      const response = await updateApiService(data);
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
  name: "apiUpdate",
  initialState,
  reducers: {
    setForm: (state, action) => {
      state.data.form = action.payload;
      //
    },
    setFormError: (state, action) => {
      state.data.errors = action.payload;
      //
    },
  },
  extraReducers(builder): void {
    builder.addCase(getApiById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getApiById.fulfilled, (state, action) => {
      state.loading = false;
      state.data.form = action.payload.Data;

      state.data.form.Versions2 = [];

      if (action.payload.Data.Versions.length > 0) {
        for (let i = 0; i < state.data.form.Versions.length; i++) {
          state.data.form.Versions2[i] = action.payload.Data.Versions[i].Name;
        }
      } else {
        state.data.form.Versions2[0] = "Default";
      }
    });
    builder.addCase(getApiById.rejected, (state, action) => {
      rejectedAction(state, action);
    });

    builder.addCase(updateApi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateApi.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateApi.rejected, (state, action) => {
      rejectedAction(state, action);
    });
  },
});

export const { setForm, setFormError } = slice.actions;
export default slice.reducer;
