import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createTableService } from "../../../../../services/saas/api/api";
import { ICreateTable } from "../../../../../types/saas";

interface ICreateTableState {
  data?: ICustomeMessage;
  loading: boolean;
  error?: string | null | ICustomeError;
}
const initialState: ICreateTableState = {
  data: undefined,
  loading: false,
  error: undefined,
};

interface ICustomeMessage {
  statusCode: string;
  message: string;
}
interface ICustomeError {
  statusCode: string;
  message: string;
}

export const createTable = createAsyncThunk(
  "createTable",
  async (data: ICreateTable) => {
    // async (data: ITableCreateData) => {
    try {
      const response = await createTableService(
        data.tenantId,
        data.requestData
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
  name: "createTableSlice",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(createTable.pending, (state) => {
      state.data = undefined;
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(createTable.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(createTable.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default slice.reducer;
