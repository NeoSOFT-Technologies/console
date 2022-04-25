import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createNewUserService } from "../../../../services/tenant";
import { ICreateNewUser } from "../../../../types/index";
import error from "../../../../utils/error";

export interface IAddUserState {
  isAdded: boolean;
  loading: boolean;
  error?: string | null;
}

const initialState: IAddUserState = {
  isAdded: false,
  loading: false,
  error: undefined,
};

export const addNewUser = createAsyncThunk(
  "tenantUser/addUser",
  async (conditions: ICreateNewUser) => {
    try {
      const response = await createNewUserService(conditions);
      return response.data;
    } catch (error_) {
      // console.log(error_, "||", error(error_));
      const errorMessage = error(error_);
      throw new Error(errorMessage);
    }
  }
);

const slice = createSlice({
  name: "tenantUserAddition",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(addNewUser.pending, (state) => {
      state.loading = true;
      state.isAdded = false;
      state.error = undefined;
    });
    builder.addCase(addNewUser.fulfilled, (state) => {
      state.loading = false;
      state.isAdded = true;
      console.log("3");
    });
    builder.addCase(addNewUser.rejected, (state, action: any) => {
      state.loading = false;
      state.isAdded = false;
      // action.payload contains error information
      const errorMessage = action.error.message.split(" ");
      state.error = errorMessage[errorMessage.length - 1];
    });
  },
});

export default slice.reducer;
