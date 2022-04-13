import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createNewPolicyService } from "../../../../services";
import {
  ICreatePolicyFormData,
  ICreatePolicyState,
} from "../../../../types/create-policy.types";
import error from "../../../../utils/error";

const initialState: ICreatePolicyState = {
  isCreated: false,
  loading: false,
  error: undefined,
};

export const createNewPolicy = createAsyncThunk(
  "realmPolicy/create",
  async (conditions: ICreatePolicyFormData) => {
    try {
      const response = await createNewPolicyService(conditions);
      return response.data;
    } catch (error_) {
      throw new Error(error(error_));
    }
  }
);

const slice = createSlice({
  name: "realmPolicy",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(createNewPolicy.pending, (state) => {
      state.loading = true;
      state.isCreated = false;
      state.error = undefined;
    });
    builder.addCase(createNewPolicy.fulfilled, (state) => {
      state.loading = false;
      state.isCreated = true;
    });
    builder.addCase(createNewPolicy.rejected, (state, action: any) => {
      state.loading = false;
      // action.payload contains error information
      const errorMessage = action.error.message.split(" ");
      state.error = errorMessage[errorMessage.length - 1];
    });
  },
});

export default slice.reducer;
