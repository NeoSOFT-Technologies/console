import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateUserPassword } from "../../../../services/users";
import error from "../../../../utils/error";

interface IConditions {
  id: number;
  password: string;
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
    const { id, password } = condition;
    try {
      const response = await updateUserPassword(id, password);
      console.log(response);
      return response.data;
    } catch (error_) {
      return error_;
    }
  }
);

const slice = createSlice({
  name: "userUpdate",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.isUpdated = false;
    });
    builder.addCase(updateUser.fulfilled, (state) => {
      state.loading = false;
      state.isUpdated = true;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;