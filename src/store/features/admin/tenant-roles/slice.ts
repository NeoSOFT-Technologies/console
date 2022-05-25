import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import errorHandler from "../../../../resources/tenant/error-handler";
import { tenantRolesService } from "../../../../services/tenant";
import { ITenantRolesState } from "../../../../types/index";

const initialState: ITenantRolesState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const getTenantRoles = createAsyncThunk(
  "tenant/roles",
  async (tenantName: string = "") => {
    try {
      const response = await tenantRolesService(tenantName);
      return response.data;
    } catch (error_: any) {
      const errorMessage = errorHandler(error_);
      throw new Error(errorMessage);
    }
  }
);

const slice = createSlice({
  name: "tenantRoles",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(getTenantRoles.pending, (state) => {
      state.loading = true;
      state.data = undefined;
      state.error = undefined;
    });
    builder.addCase(getTenantRoles.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getTenantRoles.rejected, (state, action: any) => {
      state.loading = false;
      const errorMessage = JSON.parse(action.error.message);
      state.error = errorMessage;
    });
  },
});

export default slice.reducer;
