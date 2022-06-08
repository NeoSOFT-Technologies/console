import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTableSchemaService } from "../../../../../services/saas/api/api";
import { ITableColumnData, ITableSchema } from "../../../../../types/saas";
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
      let errorMsg = "Undefined Error";
      errorMsg =
        error_.response.data !== undefined
          ? error_.response.data.message
          : error_.message;
      throw new Error(errorMsg);
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
    addOrEditColumn: (state, action) => {
      if (
        action.payload.selectedColHeading === "Add Column" &&
        action.payload.objIndex < 0
      ) {
        state.data?.push(action.payload.selectedColumnData);
      } else if (
        action.payload.selectedColHeading === "Edit Column" &&
        action.payload.objIndex > -1
      ) {
        state.data?.splice(
          action.payload.objIndex,
          1,
          action.payload.selectedColumnData
        );
      }
    },
    deleteColumn: (state, action) => {
      state.data = state.data?.filter((obj) => {
        return obj.name !== action.payload.selectedColumnData.name;
      });
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
      state.error = action.error.message;
    });
  },
});
export const { setTableColNames, addOrEditColumn, deleteColumn } =
  slice.actions;
export default slice.reducer;
