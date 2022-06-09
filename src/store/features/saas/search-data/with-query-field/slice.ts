import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchDataWithQueryFieldService } from "../../../../../services/saas/api/api";
import { ISearchDataWithQueryField } from "../../../../../types/saas";

interface ISearchDataQueryFieldState {
  data?: any[];
  loading: boolean;
  error?: string | null;
}
const initialState: ISearchDataQueryFieldState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const searchDataWithQueryField = createAsyncThunk(
  "searchDataWithQueryField",
  async (data: ISearchDataWithQueryField) => {
    try {
      const response = await searchDataWithQueryFieldService(data);
      return response.data.results.data;
    } catch (error_: any) {
      let errorMsg = "Undefined Error";
      errorMsg =
        error_.response.data !== undefined
          ? error_.response.data.message
          : error_.message;
      throw new Error(errorMsg);
    }
  }
);

const slice = createSlice({
  name: "searchDataWithQueryFieldSlice",
  initialState,
  reducers: {
    resetSearchDataWithQueryField: (state) => {
      state.data = undefined;
      state.loading = false;
      state.error = undefined;
    },
    resetSearchData: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = undefined;
    },
  },
  extraReducers(builder): void {
    builder.addCase(searchDataWithQueryField.pending, (state) => {
      state.data = undefined;
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(searchDataWithQueryField.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(searchDataWithQueryField.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export default slice.reducer;
export const { resetSearchDataWithQueryField, resetSearchData } = slice.actions;
