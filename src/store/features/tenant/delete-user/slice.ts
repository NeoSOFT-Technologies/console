import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteUserDataService } from "../../../../services";
import error from "../../../../utils/error";

/**
 * ! check if delete json is correct
 */
export interface IDeleteUserState {
  isDeleted?: boolean | null;
  loading: boolean;
  error?: string | null;
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
      const response = await deleteUserDataService(userName);
      return response.data.data;
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
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    });
    builder.addCase(deleteUser.rejected, (state, action: any) => {
      state.loading = false;
      // action.payload contains error information
      const errorMessage = action.error.message.split(" ");
      state.error = errorMessage[errorMessage.length - 1];
    });
  },
});

export default slice.reducer;
