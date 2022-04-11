import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tenantListService } from "../../../../services";
import { ITenantListState } from "../../../../types/index";
import error from "../../../../utils/error";

interface IConditions {
  currentPage: number;
}

const initialState: ITenantListState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const getTenantList = createAsyncThunk(
  "tenant/list",
  async (conditions: IConditions) => {
    const { currentPage } = conditions;
    try {
      const response = await tenantListService(currentPage);
      return response.data;
    } catch (error_) {
      // console.log(error_, "||", error(error_));
      const errorMessage = error(error_);
      throw new Error(errorMessage);
    }
  }
);

const slice = createSlice({
  name: "tenant",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(getTenantList.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(getTenantList.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getTenantList.rejected, (state, action: any) => {
      state.loading = false;
      // action.payload contains error information
      const errorMessage = action.error.message.split(" ");
      state.error = errorMessage[errorMessage.length - 1];
    });
  },
});

export default slice.reducer;
