import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserListService } from "../../services";
import { IUserDataState } from "../../types/index";
import error from "../../utils/error";

const initialState: IUserDataState = {
  data: {
    tenantName: "Rahul kenchi",
    description: "i am going to win the world",
    email: "rahul768@gmail.com",
    password: "rahul768",
    id: 5,
    type: "tenant",
    roles: ["user"],
  },

  loading: false,
  error: undefined,
};

interface IConditions {
  tenantName: string;
  page: number;
}

export const getUserData = createAsyncThunk(
  "user/data",
  async (conditions: IConditions) => {
    try {
      const { tenantName, page } = conditions;
      const response = await getUserListService(tenantName, page);
      console.log(response);
      return response.data;
    } catch (error_) {
      return error_;
    }
  }
);

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(getUserData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserData.fulfilled, (state) => {
      state.loading = false;
      // state.data = action.payload;
    });
    builder.addCase(getUserData.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
