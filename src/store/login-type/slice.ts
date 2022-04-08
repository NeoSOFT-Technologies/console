import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { IUserDataState } from "../../types/index";
import error from "../../utils/error";

export interface ILoginTypeState {
  data: string;
  loading: boolean;
  error?: string | null;
}

const initialState: ILoginTypeState = {
  data: "admin",
  loading: false,
  error: undefined,
};

export const checkLoginType = createAsyncThunk(
  "login/type",
  async (type: string) => {
    try {
      return type;
    } catch (error_) {
      return error_;
    }
  }
);

const slice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(checkLoginType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(checkLoginType.fulfilled, (state, action: any) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(checkLoginType.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
