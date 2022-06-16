import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchDataWithQueryService } from "../../../../../services/saas/api/api";
import { ISearchDataWithQuery } from "../../../../../types/saas";

interface ISearchDataQueryState {
  data?: string;
  loading: boolean;
  error?: string | null;
}
const initialState: ISearchDataQueryState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const searchDataWithQuery = createAsyncThunk(
  "searchDataWithQuery",
  async (data: ISearchDataWithQuery) => {
    // async (data: ITableCreateData) => {
    try {
      const response = await searchDataWithQueryService(data);
      return response.data;
    } catch (_error: any) {
      let errorMsg = "Undefined Error";
      errorMsg =
        _error.response.data !== undefined
          ? _error.response.data.message
          : _error.message;
      throw new Error(errorMsg);
    }
  }
);

const slice = createSlice({
  name: "searchDataWithQuerySlice",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(searchDataWithQuery.pending, (state) => {
      state.data = undefined;
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(searchDataWithQuery.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(searchDataWithQuery.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default slice.reducer;
