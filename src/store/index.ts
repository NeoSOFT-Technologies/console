import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import landingReducer from "./landing/slice";
import tenantListReducer from "./fetaures/admin/tenant-list/slice";
import userDatatReducer from "./user-data/slice";
import tenantUserListReducer from "./fetaures/tenant/tenant-user-list/slice";
import addNewTenantReducer from "./fetaures/admin/add-tenant/slice";
import deleteTenantReducer from "./fetaures/admin/delete-tenant/slice";
import updateTenantReducer from "./fetaures/tenant/update-tenant/slice";

const store = configureStore({
  reducer: {
    landing: landingReducer,
    tenantList: tenantListReducer,
    userData: userDatatReducer,
    tenantUserList: tenantUserListReducer,
    addNewTenant: addNewTenantReducer,
    deleteTenant: deleteTenantReducer,
    updateTenant: updateTenantReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;
