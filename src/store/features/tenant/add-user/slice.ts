import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createNewUserService } from "../../../../services/tenant";
import { ICreateNewUser } from "../../../../types/index";
import errorHandler from "../../../../utils/error-handler";

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
    } catch (_error: any) {
      const errorMessage = errorHandler(_error);
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
    });
    builder.addCase(addNewUser.rejected, (state, action: any) => {
      state.loading = false;
      state.isAdded = false;
      const errorMessage = JSON.parse(action.error.message);
      state.error = errorMessage;
    });
  },
});

export default slice.reducer;
