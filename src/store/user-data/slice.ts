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
          // {
          //   "createdTimestamp": "2022/05/19 09:45:23",
          //   "username": "tenantadmin",
          //   "email": "tenant2@gmail.com",
          //   "tenantName": "Tenant2",
          //   "roles": [
          //     "default-roles-tenant2",
          //     "tenantadmin"
          //   ],
          //   "permissions": [
          //     "create",
          //     "view",
          //     "edit",
          //     "delete"
          //   ]
          // }
          if (response.data.roles.includes("tenantadmin")) {
            response = await getTenantDetailsService(conditions.tenantName);

            // {
            //   "tenantName": "Tenant2",
            //   "description": "hi this is Tenant2.",
            //   "createdDateTime": "2022/05/19 09:45:24",
            //   "databaseName": "db-Tenanttwo",
            //   "host": "103.224.242.138",
            //   "port": 3306,
            //   "policy": "{ max_size: 30 }"
            // }
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
  reducers: {
    setUserData: (state, action) => {
      state.data = { ...action.payload };
      state.loading = false;
      state.error = undefined;
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
      const errorMessage = action.error.message.split(" ");
      state.error = errorMessage[errorMessage.length - 1];
      // state.errorMessage = errorMessage[errorMessage.length - 1];
    });
  },
});

export default slice.reducer;
export const { setUserData } = slice.actions;
