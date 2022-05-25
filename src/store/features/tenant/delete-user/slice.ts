import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import errorHandler from "../../../../resources/tenant/error-handler";
import { deleteUserDataService } from "../../../../services/tenant";

/**
 * ! check if delete json is correct
 */
export interface IDeleteUserState {
  isDeleted?: boolean | null;
  loading: boolean;
  error?: undefined;
}

const initialState: IDeleteUserState = {
  isDeleted: false,
  loading: false,
  error: undefined,
};

export const deleteUser = createAsyncThunk(
  "tenantUser/list",
  async (userName: string) => {
    try {
      await deleteUserDataService(userName);
      return true;
    } catch (error_: any) {
      const errorMessage = errorHandler(error_);
      throw new Error(errorMessage);
    }
  }
);

const slice = createSlice({
  name: "tenantUser",
  initialState,
  reducers: {
    deleteUserReset: (state) => {
      state.error = undefined;
      state.isDeleted = false;
    },
  },
  extraReducers(builder): void {
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.loading = false;
      state.isDeleted = true;
    });
    builder.addCase(deleteUser.rejected, (state, action: any) => {
      state.loading = false;
      const errorMessage = JSON.parse(action.error.message);
      state.error = errorMessage;
    });
  },
});
export const { deleteUserReset } = slice.actions;
export default slice.reducer;
