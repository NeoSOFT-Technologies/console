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
      return response.data;
    } catch (error_) {
      // console.log(error_, "||", error(error_));
      const errorMessage = error(error_);
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
      // action.payload contains error information
      const errorMessage = action.error.message.split(" ");
      state.error = errorMessage[errorMessage.length - 1];
    });
  },
});

export default slice.reducer;
