import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTenantDetailsService } from "../../../../services/tenant";
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
      // console.log(error_, "||", error(error_));
      const errorMessage = error(error_);
      throw new Error(errorMessage);
    }
  }
);

const slice = createSlice({
  name: "tenantdetails",
  initialState,
  reducers: {
    resetTenantDetails: (state) => {
      state.data = undefined;
      state.loading = false;
      state.error = undefined;
    },
  },
  extraReducers(builder): void {
    builder.addCase(tenantDetails.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(tenantDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(tenantDetails.rejected, (state, action: any) => {
      state.data = undefined;
      state.loading = false;
      const errorMessage = action.error.message.split(" ");
      state.error = errorMessage[errorMessage.length - 1];
    });
  },
});

export default slice.reducer;
export const { resetTenantDetails } = slice.actions;
