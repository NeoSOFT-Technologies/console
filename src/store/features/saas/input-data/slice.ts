import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTenantListService } from "../../../../services/saas/api/api";
import { ITenantDetails } from "../../../../types/saas";
import error from "../../../../utils/error";

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
      //   console.log(
      //     `[createAsyncThunk] Response Data : ` + JSON.stringify(response.data)
      //   );
      return response.data.data;
    } catch (error_: any) {
      // console.log(error_, "||", error(error_));
      const errorMessage = error(error_);
      // console.log(`Error : ` + JSON.stringify(error_));
      throw new Error(errorMessage);
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
      const errorMessage = action.error.message.split(" ");
      state.error = errorMessage[errorMessage.length - 1];
      if (state.error === "403" || state.error === "401") {
        alert("Invalid Token");
      }
    });
  },
});

export default slice.reducer;
