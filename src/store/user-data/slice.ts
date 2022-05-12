import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  adminLoginData,
  getTenantDetailsService,
  getUserDetailsService,
} from "../../services/tenant";
import { IUserDataState } from "../../types/index";
import error from "../../utils/error";
import { checkLoginType } from "../login-type/slice";

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
  async (conditions: IConditions, thunkAPI) => {
    try {
      let response;
      switch (conditions.type) {
        case "admin":
          response = await adminLoginData();
          break;
        case "tenant":
          response = await getUserDetailsService(
            conditions.tenantName,
            conditions.userName
          );
          if (response.data.roles.includes("tenantadmin")) {
            response = await getTenantDetailsService(conditions.tenantName);
          } else {
            await thunkAPI.dispatch(checkLoginType("user"));
          }
          break;
      }
      return response?.data;
    } catch (error_) {
      const errorMessage = error(error_);
      throw new Error(errorMessage);
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
      state.loading = false;

      state.data = action.payload;
    });
    builder.addCase(getUserData.rejected, (state, action: any) => {
      state.loading = false;
      const errorMessage = action.error.message.split(" ");
      state.error = errorMessage[errorMessage.length - 1];
    });
  },
});

export default slice.reducer;
