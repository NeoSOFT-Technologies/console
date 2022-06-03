import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTablesService } from "../../../../../services/saas/api/api";
import error from "../../../../../utils/error";

interface IGetTableState {
  [x: string]: any;
  data?: string[];
  loading: boolean;
  error?: string | null;
}
const initialState: IGetTableState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const getTables = createAsyncThunk(
  "getTable/getTables",
  async (id: string) => {
    try {
      const response = await getTablesService("asc");
      console.log(
        `[createAsyncThunk][getTable-slice] Response Data : ` +
          JSON.stringify(response.data)
      );
      return response.data.data;
    } catch (error_: any) {
      console.log(`error_.response.data : ` + JSON.stringify(error_.response));
      const errorMessage = error(error_.response.data);
      console.log(`errorMessage : ` + JSON.stringify(errorMessage));
      throw new Error(errorMessage);
    }
  }
);

const slice = createSlice({
  name: "getTableSlice",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(getTables.pending, (state) => {
      state.data = undefined;
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(getTables.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getTables.rejected, (state, action: any) => {
      state.loading = false;
      // const errorMessage = action.error.message.split(" ");
      // state.error = errorMessage[errorMessage.length - 1];
      state.error = action.error.message;
    });
  },
});

export default slice.reducer;
