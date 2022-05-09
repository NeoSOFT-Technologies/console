import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import {
  addKeyService,
  getKeyByIdService,
  updateKeyService,
} from "../../../../../services/gateway/key/key";
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

export const getKeyById = createAsyncThunk(
  "key/getKeyById",
  async (id: string) => {
    try {
      const response = await getKeyByIdService(id);
      // console.log("response", response.data);
      return response.data;
    } catch (error_) {
      const myError = error_ as Error | AxiosError;
      throw axios.isAxiosError(myError) && myError.response
        ? myError.response.data.Errors[0]
        : myError.message;
    }
  }
);

export const updateKey = createAsyncThunk(
  "key/Update",
  async (data: IGetKeyByIdData) => {
    try {
      const response = await updateKeyService(data);
      // console.log(response);
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
  name: "keyCreate",
  initialState,
  reducers: {
    setForms: (state, action) => {
      state.data.form = action.payload;
      console.log("Form -", current(state.data));
    },
    setFormErrors: (state, action) => {
      state.data.errors = action.payload;
      console.log("Form error -", state.data.errors);
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

    builder.addCase(getKeyById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getKeyById.fulfilled, (state, action) => {
      state.loading = false;
      state.data.form = action.payload.Data;
      console.log(" get key state", current(state));
    });
    builder.addCase(getKeyById.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information
      action.payload = action.error;
      state.error = error(action.payload);
    });

    builder.addCase(updateKey.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateKey.fulfilled, (state) => {
      state.loading = false;
      // state.data = action.payload;
    });
    builder.addCase(updateKey.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information
      action.payload = action.error;
      state.error = error(action.payload);
    });
  },
});

export const { setForms, setFormErrors } = slice.actions;
export default slice.reducer;
