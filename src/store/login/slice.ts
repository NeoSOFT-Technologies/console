import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { commonLoginService } from "../../services";
import error from "../../utils/error";

interface IConditions {
  userName: string;
  password: string;
  tenantName: string;
}
export interface ITokenState {
  loginVerified: boolean;
  loading: boolean;
  error?: string;
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
      console.log("in error", error_);
      throw new Error(error_);
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
    builder.addCase(commonLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
