import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import addNewTenantReducer from "./features/admin/add-tenant/slice";
import deleteTenantReducer from "./features/admin/delete-tenant/slice";
import tenantListReducer from "./features/admin/tenant-list/slice";
import tenantPermissionsListReducer from "./features/admin/tenant-permissions/slice";
import rolesListReducer from "./features/admin/tenant-roles/slice";
import addNewUserReducer from "./features/tenant/add-user/slice";
import tenantUserListReducer from "./features/tenant/tenant-user-list/slice";
import updateTenantReducer from "./features/tenant/update-tenant/slice";
import landingReducer from "./landing/slice";
import loginTypeReducer from "./login-type/slice";
import userDatatReducer from "./user-data/slice";

const store = configureStore({
  reducer: {
    landing: landingReducer,
    tenantList: tenantListReducer,
    userData: userDatatReducer,
    tenantUserList: tenantUserListReducer,
    addNewTenant: addNewTenantReducer,
    deleteTenant: deleteTenantReducer,
    updateTenant: updateTenantReducer,
    addNewUser: addNewUserReducer,
    rolesList: rolesListReducer,
    loginType: loginTypeReducer,
    tenantPermissionsList: tenantPermissionsListReducer,
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
