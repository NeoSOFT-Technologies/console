import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTablesService } from "../../../../../services/saas/api/api";

interface IGetTableState {
  [x: string]: any;
  data?: string[];
  loading: boolean;
  error?: string | null;
}
const initialState: IGetTableState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const getTables = createAsyncThunk(
  "getTable/getTables",
  async (id: string) => {
    try {
      const response = await getTablesService(id);
      return response.data.data;
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
  name: "getTableSlice",
  initialState,
  reducers: {
    setTableList: (state, action) => {
      state.data = [...action.payload];
      state.loading = false;
      state.error = undefined;
    },
  },
  extraReducers(builder): void {
    builder.addCase(getTables.pending, (state) => {
      state.data = undefined;
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(getTables.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getTables.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export const { setTableList } = slice.actions;

export default slice.reducer;
