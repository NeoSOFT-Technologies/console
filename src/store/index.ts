import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import addNewTenantReducer from "./features/admin/add-tenant/slice";
import deleteTenantReducer from "./features/admin/delete-tenant/slice";
import rolesListReducer from "./features/admin/tenant-roles/slice";

// gateway Reducers
import addApiReducer from "./features/gateway/api/create/slice";
import deleteApiReducer from "./features/gateway/api/delete/slice";
import apiListReducer from "./features/gateway/api/list/slice";
import updateApiReducer from "./features/gateway/api/update/slice";
import addCertificateReducer from "./features/gateway/certificate/create/slice";
import getAllCertificateReducer from "./features/gateway/certificate/list/slice";
import createKeyReducer from "./features/gateway/key/create/slice";
import keyListReducer from "./features/gateway/key/list/slice";
import createPolicyReducer from "./features/gateway/policy/create/slice";
import deletePolicyReducer from "./features/gateway/policy/delete/slice";
import policyListReducer from "./features/gateway/policy/list/slice";

import addNewUserReducer from "./features/tenant/add-user/slice";
import deleteUserReducer from "./features/tenant/delete-user/slice";
import tenantDetailsReducer from "./features/tenant/tenant-details/slice";
import updateTenantReducer from "./features/tenant/update-tenant/slice";
import updateUserReducer from "./features/user/update-user/slice";
import userDetailsReducer from "./features/user/user-details/slice";
import forgotPasswordReducer from "./forgot-password/slice";
import landingReducer from "./landing/slice";
import loginTypeReducer from "./login-type/slice";
import loginAccessTokenReducer from "./login/slice";
import logoutReducer from "./logout/slice";
import userDataReducer from "./user-data/slice";

const store = configureStore({
  reducer: {
    landing: landingReducer,
    userData: userDataReducer,
    addNewTenantState: addNewTenantReducer,
    deleteTenant: deleteTenantReducer,
    deleteUserState: deleteUserReducer,
    updateTenantState: updateTenantReducer,
    addNewUserState: addNewUserReducer,
    rolesList: rolesListReducer,
    loginType: loginTypeReducer,
    loginAccessToken: loginAccessTokenReducer,
    forgotPasswordState: forgotPasswordReducer,
    userDetails: userDetailsReducer,
    tenantDetails: tenantDetailsReducer,
    logoutState: logoutReducer,
    updateUserDataState: updateUserReducer,
    // gateway states
    apiListState: apiListReducer,
    policyListState: policyListReducer,
    createPolicyState: createPolicyReducer,
    deletePolicyState: deletePolicyReducer,
    keyListState: keyListReducer,
    addApiState: addApiReducer,
    deleteApiState: deleteApiReducer,
    updateApiState: updateApiReducer,
    createKeyState: createKeyReducer,
    addCertificateState: addCertificateReducer,
    getAllCertificateState: getAllCertificateReducer,
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
