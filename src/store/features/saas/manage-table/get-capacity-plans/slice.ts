import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCapacityPlansService } from "../../../../../services/saas/api/api";

interface IGetCapacityPlanState {
  data?: string[] | CapacityPalanProperties;

  loading: boolean;
  error?: string | null;
}
const initialState: IGetCapacityPlanState = {
  data: undefined,
  loading: false,
  error: undefined,
};

interface CapacityPalanProperties {
  map: any;
  sku: string;
  name: string;
  replicas: string;
  shards: string;
}

export const capacityPlans = createAsyncThunk("getCapacityPlans", async () => {
  // async (data: ITableCreateData) => {
  try {
    const response = await getCapacityPlansService();
    return response.data.plans;
  } catch (_error: any) {
    let errorMsg = "Undefined Error";
    errorMsg =
      _error.response.data !== undefined
        ? _error.response.data.message
        : _error.message;
    throw new Error(errorMsg);
  }
});

const slice = createSlice({
  name: "capacityPlanSlice",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(capacityPlans.pending, (state) => {
      state.data = undefined;
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(capacityPlans.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(capacityPlans.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default slice.reducer;
