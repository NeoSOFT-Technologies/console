import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import error from "../../../../utils/error";
import { createNewUserService } from "../../../../services";

interface IConditions {
  username: string;
  email: string;
  password: string;
  tenantname: string;
}

interface IAddUserState {
  isAdded: boolean;
  loading: boolean;
  error?: string | null;
}

const initialState: IAddUserState = {
  isAdded: false,
  loading: false,
  error: null,
};

export const addNewUser = createAsyncThunk(
  "tenantUser/addUser",
  async (conditions: IConditions) => {
    try {
      const response = await createNewUserService(conditions);
      console.log(response);
      return response.data;
    } catch (err) {
      return err;
    }
  }
);

const slice = createSlice({
  name: "tenantUserAddition",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(addNewUser.pending, (state) => {
      state.loading = true;
      state.isAdded = false;
    });
    builder.addCase(addNewUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAdded = true;
    });
    builder.addCase(addNewUser.rejected, (state, action) => {
      state.loading = false;
      state.isAdded = false;
      // action.payload contains error information
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
