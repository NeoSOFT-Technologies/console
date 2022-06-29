import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTableByTenantService } from "../../../../../services/saas/api/api";
import {
  IAllTableList,
  IGetDeleteTableByTenant,
} from "../../../../../types/saas";

interface IGetTablesState {
  data?: IAllTableList;
  loading: boolean;
  error?: string | null;
}
const initialState: IGetTablesState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const getTableswithPage = createAsyncThunk(
  "getTablePage/getTables",
  async (data: IGetDeleteTableByTenant) => {
    try {
      const response = await getTableByTenantService(data);
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
  name: "getTableswithPageSlice",
  initialState,
  reducers: {
    setTableData1: (state, action) => {
      state.data = { ...action.payload };
      state.loading = false;
      state.error = undefined;
    },
  },
  extraReducers(builder): void {
    builder.addCase(getTableswithPage.pending, (state) => {
      state.data = undefined;
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(getTableswithPage.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getTableswithPage.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export const { setTableData1 } = slice.actions;

export default slice.reducer;
