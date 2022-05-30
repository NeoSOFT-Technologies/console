import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCapacityPlansService } from "../../../../../services/saas/api/api";
import error from "../../../../../utils/error";

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
    console.log(
      `[createAsyncThunk] Response Data : ` + JSON.stringify(response.data)
    );
    return response.data.plans;
  } catch (error_: any) {
    // console.log(error_, "||", error(error_));
    const errorMessage = error(error_);
    // console.log(`Error : ` + JSON.stringify(error_));
    throw new Error(errorMessage);
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
      const errorMessage = action.error.message.split(" ");
      state.error = errorMessage[errorMessage.length - 1];
      if (state.error === "403" || state.error === "401") {
        alert("Invalid Token");
      }
    });
  },
});

export default slice.reducer;
