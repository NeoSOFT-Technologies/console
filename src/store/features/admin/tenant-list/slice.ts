import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tenantListService } from "../../../../services";
import { ITenantListState } from "../../../../types/index";
import error from "../../../../utils/error";

interface IConditions {
  currentPage: number;
  search: string;
  // isActive : string;
}

const initialState: ITenantListState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const getTenantList = createAsyncThunk(
  "tenant/list",
  async (conditions: IConditions) => {
    const { currentPage, search } = conditions;
    try {
      const response = await tenantListService(currentPage, search);
      // console.log(response);
      return response.data;
    } catch (error_) {
      return error_;
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
    });
    builder.addCase(getTenantList.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getTenantList.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
