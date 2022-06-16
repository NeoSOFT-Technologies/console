import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTenantListService } from "../../../../services/saas/api/api";
import { ITenantDetails } from "../../../../types/saas";

interface ITenantDetailsState {
  data?: ITenantDetails[];
  loading: boolean;
  error?: string | null;
}
const initialState: ITenantDetailsState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const getTenantDetails = createAsyncThunk(
  "getTenantDetails",
  async () => {
    // async (data: ITableCreateData) => {
    try {
      const response = await getTenantListService();
      return response.data.data;
    } catch (_error: any) {
      let errorMsg = "Undefined Error";
      errorMsg =
        _error.response.data !== undefined
          ? _error.response.data.message
          : _error.message;
      throw new Error(errorMsg);
    }
  }
);

const slice = createSlice({
  name: "getTenantDetailsSlice",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(getTenantDetails.pending, (state) => {
      state.data = undefined;
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(getTenantDetails.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getTenantDetails.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default slice.reducer;
