import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllDeletedTableService } from "../../../../../services/saas/api/api";
import { IPagination, ITableSchema } from "../../../../../types/saas";

interface IGetAllDeletedTableState {
  data?: ITableSchema[];
  loading: boolean;
  error?: string | null;
}
const initialState: IGetAllDeletedTableState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const getAllDeletedTables = createAsyncThunk(
  "getAllDeleteTable",
  async (data: IPagination) => {
    try {
      const response = await getAllDeletedTableService(data);
      return response.data.tableList;
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
  name: "getAllDeleteTableSlice",
  initialState,
  reducers: {
    setDeletedTableData: (state, action) => {
      state.data = [...action.payload];
      state.loading = false;
      state.error = undefined;
    },
  },
  extraReducers(builder): void {
    builder.addCase(getAllDeletedTables.pending, (state) => {
      state.data = undefined;
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(getAllDeletedTables.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllDeletedTables.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export const { setDeletedTableData } = slice.actions;
export default slice.reducer;
