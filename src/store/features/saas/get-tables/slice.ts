import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTablesService } from "../../../../services/saas/api/api";
import error from "../../../../utils/error";

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
      const response = await getTablesService(id);
      console.log(
        `[createAsyncThunk] Response Data : ` + JSON.stringify(response.data)
      );
      return response.data.data;
    } catch (error_: any) {
      // console.log(error_, "||", error(error_));
      const errorMessage = error(error_);
      console.log(`Error : ` + JSON.stringify(error_));
      throw new Error(errorMessage);
    }
  }
);

const slice = createSlice({
  name: "getTable",
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
      const errorMessage = action.error.message.split(" ");
      state.error = errorMessage[errorMessage.length - 1];
      if (state.error === "403" || state.error === "401") {
        alert("Invalid Token");
      }
    });
  },
});

export default slice.reducer;
