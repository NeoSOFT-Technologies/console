import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTenantDetailsService } from "../../../../services";
import { ITenantDetail } from "../../../../types/index";
import error from "../../../../utils/error";

export interface ITenantDetailState {
  data?: ITenantDetail;
  loading: boolean;
  error?: string;
}

const initialState: ITenantDetailState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const tenantDetails = createAsyncThunk(
  "tenant/details",
  async (tenantName: string) => {
    try {
      const response = await getTenantDetailsService(tenantName);
      return response.data;
    } catch (error_) {
      return error_;
    }
  }
);

const slice = createSlice({
  name: "tenantdetails",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(tenantDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(tenantDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(tenantDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
