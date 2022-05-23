import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllDeletedTableService } from "../../../../../services/saas/api/api";
import { IPagination, ITableSchema } from "../../../../../types/saas";
import error from "../../../../../utils/error";

interface IGetAllDeletedTableState {
  data?: ITableSchema[];
  loading: boolean;
  error?: string | null;
}
const initialState: IGetAllDeletedTableState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const getAllDeletedTables = createAsyncThunk(
  "getAllDeleteTable",
  async (data: IPagination) => {
    try {
      const response = await getAllDeletedTableService(data);
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
  name: "getAllDeleteTableSlice",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(getAllDeletedTables.pending, (state) => {
      state.data = undefined;
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(getAllDeletedTables.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllDeletedTables.rejected, (state, action: any) => {
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
