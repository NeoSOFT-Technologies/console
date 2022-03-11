import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import error from "../../../../utils/error";
import { ITenantUserListState } from "../../../../types/index";
import { tenantUserListService } from "../../../../services";

interface IConditions {
  currentPage: number;
  search: string;
}
const initialState: ITenantUserListState = {
  data: null,
  loading: false,
  error: null,
};

export const getTenantUserList = createAsyncThunk(
  "tenantUser/list",
  async (conditions: IConditions) => {
    const { currentPage, search } = conditions;
    try {
      const response = await tenantUserListService(currentPage, search);
      console.log(response);
      return response.data;
    } catch (err) {
      return err;
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
