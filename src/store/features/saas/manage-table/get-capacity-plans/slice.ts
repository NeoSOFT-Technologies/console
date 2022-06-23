import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCapacityPlansService } from "../../../../../services/saas/api/api";
import { ICapacityPlans } from "../../../../../types/saas";

interface IGetCapacityPlanState {
  data?: ICapacityPlans[];
  loading: boolean;
  error?: string | null;
}
const initialState: IGetCapacityPlanState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const capacityPlans = createAsyncThunk("getCapacityPlans", async () => {
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
