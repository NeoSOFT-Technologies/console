import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserDetailsService } from "../../../../services/users";
import { IUserDetailsData } from "../../../../types";
import error from "../../../../utils/error";

interface IConditions {
  tenantName: string;
  userName: string;
}

export interface IUserDetailsState {
  data?: IUserDetailsData;
  loading: boolean;
  error?: string;
}

const initialState: IUserDetailsState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const getUserDetails = createAsyncThunk(
  "user/details",
  async (condition: IConditions) => {
    const { tenantName, userName } = condition;
    try {
      const response = await getUserDetailsService(tenantName, userName);
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
    builder.addCase(getUserDetails.pending, (state) => {
      state.loading = true;
      state.data = undefined;
      state.error = undefined;
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getUserDetails.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
