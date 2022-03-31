import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { commonLogoutService } from "../../services";
import { IUserDataState } from "../../types/index";
import error from "../../utils/error";

const initialState: IUserDataState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const commonLogout = createAsyncThunk("user/logout", async () => {
  try {
    const response = await commonLogoutService();
    return response.data;
  } catch (error_) {
    console.log("in error", error_);
    return error_;
  }
});

const slice = createSlice({
  name: "logout",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(commonLogout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(commonLogout.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(commonLogout.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
