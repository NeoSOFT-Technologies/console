import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { commonLoginService } from "../../services";
import { IUserDataState } from "../../types/index";
import error from "../../utils/error";

interface IConditions {
  userName: string;
  password: string;
  tenantName: string;
}

const initialState: IUserDataState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const commonLogin = createAsyncThunk(
  "user/data",
  async (conditions: IConditions) => {
    try {
      await commonLoginService(conditions);
      // console.log(response);
      // return response.data[0];
    } catch (error_) {
      console.log("in error", error_);
      return error_;
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
    });
    builder.addCase(commonLogin.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(commonLogin.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
