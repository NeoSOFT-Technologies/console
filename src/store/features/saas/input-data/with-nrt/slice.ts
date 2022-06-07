import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { inputDataNrtService } from "../../../../../services/saas/api/api";
import { IInputData } from "../../../../../types/saas";
import error from "../../../../../utils/error";

interface IInputDataNrtState {
  data?: string[];
  loading: boolean;
  error?: string | null;
}
const initialState: IInputDataNrtState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const inputTableDataWithNrt = createAsyncThunk(
  "inputDataWithNrt",
  async (data: IInputData) => {
    // async (data: ITableCreateData) => {
    try {
      const response = await inputDataNrtService(
        data.requestParams.tableName,
        data.requestParams.tenantId,
        data.inputData
      );
      console.log(
        `[createAsyncThunk] Response Data : ` + JSON.stringify(response.data)
      );
      return response.data;
    } catch (error_: any) {
      // console.log(error_, "||", error(error_));
      const errorMessage = error(error_);
      // console.log(`Error : ` + JSON.stringify(error_));
      throw new Error(errorMessage);
    }
  }
);

const slice = createSlice({
  name: "inputTableDataWithNrt",
  initialState,
  reducers: {
    resetInputDataWithNrtState: (state) => {
      state.data = undefined;
      state.loading = false;
      state.error = undefined;
    },
  },
  extraReducers(builder): void {
    builder.addCase(inputTableDataWithNrt.pending, (state) => {
      state.data = undefined;
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(inputTableDataWithNrt.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(inputTableDataWithNrt.rejected, (state, action: any) => {
      state.loading = false;
      const errorMessage = action.error.message.split(" ");
      state.error = errorMessage[errorMessage.length - 1];
      if (state.error === "403" || state.error === "401") {
        alert("Invalid Token");
      }
    });
  },
});
export const { resetInputDataWithNrtState } = slice.actions;
export default slice.reducer;
