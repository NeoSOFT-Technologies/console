import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tenantPermissionsService } from "../../../../services";
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
      console.log(response);
      return response.data;
    } catch (error_) {
      return error_;
    }
  }
);

const slice = createSlice({
  name: "tenant",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(getTenantPermissions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTenantPermissions.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getTenantPermissions.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
