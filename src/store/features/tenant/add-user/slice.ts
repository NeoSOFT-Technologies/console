import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createNewUserService } from "../../../../services";
import { ICreateNewUser } from "../../../../types/index";
import error from "../../../../utils/error";

interface IAddUserState {
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
      return error_;
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
    });
    builder.addCase(addNewUser.fulfilled, (state) => {
      state.loading = false;
      state.isAdded = true;
    });
    builder.addCase(addNewUser.rejected, (state, action) => {
      state.loading = false;
      state.isAdded = false;
      // action.payload contains error information
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
