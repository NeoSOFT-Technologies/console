import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchDataWithQueryFieldService } from "../../../../../services/saas/api/api";
import {
  ISearchDataWithQueryField,
  ISearchRecords,
} from "../../../../../types/saas";
import error from "../../../../../utils/error";

interface ISearchDataQueryFieldState {
  data?: ISearchRecords[];
  loading: boolean;
  error?: string | null;
}
const initialState: ISearchDataQueryFieldState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const searchDataWithQueryField = createAsyncThunk(
  "searchDataWithQueryField",
  async (data: ISearchDataWithQueryField) => {
    // async (data: ITableCreateData) => {
    try {
      const response = await searchDataWithQueryFieldService(data);
      // console.log(
      //   `[createAsyncThunk] Response Data : ` +
      //     JSON.stringify(response.data.results.data)
      // );
      return response.data.results.data;
    } catch (error_: any) {
      // console.log(error_, "||", error(error_));
      const errorMessage = error(error_);
      // console.log(`Error : ` + JSON.stringify(error_));
      throw new Error(errorMessage);
    }
  }
);

const slice = createSlice({
  name: "searchDataWithQueryFieldSlice",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(searchDataWithQueryField.pending, (state) => {
      state.data = undefined;
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(searchDataWithQueryField.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(searchDataWithQueryField.rejected, (state, action: any) => {
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
