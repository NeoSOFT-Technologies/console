import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { apiListService } from "../../../../../services/gateway/api/api";
import error from "../../../../../utils/error";
import { IApiListState } from "./index";

interface IConditions {
  currentPage: number;
  pageSize: number;
}

const initialState: IApiListState = {
  data: undefined,
  TotalApisCount: 0,
  // pageSize: 0,
  loading: false,
  error: undefined,
};
export const getApiList = createAsyncThunk(
  "api/list",
  async (conditions: IConditions) => {
    const { currentPage, pageSize } = conditions;
    try {
      //
      const response = await apiListService(currentPage, pageSize);
      // initialState.pageSize = pageSize;
      //
      return response?.data;
    } catch (error_) {
      const myError = error_ as Error | AxiosError;
      throw axios.isAxiosError(myError) && myError.response
        ? myError.response.data.Errors[0]
        : myError.message;
    }
  }
);

const slice = createSlice({
  name: "api",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(getApiList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getApiList.fulfilled, (state, action) => {
      state.loading = false;
      state.data = {
        Apis: action.payload.Data.Apis,
        TotalCount: Math.ceil(
          action.payload.TotalCount / action.payload.PageSize
        ),
      };
      state.TotalApisCount = action.payload.TotalCount;
    });
    builder.addCase(getApiList.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information

      action.payload = action.error;
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
