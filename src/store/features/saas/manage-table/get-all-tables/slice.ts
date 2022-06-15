import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllTablesService } from "../../../../../services/saas/api/api";
import { IPagination, ITableSchema } from "../../../../../types/saas";

interface IGetAllTableState {
  data?: ITableSchema[];
  loading: boolean;
  error?: string | null;
}
const initialState: IGetAllTableState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const getAllTables = createAsyncThunk(
  "getAllTable",
  async (data: IPagination) => {
    try {
      const response = await getAllTablesService(data);
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
  name: "getAllTableSlice",
  initialState,
  reducers: {
    setTableData: (state, action) => {
      state.data = [...action.payload];
      state.loading = false;
      state.error = undefined;
    },
  },
  extraReducers(builder): void {
    builder.addCase(getAllTables.pending, (state) => {
      state.data = undefined;
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(getAllTables.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllTables.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export const { setTableData } = slice.actions;
export default slice.reducer;
