import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createTableService } from "../../../../../services/saas/api/api";
import { ICreateTable } from "../../../../../types/saas";
import error from "../../../../../utils/error";

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

      console.log(
        `[createAsyncThunk] Response Data : ` + JSON.stringify(response.data)
      );
      alert(JSON.stringify(response.data.message));
      return response.data;
    } catch (error_: any) {
      // console.log(error_, "||", error(error_));
      alert(error_);
      const errorMessage = error(error_);
      // console.log(`Error : ` + JSON.stringify(error_));
      throw new Error(errorMessage);
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
      const errorMessage = action.error.message.split(" ");
      state.error = errorMessage[errorMessage.length - 1];
      if (state.error === "403" || state.error === "401") {
        alert("Invalid Token");
      }
    });
  },
});

export default slice.reducer;
