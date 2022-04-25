import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteUserDataService } from "../../../../services/tenant";
import error from "../../../../utils/error";

/**
 * ! check if delete json is correct
 */
export interface IDeleteUserState {
  isDeleted?: boolean | null;
  loading: boolean;
  error?: string;
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
    } catch (error_) {
      // console.log(error_, "||", error(error_));
      const errorMessage = error(error_);
      throw new Error(errorMessage);
    }
  }
);

const slice = createSlice({
  name: "tenantUser",
  initialState,
  reducers: {
    deleteUserReset: (state) => {
      console.log(initialState, "inside reducer", state);
      console.log(JSON.stringify(state));
      state.error = undefined;
      state.isDeleted = false;
      console.log(JSON.stringify(state));
      // state.error = initialState.error;
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
      // action.payload contains error information
      const errorMessage = action.error.message.split(" ");
      state.error = errorMessage[errorMessage.length - 1];
    });
  },
});
export const { deleteUserReset } = slice.actions;
export default slice.reducer;
