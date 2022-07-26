import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { WritableDraft } from "immer/dist/internal";
import {
  addKeyService,
  getKeyByIdService,
  updateKeyService,
} from "../../../../../services/gateway/key/key";
import error from "../../../../../utils/error";
import { initialState } from "./payload";
import { IGetKeyByIdData, IKeyCreateState } from "./index";
export let keystate: IKeyCreateState;
const commonStatement = (
  state: WritableDraft<IKeyCreateState>,
  action: any
) => {
  state.loading = false;
  action.payload = action.error;
  state.error = error(action.payload);
};
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
      keystate = {
        data: {
          form: response.data.Data,
        },
        loading: false,
        error: undefined,
      };

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
      //
      return response.data;
    } catch (error__) {
      const myError = error__ as Error | AxiosError;
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
    });
    builder.addCase(createKey.rejected, (state, action) => {
      commonStatement(state, action);
    });

    builder.addCase(getKeyById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getKeyById.fulfilled, (state, action) => {
      state.loading = false;
      state.data.form = action.payload.Data;
    });
    builder.addCase(getKeyById.rejected, (state, action) => {
      commonStatement(state, action);
    });

    builder.addCase(updateKey.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateKey.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateKey.rejected, (state, action) => {
      commonStatement(state, action);
    });
  },
});

export const { setForms, setFormErrors } = slice.actions;
export default slice.reducer;
