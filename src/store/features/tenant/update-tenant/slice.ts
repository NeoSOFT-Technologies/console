import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import error from "../../../../utils/error";
import { ITenantUserListState, ITenantData } from "../../../../types/index";
import { updateTenantDataService } from "../../../../services";

interface IConditions {
  id: number;
  data: ITenantData;
}
const initialState: ITenantUserListState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const updateTenant = createAsyncThunk(
  "tenant/update",
  async (conditions: IConditions) => {
    const { id, data } = conditions;
    try {
      const response = await updateTenantDataService(id, data);
      console.log(response);
      return response.data;
    } catch (error_) {
      return error_;
    }
  }
);

const slice = createSlice({
  name: "tenantUpdate",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(updateTenant.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTenant.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(updateTenant.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
