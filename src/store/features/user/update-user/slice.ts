import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateUserDataService } from "../../../../services/tenant/users";
import error from "../../../../utils/error";

interface IConditions {
  username: string;
  email: string;
  roles: string[];
}

export interface IUpdateUserState {
  isUpdated: boolean;
  loading: boolean;
  error?: string;
}

const initialState: IUpdateUserState = {
  isUpdated: false,
  loading: false,
  error: undefined,
};

export const updateUser = createAsyncThunk(
  "user/update",
  async (condition: IConditions) => {
    try {
      const response = await updateUserDataService(condition);
      return response.data;
    } catch (error_) {
      const errorMessage = error(error_);
      throw new Error(errorMessage);
    }
  }
);

const slice = createSlice({
  name: "userUpdate",
  initialState,
  reducers: {
    resetUpdateUserState: (state) => {
      state.isUpdated = false;
      state.loading = false;
      state.error = undefined;
    },
  },
  extraReducers(builder): void {
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.isUpdated = false;
      state.error = undefined;
    });
    builder.addCase(updateUser.fulfilled, (state) => {
      state.loading = false;
      state.isUpdated = true;
    });
    builder.addCase(updateUser.rejected, (state, action: any) => {
      state.loading = false;
      const errorMessage = action.error.message.split(" ");
      state.error = errorMessage[errorMessage.length - 1];
    });
  },
});

export default slice.reducer;
export const { resetUpdateUserState } = slice.actions;
