import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tenantUserListService } from "../../../../services";
import { ITenantUserListState } from "../../../../types/index";
import error from "../../../../utils/error";

interface IConditions {
  tenantName: string;
  userName: string;
  currentPage: number;
}

const initialState: ITenantUserListState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const getTenantUserList = createAsyncThunk(
  "tenantUser/list",
  async (conditions: IConditions) => {
    const { currentPage, tenantName, userName } = conditions;
    try {
      const response = await tenantUserListService(
        tenantName,
        userName,
        currentPage
      );
      return response.data.data;
    } catch (error_) {
      return error_;
    }
  }
);

const slice = createSlice({
  name: "tenantUser",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(getTenantUserList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTenantUserList.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getTenantUserList.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
