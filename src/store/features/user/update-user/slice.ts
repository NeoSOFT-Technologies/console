import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateUserDataService } from "../../../../services/tenant/users";
import errorHandler from "../../../../utils/error-handler";

interface IConditions {
  username: string;
  email: string;
  roles: string[];
}

export interface IUpdateUserState {
  isUpdated: boolean;
  loading: boolean;
  error?: any;
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
      let data = JSON.parse(localStorage.getItem("user_info") || "{}");
      if (data.username === condition.username) {
        data = { ...data, ...condition };
        localStorage.setItem("user_info", JSON.stringify(data));
      }

      return response.data;
    } catch (_error: any) {
      const errorMessage = errorHandler(_error);
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
      const errorMessage = JSON.parse(action.error.message);
      state.error = errorMessage;
    });
  },
});

export default slice.reducer;
export const { resetUpdateUserState } = slice.actions;
