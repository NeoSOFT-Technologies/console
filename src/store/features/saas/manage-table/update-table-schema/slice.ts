import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateTableSchemaService } from "../../../../../services/saas/api/api";
import { IUpdateTable } from "../../../../../types/saas";

interface IUpdateTableSchemaState {
  data?: string;
  loading: boolean;
  error?: string | null;
}
const initialState: IUpdateTableSchemaState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const updateTableSchema = createAsyncThunk(
  "updateSchemaTable",
  async (data: IUpdateTable) => {
    // async (data: ITableCreateData) => {
    try {
      const response = await updateTableSchemaService(
        data.requestParams.tableName,
        data.requestParams.tenantId,
        data.requestData
      );
      // console.log(
      //   `[createAsyncThunk] Response Data : ` + JSON.stringify(response.data)
      // );
      return response.data;
    } catch (error_: any) {
      let errorMsg = "Undefined Error";
      errorMsg =
        error_.response.data !== undefined
          ? error_.response.data.message
          : error_.message;
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
      state.error = action.error.message;
    });
  },
});

export default slice.reducer;
