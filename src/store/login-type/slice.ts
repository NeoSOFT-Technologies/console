import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { IUserDataState } from "../../types/index";
import error from "../../utils/error";

export interface ILoginTypeState {
  data: string;
  loading: boolean;
  error?: string | null;
}
const getType = () => {
  let type = "";
  const user_data = localStorage.getItem("user_info");
  if (user_data) {
    type = JSON.parse(user_data).roles.includes("admin")
      ? "admin"
      : JSON.parse(user_data).roles.includes("tenantadmin")
      ? "tenant"
      : "user";
  }
  return type;
};
const initialState: ILoginTypeState = {
  data: getType(),
  loading: false,
  error: undefined,
};

export const checkLoginType = createAsyncThunk(
  "login/type",
  async (type: string = "") => {
    try {
      const user_data = localStorage.getItem("user_info");
      if (user_data) {
        type = getType();
      }
      console.log(type);
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
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
