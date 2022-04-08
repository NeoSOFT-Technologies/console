import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminLoginData, getUserDetailsService } from "../../services";
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
          break;
        case "tenant":
          // response = await getTenantDetailsService(conditions.tenantName);
          response = {
            data: {
              id: 4,
              tenantId: 4,
              tenantName: "Rohit",
              description: "i am Rohit",
              createdDateTime: "2022/04/06 17:27:46",
              databaseName: "db-Rohit",
              host: "127.0.0.1",
              port: 3306,
              policy: "{ max_size: 30 }",
            },
          };
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
      // console.log("in error", error(error_));
      throw new Error(error(error_));
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
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
