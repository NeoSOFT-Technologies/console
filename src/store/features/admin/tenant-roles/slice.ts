import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tenantRolesService } from "../../../../services";
import { ITenantRolesState } from "../../../../types/index";
import error from "../../../../utils/error";

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
    builder.addCase(getTenantRoles.pending, (state) => {
      state.loading = true;
      state.data = undefined;
      state.error = undefined;
    });
    builder.addCase(getTenantRoles.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getTenantRoles.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
