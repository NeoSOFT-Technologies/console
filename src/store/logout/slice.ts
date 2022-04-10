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
    // console.log(error_, "||", error(error_));
    const errorMessage = error(error_);
    throw new Error(errorMessage);
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
    builder.addCase(commonLogout.rejected, (state, action: any) => {
      state.loading = false;
      const errorMessage = action.error.message.split(" ");
      state.error = errorMessage[errorMessage.length - 1];
    });
  },
});

export default slice.reducer;
