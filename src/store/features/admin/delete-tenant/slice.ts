import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import errorHandler from "../../../../resources/tenant/error-handler";
import { deleteTenantDataService } from "../../../../services/tenant";

interface IDeleteTenantState {
  isDeleted?: boolean;
  loading: boolean;
  error?: string | null;
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
    } catch (error_: any) {
      const errorMessage = errorHandler(error_);
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
