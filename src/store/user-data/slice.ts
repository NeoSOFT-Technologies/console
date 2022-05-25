import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import errorHandler from "../../resources/tenant/error-handler";
import {
  adminLoginData,
  getTenantDetailsService,
  getUserDetailsService,
} from "../../services/tenant";
import { IUserDataState } from "../../types/index";
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
          localStorage.setItem("user_info", JSON.stringify(response.data));
          break;
        case "tenant":
          response = await getUserDetailsService();
          localStorage.setItem("user_info", JSON.stringify(response.data));
          if (response.data.roles.includes("tenantadmin")) {
            response = await getTenantDetailsService(conditions.tenantName);
            localStorage.setItem("tenant_info", JSON.stringify(response.data));
          }
          await thunkAPI.dispatch(checkLoginType());
          break;
      }
      return response?.data;
    } catch (error_) {
      const errorMessage = errorHandler(error_);
      throw new Error(errorMessage);
    }
  }
);

const slice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.data = { ...action.payload };
      state.loading = false;
      state.error = undefined;
      const data = JSON.parse(localStorage.getItem("user_info") || "{}");
      if (data.roles.includes("tenantadmin"))
        localStorage.setItem("tenant_info", JSON.stringify(action.payload));
      else localStorage.setItem("user_info", JSON.stringify(action.payload));
    },
    setLocalStorageData: (state) => {
      state.loading = false;
      state.error = undefined;
      state.data = JSON.parse(
        localStorage.getItem("tenant_info") ||
          localStorage.getItem("user_info") ||
          "undefined"
      );
    },
  },
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
      const errorMessage = JSON.parse(action.error.message);
      state.error = errorMessage;
    });
  },
});

export default slice.reducer;
export const { setUserData, setLocalStorageData } = slice.actions;
