import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserDetailsService } from "../../../../services/users";
import error from "../../../../utils/error";

interface IConditions {
  tenantName: string;
  userName: string;
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
export const userDetails = createAsyncThunk(
  "user/details",
  async (condition: IConditions) => {
    const { tenantName, userName } = condition;
    try {
      const response = await getUserDetailsService(tenantName, userName);
      // console.log(response);
      return response.data;
    } catch (error_) {
      return error_;
    }
  }
);

const slice = createSlice({
  name: "userdetails",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(userDetails.pending, (state) => {
      state.loading = true;
      state.isUpdated = false;
    });
    builder.addCase(userDetails.fulfilled, (state) => {
      state.loading = false;
      state.isUpdated = true;
    });
    builder.addCase(userDetails.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
