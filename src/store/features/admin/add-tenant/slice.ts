import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addTenantDataService } from "../../../../services";
import { ITenantRegisterData } from "../../../../types/index";
import error from "../../../../utils/error";

interface IAddTenantState {
  tenantAdded?: boolean;
  loading: boolean;
  error?: string | null;
}
const initialState: IAddTenantState = {
  tenantAdded: false,
  loading: false,
  error: undefined,
};

export const addNewTenant = createAsyncThunk(
  "tenant/addnewtenant",
  async (conditions: ITenantRegisterData) => {
    try {
      const response = await addTenantDataService(conditions);
      // console.log(response);
      return response.data;
    } catch (error_) {
      return error_;
    }
  }
);

const slice = createSlice({
  name: "addtenant",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(addNewTenant.pending, (state) => {
      state.loading = true;
      state.tenantAdded = false;
    });
    builder.addCase(addNewTenant.fulfilled, (state) => {
      state.loading = false;
      state.tenantAdded = true;
    });
    builder.addCase(addNewTenant.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
