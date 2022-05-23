import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllTablesService } from "../../../../../services/saas/api/api";
import { IPagination, ITableSchema } from "../../../../../types/saas";
import error from "../../../../../utils/error";

interface IGetAllTableState {
  data?: ITableSchema[];
  loading: boolean;
  error?: string | null;
}
const initialState: IGetAllTableState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const getAllTables = createAsyncThunk(
  "getAllTable",
  async (data: IPagination) => {
    try {
      const response = await getAllTablesService(data);
      console.log(
        `[createAsyncThunk] Response Data : ` + JSON.stringify(response.data)
      );
      return response.data.tableList;
    } catch (error_: any) {
      // console.log(error_, "||", error(error_));
      const errorMessage = error(error_);
      console.log(`Error : ` + JSON.stringify(error_));
      throw new Error(errorMessage);
    }
  }
);

const slice = createSlice({
  name: "getAllTableSlice",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(getAllTables.pending, (state) => {
      state.data = undefined;
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(getAllTables.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllTables.rejected, (state, action: any) => {
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
