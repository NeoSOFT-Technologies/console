import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateTableSchemaService } from "../../../../../services/saas/api/api";
import { ICustomeError, IUpdateTable } from "../../../../../types/saas";
import errorHandler from "../../../../../utils/error-handler";

interface IUpdateTableSchemaState {
  data?: string;
  loading: boolean;
  error?: ICustomeError;
}
const initialState: IUpdateTableSchemaState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const updateTableSchema = createAsyncThunk(
  "updateSchemaTable",
  async (data: IUpdateTable) => {
    try {
      const response = await updateTableSchemaService(
        data.requestParams.tableName,
        data.requestParams.tenantId,
        data.requestData
      );
      return response.data;
    } catch (_error: any) {
      const errorMsg = errorHandler(_error);
      throw new Error(errorMsg);
    }
  }
);

const slice = createSlice({
  name: "updateSchemaTableSlice",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(updateTableSchema.pending, (state) => {
      state.data = undefined;
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(updateTableSchema.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(updateTableSchema.rejected, (state, action: any) => {
      state.loading = false;
      const errorMessage = JSON.parse(action.error.message);
      state.error = errorMessage;
    });
  },
});

export default slice.reducer;
