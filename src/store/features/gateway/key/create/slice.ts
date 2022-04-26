import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { addKeyService } from "../../../../../services/gateway/key/key";
import error from "../../../../../utils/error";
import { initialState } from "./payload";
import { IGetKeyByIdData } from "./index";

export const createKey = createAsyncThunk(
  "key/create",
  async (data: IGetKeyByIdData) => {
    try {
      const response = await addKeyService(data);
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
  name: "keyCreate",
  initialState,
  reducers: {
    setForms: (state, action) => {
      state.data.form = action.payload;
      console.log("Form -", state.data.form);
    },
    setFormErrors: (state, action) => {
      state.data.errors = action.payload;
    },
  },
  extraReducers(builder): void {
    builder.addCase(createKey.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createKey.fulfilled, (state) => {
      state.loading = false;
      // state.data = action.payload;
    });
    builder.addCase(createKey.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information
      action.payload = action.error;
      state.error = error(action.payload);
    });
  },
});

export const { setForms, setFormErrors } = slice.actions;
export default slice.reducer;
