import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import error from "../../../../utils/error";
import { ITenantUserListState } from "../../../../types/index";
import { createNewUserService } from "../../../../services";

interface IConditions {
  name: string;
  email: string;
  password: string;
}

const initialState: ITenantUserListState = {
  data: null,
  loading: false,
  error: null,
};

export const addNewUser = createAsyncThunk(
  "tenantUser/list",
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
  name: "tenantUser",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(addNewUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addNewUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(addNewUser.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
