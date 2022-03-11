import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import error from "../../../../utils/error";
import { ITenantData } from "../../../../types/index";
import { addTenantDataService } from "../../../../services";

interface IAddTenantState {
  tenantAdded?: boolean;
  loading: boolean;
  error?: string | null;
}
const initialState: IAddTenantState = {
  tenantAdded: false,
  loading: false,
  error: null,
};

export const addNewTenant = createAsyncThunk(
  "tenant/addnewtenant",
  async (conditions: ITenantData) => {
    try {
      const response = await addTenantDataService(conditions);
      console.log(response);
      return response.data;
    } catch (err) {
      return err;
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
    });
    builder.addCase(addNewTenant.fulfilled, (state, action) => {
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
