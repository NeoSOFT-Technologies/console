import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userPermissionService } from "../../../../services";
import error from "../../../../utils/error";

interface IConditions {
  tenantName: string;
  clientName: string;
}

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

export const userPermission = createAsyncThunk(
  "tenant/user-permissions",
  async (conditions: IConditions) => {
    try {
      const { tenantName, clientName } = conditions;
      const response = await userPermissionService(tenantName, clientName);
      console.log(response);
      return response.data;
    } catch (error_) {
      return error_;
    }
  }
);

const slice = createSlice({
  name: "permissions",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(userPermission.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userPermission.fulfilled, (state) => {
      state.loading = false;
      state.tenantAdded = true;
    });
    builder.addCase(userPermission.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
