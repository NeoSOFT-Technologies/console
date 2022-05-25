import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import errorHandler from "../../../../resources/tenant/error-handler";
import { updateTenantDataService } from "../../../../services/tenant";
import { ITenantDetail } from "../../../../types/index";

export interface IUpdateTenantState {
  isUpdated: boolean;
  loading: boolean;
  error?: string | undefined;
}

const initialState: IUpdateTenantState = {
  isUpdated: false,
  loading: false,
  error: undefined,
};

export const updateTenant = createAsyncThunk(
  "tenant/update",
  async (data: ITenantDetail) => {
    try {
      const response = await updateTenantDataService(data);
      return response.data;
    } catch (error_: any) {
      const errorMessage = errorHandler(error_);
      throw new Error(errorMessage);
    }
  }
);

const slice = createSlice({
  name: "tenantUpdate",
  initialState,
  reducers: {
    resetUpdateTenantState: (state) => {
      state.isUpdated = false;
      state.loading = false;
      state.error = undefined;
    },
  },
  extraReducers(builder): void {
    builder.addCase(updateTenant.pending, (state) => {
      state.loading = true;
      state.error = undefined;
      state.isUpdated = false;
    });
    builder.addCase(updateTenant.fulfilled, (state) => {
      state.loading = false;
      state.isUpdated = true;
    });
    builder.addCase(updateTenant.rejected, (state, action: any) => {
      state.loading = false;
      state.isUpdated = false;
      const errorMessage = JSON.parse(action.error.message);
      state.error = errorMessage;
    });
  },
});

export default slice.reducer;
export const { resetUpdateTenantState } = slice.actions;
