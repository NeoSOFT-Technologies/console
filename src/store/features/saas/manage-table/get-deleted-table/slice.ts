import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDeleteTableByTenantService } from "../../../../../services/saas/api/api";
import {
  IGetDeleteTableByTenant,
  ITableSchema,
} from "../../../../../types/saas";

interface IGetDeletedTableState {
  data?: ITableSchema[];
  loading: boolean;
  error?: string | null;
}
const initialState: IGetDeletedTableState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const getDeletedTableByTenant = createAsyncThunk(
  "getDeleteTable",
  async (data: IGetDeleteTableByTenant) => {
    try {
      const response = await getDeleteTableByTenantService(data);
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
  name: "getDeleteTableByTenantSlice",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(getDeletedTableByTenant.pending, (state) => {
      state.data = undefined;
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(getDeletedTableByTenant.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getDeletedTableByTenant.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export default slice.reducer;
