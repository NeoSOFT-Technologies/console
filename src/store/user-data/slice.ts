import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  adminLoginData,
  getTenantDetailsService,
  getUserDetailsService,
} from "../../services/tenant";
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
          response = await adminLoginData();
          // response = {
          //   data: {
          //     id: "72c56ed1-52d4-4add-a6f4-f3d8cb99323d",
          //     createdTimestamp: "2022/04/20 05:39:09",
          //     username: "admin",
          //     enabled: true,
          //     emailVerified: false,
          //     access: {
          //       manageGroupMembership: true,
          //       view: true,
          //       mapRoles: true,
          //       impersonate: true,
          //       manage: true,
          //     },
          //     roles: ["default-roles-master", "admin"],
          //   },
          // };
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
      // console.log(response);
      return response?.data;
    } catch (error_) {
      // console.log(error_, "||", error(error_));
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
      // console.log("in fullfilled xyz");
      state.loading = false;
      // console.log(action.payload);
      state.data = action.payload;
    });
    builder.addCase(getUserData.rejected, (state, action: any) => {
      // console.log("in rejected");
      state.loading = false;
      const errorMessage = action.error.message.split(" ");
      state.error = errorMessage[errorMessage.length - 1];
    });
  },
});

export default slice.reducer;
