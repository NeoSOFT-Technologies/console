import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteUserDataService } from "../../../../services";
import { ITenantUserListState } from "../../../../types/index";
import error from "../../../../utils/error";

interface IConditions {
  userName: string;
}

const initialState: ITenantUserListState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const deleteUser = createAsyncThunk(
  "tenantUser/list",
  async (conditions: IConditions) => {
    try {
      const { userName } = conditions;
      const response = await deleteUserDataService(userName);
      console.log(response);
      return response.data.data;
    } catch (error_) {
      return error_;
    }
  }
);

const slice = createSlice({
  name: "tenantUser",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
