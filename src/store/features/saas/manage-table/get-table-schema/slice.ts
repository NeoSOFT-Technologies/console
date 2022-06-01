import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTableSchemaService } from "../../../../../services/saas/api/api";
import { ITableColumnData, ITableSchema } from "../../../../../types/saas";
import error from "../../../../../utils/error";
interface IGetTableSchemaState {
  data?: ITableColumnData[];
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
      return response.data.data.columns;
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
  reducers: {
    setTableColNames: (state, action) => {
      state.data = [...action.payload];
      state.loading = false;
      state.error = undefined;
    },
    setTableColumns: (state, action) => {
      console.log("inside slice " + JSON.stringify(action.payload));
      // newColumnNames = newColumnNames?.splice(objIndex, 1, obj2);
      // console.log("After Change : " + JSON.stringify(newColumnNames));
    },
  },
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
export const { setTableColNames, setTableColumns } = slice.actions;

export default slice.reducer;
