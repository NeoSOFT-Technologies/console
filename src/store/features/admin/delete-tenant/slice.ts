import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteTenantDataService } from "../../../../services/tenant";
import errorHandler from "../../../../utils/error-handler";

interface IDeleteTenantState {
  isDeleted?: boolean;
  loading: boolean;
  error?: any;
}

const initialState: IDeleteTenantState = {
  isDeleted: false,
  loading: false,
  error: undefined,
};

export const deleteTenant = createAsyncThunk(
  "tenant/deletetenant",
  async (tenantName: string) => {
    try {
      const response = await deleteTenantDataService(tenantName);
      return response.data;
    } catch (_error: any) {
      const errorMessage = errorHandler(_error);
      throw new Error(errorMessage);
    }
  }
);

const slice = createSlice({
  name: "deletetenant",
  initialState,
  reducers: {
    deleteTenantReset: (state) => {
      state.error = undefined;
      state.isDeleted = false;
    },
  },
  extraReducers(builder): void {
    builder.addCase(deleteTenant.pending, (state) => {
      state.loading = true;
      state.isDeleted = false;
      state.error = undefined;
    });
    builder.addCase(deleteTenant.fulfilled, (state) => {
      state.loading = false;
      state.isDeleted = true;
    });
    builder.addCase(deleteTenant.rejected, (state, action: any) => {
      state.loading = false;
      state.isDeleted = false;
      const errorMessage = JSON.parse(action.error.message);
      state.error = errorMessage;
    });
  },
});
export const { deleteTenantReset } = slice.actions;
export default slice.reducer;
