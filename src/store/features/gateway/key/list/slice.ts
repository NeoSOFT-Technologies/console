import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { keyListService } from "../../../../../services/gateway/key/key";
import { IKeyListState } from "../../../../../store/features/gateway/key/list";
import error from "../../../../../utils/error";

interface IConditions {
  currentPage: number;
}

const initialState: IKeyListState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const getKeyList = createAsyncThunk(
  "key/list",
  async (conditions: IConditions) => {
    const { currentPage } = conditions;
    try {
      const response = await keyListService(currentPage);
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
  name: "key",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(getKeyList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getKeyList.fulfilled, (state, action) => {
      state.loading = false;
      state.data = {
        Keys: action.payload.Data.Keys,
        TotalCount: Math.ceil(action.payload.TotalCount / 3),
      };
    });
    builder.addCase(getKeyList.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information
      action.payload = action.error;
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
