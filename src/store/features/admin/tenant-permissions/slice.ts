import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tenantPermissionsService } from "../../../../services/tenant";
import { ITenantPermissionsState } from "../../../../types/index";
import error from "../../../../utils/error";

const initialState: ITenantPermissionsState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const getTenantPermissions = createAsyncThunk(
  "tenant/permissions",
  async (tenantName: string) => {
    try {
      const response = await tenantPermissionsService(tenantName);
      return response.data;
    } catch (error_) {
      const errorMessage = error(error_);
      throw new Error(errorMessage);
    }
  }
);

const slice = createSlice({
  name: "tenantPermissions",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(getTenantPermissions.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(getTenantPermissions.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getTenantPermissions.rejected, (state, action: any) => {
      state.loading = false;

      const errorMessage = action.error.message.split(" ");
      state.error = errorMessage[errorMessage.length - 1];
    });
  },
});

export default slice.reducer;
