import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userPermissionService } from "../../../../services/tenant";
import { IUserPermission } from "../../../../types/index";
import error from "../../../../utils/error";

interface IUserPermissionState {
  data?: IUserPermission[];
  loading: boolean;
  error?: string | null;
}

const initialState: IUserPermissionState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const userPermission = createAsyncThunk(
  "tenant/user-permissions",
  async (tenantName: string) => {
    try {
      const response = await userPermissionService(tenantName);
      return response.data;
    } catch (error_) {
      // console.log(error_, "||", error(error_));
      const errorMessage = error(error_);
      throw new Error(errorMessage);
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
      state.error = undefined;
    });
    builder.addCase(userPermission.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(userPermission.rejected, (state, action: any) => {
      state.loading = false;
      // action.payload contains error information
      const errorMessage = action.error.message.split(" ");
      state.error = errorMessage[errorMessage.length - 1];
    });
  },
});

export default slice.reducer;
