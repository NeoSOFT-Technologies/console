import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTableSchemaService } from "../../../../../services/saas/api/api";
import { ITableSchema } from "../../../../../types/saas";
import error from "../../../../../utils/error";

interface IGetTableSchemaState {
  data?: string;
  loading: boolean;
  error?: string | null;
}
const initialState: IGetTableSchemaState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const getTableSchema = createAsyncThunk(
  "getTableSchemaByTableName",
  async (data: ITableSchema) => {
    try {
      const response = await getTableSchemaService(
        data.tableName,
        data.tenantId
      );
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
  name: "getTableSchemaSlice",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(getTableSchema.pending, (state) => {
      state.data = undefined;
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(getTableSchema.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getTableSchema.rejected, (state, action: any) => {
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
