import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateTenantDataService } from "../../../../services";
import { ITenantUserListState } from "../../../../types/index";
import error from "../../../../utils/error";

interface IData {
  createdDateTime: string;
  description: string;
  host: string;
  id: number;
  policy: string;
  port: number;
  tenantDbName: string;
  tenantId: number;
  tenantName: string;
}

const initialState: ITenantUserListState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const updateTenant = createAsyncThunk(
  "tenant/update",
  async (data: IData) => {
    try {
      const response = await updateTenantDataService(data);
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
