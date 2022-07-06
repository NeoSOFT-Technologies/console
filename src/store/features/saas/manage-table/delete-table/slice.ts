import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteTableService } from "../../../../../services/saas/api/api";
import { ITableSchema } from "../../../../../types/saas";

interface IDeleteTableState {
  data?: string;
  loading: boolean;
  error?: string | null;
}
const initialState: IDeleteTableState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const deleteTable = createAsyncThunk(
  "deleteTableByTableName",
  async (data: ITableSchema) => {
    try {
      const response = await deleteTableService(data.tableName, data.tenantId);
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
  name: "deleteTableSlice",
  initialState,
  reducers: {
    deleteTableReset: (state) => {
      state.data = undefined;
      state.loading = false;
      state.error = undefined;
    },
  },
  extraReducers(builder): void {
    builder.addCase(deleteTable.pending, (state) => {
      state.data = undefined;
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(deleteTable.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteTable.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { deleteTableReset } = slice.actions;
export default slice.reducer;
