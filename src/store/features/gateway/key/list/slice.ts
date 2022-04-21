import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import error from "../../../../utils/error";
import { IKeyListState } from "../../../../store/features/key/list";
import { keyListService } from "../../../../services/key/key";
import axios, { AxiosError } from "axios";

interface IConditions {
  currentPage: number;
}

const initialState: IKeyListState = {
  data: null,
  loading: false,
  error: null,
};

export const getKeyList = createAsyncThunk(
  "key/list",
  async (conditions: IConditions) => {
    const { currentPage } = conditions;
    try {
      const response = await keyListService(currentPage);
      return response.data;
    } catch (err) {
      const myError = err as Error | AxiosError;
      if (axios.isAxiosError(myError) && myError.response)
        throw myError.response.data.Errors[0];
      else throw myError.message;
    }
  }
);

const slice = createSlice({
  name: "key",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(getKeyList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getKeyList.fulfilled, (state, action) => {
      state.loading = false;
      state.data = {
        Keys: action.payload.Data.Keys,
        TotalCount: Math.ceil(action.payload.TotalCount / 3),
      };
    });
    builder.addCase(getKeyList.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information
      action.payload = action.error;
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
