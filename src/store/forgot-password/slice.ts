import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { forgotPasswordService } from "../../services/tenant";
import errorHandler from "../../utils/error-handler";

export interface IForgetPasswordState {
  data?: {
    redirectUrl: string;
  };
  loading: boolean;
  error?: any;
}

const initialState: IForgetPasswordState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const forgotPassword = createAsyncThunk(
  "forgotPassword",
  async (tenantName: string) => {
    try {
      const response = await forgotPasswordService(tenantName);
      return response.data;
    } catch (_error) {
      const errorMessage = errorHandler(_error);
      throw new Error(errorMessage);
    }
  }
);

const slice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(forgotPassword.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action: any) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(forgotPassword.rejected, (state, action: any) => {
      state.loading = false;
      const errorMessage = JSON.parse(action.error.message);
      state.error = errorMessage;
    });
  },
});

export default slice.reducer;
