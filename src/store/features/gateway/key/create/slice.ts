import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import {
  addKeyService,
  getKeyByIdService,
  updateKeyService,
} from "../../../../../services/gateway/key/key";
import error from "../../../../../utils/error";
import { initialState } from "./payload";
import { IGetKeyByIdData, IKeyCreateState } from "./index";
export let keystate: IKeyCreateState;
function rejectedAction(state: IKeyCreateState, action: any) {
  state.loading = false;
  action.payload = action.error;
  state.error = error(action.payload);
}
function handleError(_error: unknown) {
  const myError = _error as Error | AxiosError;
  throw axios.isAxiosError(myError) && myError.response
    ? myError.response.data.Errors[0]
    : myError.message;
}
export const createKey = createAsyncThunk(
  "key/create",
  async (data: IGetKeyByIdData) => {
    try {
      const response = await addKeyService(data);
      return response.data;
    } catch (_error) {
      handleError(_error);
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
    } catch (_error) {
      handleError(_error);
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
    } catch (_error) {
      handleError(_error);
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
      rejectedAction(state, action);
    });

    builder.addCase(getKeyById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getKeyById.fulfilled, (state, action) => {
      state.loading = false;
      state.data.form = action.payload.Data;
    });
    builder.addCase(getKeyById.rejected, (state, action) => {
      rejectedAction(state, action);
    });

    builder.addCase(updateKey.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateKey.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateKey.rejected, (state, action) => {
      rejectedAction(state, action);
    });
  },
});

export const { setForms, setFormErrors } = slice.actions;
export default slice.reducer;
