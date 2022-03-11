import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import error from "../../utils/error";
import { IUserDataState } from "../../types/index";
import { commonLoginService } from "../../services";

interface IConditions {
  email: string;
  password: string;
}

const initialState: IUserDataState = {
  data: null,
  loading: false,
  error: null,
};

export const commonLogin = createAsyncThunk(
  "user/data",
  async (conditions: IConditions) => {
    try {
      const { email, password } = conditions;
      const response = await commonLoginService(email, password);
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
    builder.addCase(commonLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(commonLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(commonLogin.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
