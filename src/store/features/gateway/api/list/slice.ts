import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import error from "../../../../utils/error";
import { apiListService } from "../../../../services/api/api";
import { IApiListState } from "./index";
import axios, { AxiosError } from "axios";

interface IConditions {
  currentPage: number;
  pageSize: number;
}

const initialState: IApiListState = {
  data: null,
  TotalApisCount: 0,
  // pageSize: 0,
  loading: false,
  error: null,
};
export const getApiList = createAsyncThunk(
  "api/list",
  async (conditions: IConditions) => {
    const { currentPage, pageSize } = conditions;
    try {
      // console.log(currentPage, pageSize);
      const response = await apiListService(currentPage, pageSize);
      // initialState.pageSize = pageSize;
      // console.log(response);
      return response?.data;
    } catch (err) {
      const myError = err as Error | AxiosError;
      if (axios.isAxiosError(myError) && myError.response)
        throw myError.response.data.Errors[0];
      else throw myError.message;
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
