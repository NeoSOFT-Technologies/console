import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { inputDataService } from "../../../../../services/saas/api/api";
import { IInputData } from "../../../../../types/saas";

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
      return response.data;
    } catch (_error: any) {
      let errorMsg = "Undefined Error";
      errorMsg =
        _error.response.data !== undefined
          ? _error.response.data.message
          : _error.message;
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
      state.error = action.error.message;
    });
  },
});
export const { resetInputDataWithoutNrtState } = slice.actions;
export default slice.reducer;
