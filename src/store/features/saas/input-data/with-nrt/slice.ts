import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { inputDataNrtService } from "../../../../../services/saas/api/api";
import { IInputData } from "../../../../../types/saas";
import errorHandler from "../../../../../utils/error-handler";

interface IInputDataNrtState {
  data?: string[];
  loading: boolean;
  error?: ICustomeError;
}
const initialState: IInputDataNrtState = {
  data: undefined,
  loading: false,
  error: undefined,
};
interface ICustomeError {
  statusCode: string;
  message: string;
}
export const inputTableDataWithNrt = createAsyncThunk(
  "inputDataWithNrt",
  async (data: IInputData) => {
    try {
      const response = await inputDataNrtService(
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
      const errorMessage = JSON.parse(action.error.message);
      state.error = errorMessage;
    });
  },
});
export const { resetInputDataWithNrtState } = slice.actions;
export default slice.reducer;
