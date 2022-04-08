import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateTenantDataService } from "../../../../services";
import { ITenantDetail } from "../../../../types/index";
import error from "../../../../utils/error";

interface IUpdateTenantState {
  data?: undefined;
  loading: boolean;
  error?: string | undefined;
}

const initialState: IUpdateTenantState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const updateTenant = createAsyncThunk(
  "tenant/update",
  async (data: ITenantDetail) => {
    try {
      const response = await updateTenantDataService(data);
      return response.data;
    } catch (error_) {
      throw new Error(error(error_));
    }
  }
);

const slice = createSlice({
  name: "tenantUpdate",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(updateTenant.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(updateTenant.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(updateTenant.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
