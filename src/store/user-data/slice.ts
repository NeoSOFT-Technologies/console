import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  adminLogin,
  getTenantDetailsService,
  getUserDetailsService,
} from "../../services";
import { IUserDataState } from "../../types/index";
import error from "../../utils/error";

interface IConditions {
  userName: string;
  tenantName: string;
  type: string;
}
const initialState: IUserDataState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const getUserData = createAsyncThunk(
  "user/data",
  async (conditions: IConditions) => {
    try {
      let response;
      switch (conditions.type) {
        case "admin":
          response = await adminLogin();
          break;
        case "tenant":
          response = await getTenantDetailsService(conditions.tenantName);
          break;
        case "user":
          response = await getUserDetailsService(
            conditions.tenantName,
            conditions.userName
          );
          break;
      }
      console.log(response);
      return response?.data;
    } catch (error_) {
      console.log("in error", error(error_));
      throw new Error(error_);
    }
  }
);

const slice = createSlice({
  name: "userData",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(getUserData.pending, (state) => {
      state.loading = true;
      state.data = undefined;
      state.error = undefined;
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      console.log("in fullfilled xyz");
      state.loading = false;
      console.log(action.payload);
      state.data = action.payload;
    });
    builder.addCase(getUserData.rejected, (state, action) => {
      console.log("in rejected");
      state.loading = false;
      // action.payload contains error information
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
