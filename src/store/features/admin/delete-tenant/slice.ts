import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import error from "../../../../utils/error";
import { deleteTenantDataService } from "../../../../services";

interface IAddTenantState {
  isDeleted?: boolean;
  loading: boolean;
  error?: string | null;
}

const initialState: IAddTenantState = {
  isDeleted: false,
  loading: false,
  error: undefined,
};

export const deleteTenant = createAsyncThunk(
  "tenant/deletetenant",
  async (id: number) => {
    try {
      const response = await deleteTenantDataService(id);
      // console.log(response);
      return response.data;
    } catch (error_) {
      return error_;
    }
  }
);

const slice = createSlice({
  name: "deletetenant",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(deleteTenant.pending, (state) => {
      state.loading = true;
      state.isDeleted = false;
    });
    builder.addCase(deleteTenant.fulfilled, (state) => {
      state.loading = false;
      state.isDeleted = true;
    });
    builder.addCase(deleteTenant.rejected, (state, action) => {
      state.loading = false;
      state.isDeleted = false;
      // action.payload contains error information
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
