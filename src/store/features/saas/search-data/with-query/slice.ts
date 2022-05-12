import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchDataWithQueryService } from "../../../../../services/saas/api/api";
import { ISearchDataWithQuery } from "../../../../../types/saas";
import error from "../../../../../utils/error";

interface ISearchDataQueryState {
  data?: string;
  loading: boolean;
  error?: string | null;
}
const initialState: ISearchDataQueryState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const searchDataWithQuery = createAsyncThunk(
  "searchDataWithQuery",
  async (data: ISearchDataWithQuery) => {
    // async (data: ITableCreateData) => {
    try {
      const response = await searchDataWithQueryService(data);
      console.log(
        `[createAsyncThunk] Response Data : ` + JSON.stringify(response.data)
      );
      return response.data;
    } catch (error_: any) {
      // console.log(error_, "||", error(error_));
      const errorMessage = error(error_);
      // console.log(`Error : ` + JSON.stringify(error_));
      throw new Error(errorMessage);
    }
  }
);

const slice = createSlice({
  name: "searchDataWithQuerySlice",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(searchDataWithQuery.pending, (state) => {
      state.data = undefined;
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(searchDataWithQuery.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(searchDataWithQuery.rejected, (state, action: any) => {
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
