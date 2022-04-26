import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addTenantDataService } from "../../../../services/tenant";
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
      return response.data;
    } catch (error_) {
      // console.log(error_, "||", error(error_));
      const errorMessage = error(error_);
      throw new Error(errorMessage);
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
      state.error = undefined;
    });
    builder.addCase(addNewTenant.fulfilled, (state) => {
      state.loading = false;
      state.tenantAdded = true;
    });
    builder.addCase(addNewTenant.rejected, (state, action: any) => {
      state.loading = false;
      // console.log(Number(errorMessage[errorMessage.length - 1]), action);
      const errorMessage = action.error.message.split(" ");
      state.error = errorMessage[errorMessage.length - 1];
    });
  },
});

export default slice.reducer;
