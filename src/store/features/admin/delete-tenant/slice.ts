import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteTenantDataService } from "../../../../services";
import error from "../../../../utils/error";

interface IDeleteTenantState {
  isDeleted?: boolean;
  loading: boolean;
  error?: string | null;
}

const initialState: IDeleteTenantState = {
  isDeleted: false,
  loading: false,
  error: undefined,
};

export const deleteTenant = createAsyncThunk(
  "tenant/deletetenant",
  async (tenantName: string) => {
    try {
      const response = await deleteTenantDataService(tenantName);
      return response.data;
    } catch (error_) {
      // console.log(error_, "||", error(error_));
      const errorMessage = error(error_);
      throw new Error(errorMessage);
    }
  }
);

const slice = createSlice({
  name: "deletetenant",
  initialState,
  reducers: {
    deleteTenantReset: (state) => {
      console.log(initialState, "inside reducer", state);
      console.log(JSON.stringify(state));
      state.error = undefined;
      state.isDeleted = false;
      console.log(JSON.stringify(state));
      // state.error = initialState.error;
    },
  },
  extraReducers(builder): void {
    builder.addCase(deleteTenant.pending, (state) => {
      state.loading = true;
      state.isDeleted = false;
      state.error = undefined;
    });
    builder.addCase(deleteTenant.fulfilled, (state) => {
      state.loading = false;
      state.isDeleted = true;
    });
    builder.addCase(deleteTenant.rejected, (state, action: any) => {
      state.loading = false;
      state.isDeleted = false;
      // action.payload contains error information
      const errorMessage = action.error.message.split(" ");
      state.error = errorMessage[errorMessage.length - 1];
    });
  },
});
export const { deleteTenantReset } = slice.actions;
export default slice.reducer;
