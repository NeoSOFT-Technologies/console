import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import error from "../../utils/error";
import { IUserDataState } from "../../types/index";
import { getUserListService } from "../../services";

const initialState: IUserDataState = {
  data: null,
  loading: false,
  error: null,
};

export const getUserList = createAsyncThunk(
  "user/data",
  async (conditions: string) => {
    try {
      const response = await getUserListService(conditions);
      console.log(response);
      return response.data[0];
    } catch (err) {
      return err;
    }
  }
);

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(getUserList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserList.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getUserList.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
