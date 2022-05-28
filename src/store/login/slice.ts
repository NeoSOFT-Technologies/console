import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { commonLoginService } from "../../services/tenant";
import errorHandler from "../../utils/error-handler";

interface IConditions {
  userName: string;
  password: string;
  tenantName: string;
}
export interface ITokenState {
  loginVerified: boolean;
  loading: boolean;
  error?: any;
}

const initialState: ITokenState = {
  loginVerified: false,
  loading: false,
  error: undefined,
};

export const commonLogin = createAsyncThunk(
  "user/get_acessToken",
  async (conditions: IConditions) => {
    try {
      await commonLoginService(conditions);
      return true;
    } catch (error_) {
      const errorMessage = errorHandler(error_);
      throw new Error(errorMessage);
    }
  }
);

const slice = createSlice({
  name: "user_accessToken",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(commonLogin.pending, (state) => {
      state.loading = true;
      state.loginVerified = false;
      state.error = undefined;
    });
    builder.addCase(commonLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.loginVerified = action.payload;
    });
    builder.addCase(commonLogin.rejected, (state, action: any) => {
      state.loading = false;
      const errorMessage = JSON.parse(action.error.message);
      state.error = errorMessage;
    });
  },
});

export default slice.reducer;
