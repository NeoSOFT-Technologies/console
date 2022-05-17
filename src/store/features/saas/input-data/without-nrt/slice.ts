import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { inputDataService } from "../../../../../services/saas/api/api";
import { IInputData } from "../../../../../types/saas";
import error from "../../../../../utils/error";

interface IInputDataState {
  data?: string[];
  loading: boolean;
  error?: string | null;
}
const initialState: IInputDataState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const inputTableDataWithoutNrt = createAsyncThunk(
  "inputDataWithoutNrt",
  async (data: IInputData) => {
    // async (data: ITableCreateData) => {
    try {
      const response = await inputDataService(
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
  name: "inputTableDataWithoutNrt",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(inputTableDataWithoutNrt.pending, (state) => {
      state.data = undefined;
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(inputTableDataWithoutNrt.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(inputTableDataWithoutNrt.rejected, (state, action: any) => {
      state.loading = false;
      const errorMessage = action.error.message.split(" ");
      state.error = errorMessage[errorMessage.length - 1];
      if (state.error === "403" || state.error === "401") {
        alert("Invalid Token");
      }
    });
  },
});

export default slice.reducer;
