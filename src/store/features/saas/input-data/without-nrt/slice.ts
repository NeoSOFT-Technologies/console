import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { inputDataService } from "../../../../../services/saas/api/api";
import { IInputData } from "../../../../../types/saas";
import errorHandler from "../../../../../utils/error-handler";

interface IInputDataState {
  data?: string[];
  loading: boolean;
  error?: ICustomeError;
}
const initialState: IInputDataState = {
  data: undefined,
  loading: false,
  error: undefined,
};
interface ICustomeError {
  statusCode: string;
  message: string;
}
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
      return response.data;
    } catch (_error: any) {
      const errorMsg = errorHandler(_error);
      throw new Error(errorMsg);
    }
  }
);

const slice = createSlice({
  name: "inputTableDataWithoutNrt",
  initialState,
  reducers: {
    resetInputDataWithoutNrtState: (state) => {
      state.data = undefined;
      state.loading = false;
      state.error = undefined;
    },
  },
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
      const errorMessage = JSON.parse(action.error.message);
      state.error = errorMessage;
    });
  },
});
export const { resetInputDataWithoutNrtState } = slice.actions;
export default slice.reducer;
