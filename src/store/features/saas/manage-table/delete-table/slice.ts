import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteTableService } from "../../../../../services/saas/api/api";
import { ITableSchema } from "../../../../../types/saas";
import error from "../../../../../utils/error";

interface IDeleteTableState {
  data?: string;
  loading: boolean;
  error?: string | null;
}
const initialState: IDeleteTableState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const deleteTable = createAsyncThunk(
  "deleteTableByTableName",
  async (data: ITableSchema) => {
    try {
      const response = await deleteTableService(data.tableName, data.tenantId);
      console.log(
        `[createAsyncThunk] Response Data : ` + JSON.stringify(response.data)
      );
      return response.data;
    } catch (error_: any) {
      // console.log(error_, "||", error(error_));
      const errorMessage = error(error_);
      console.log(`Error : ` + JSON.stringify(error_));
      throw new Error(errorMessage);
    }
  }
);

const slice = createSlice({
  name: "deleteTableSlice",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(deleteTable.pending, (state) => {
      state.data = undefined;
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(deleteTable.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteTable.rejected, (state, action: any) => {
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
