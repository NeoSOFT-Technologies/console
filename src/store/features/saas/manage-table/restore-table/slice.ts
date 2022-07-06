import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { restoreTableService } from "../../../../../services/saas/api/api";
import { ITableSchema } from "../../../../../types/saas";

interface IRestoreTableState {
  data?: string;
  loading: boolean;
  error?: string | null;
}
const initialState: IRestoreTableState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const restoreTable = createAsyncThunk(
  "restoreTableByTableName",
  async (data: ITableSchema) => {
    try {
      const response = await restoreTableService(data.tableName, data.tenantId);
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
  name: "restoreTableSlice",
  initialState,
  reducers: {
    restoreTableReset: (state) => {
      state.data = undefined;
      state.loading = false;
      state.error = undefined;
    },
  },
  extraReducers(builder): void {
    builder.addCase(restoreTable.pending, (state) => {
      state.data = undefined;
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(restoreTable.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(restoreTable.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export const { restoreTableReset } = slice.actions;
export default slice.reducer;
