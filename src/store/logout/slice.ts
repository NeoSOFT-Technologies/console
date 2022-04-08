import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { commonLogoutService } from "../../services";
import error from "../../utils/error";

interface IConditions {
  data: undefined;
  loading: boolean;
  error: string | undefined;
}

const initialState: IConditions = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const commonLogout = createAsyncThunk("user/logout", async () => {
  try {
    const response = await commonLogoutService();
    return response.data;
  } catch (error_) {
    // console.log("in error", error_);
    throw new Error(error(error_));
  }
});

const slice = createSlice({
  name: "logout",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(commonLogout.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(commonLogout.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(commonLogout.rejected, (state, action) => {
      state.loading = false;
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
