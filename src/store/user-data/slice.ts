import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import error from "../../utils/error";
import { IUserDataState } from "../../types/index";
import { getUserData } from "../../services/Myservices";

interface IConditions {
  email: string;
  password: string;
}
const initialState: IUserDataState = {
  data: null,
  loading: false,
  error: null,
};

export const userData = createAsyncThunk(
  "user/data",
  async (conditions: IConditions) => {
    const { email, password } = conditions;
    try {
      const response = await getUserData(email, password);
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
    builder.addCase(userData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(userData.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
