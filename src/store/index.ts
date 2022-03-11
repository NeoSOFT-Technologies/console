import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import landingReducer from "./landing/slice";
import tenantListReducer from "./features/admin/tenant-list/slice";
import userDatatReducer from "./user-data/slice";
import tenantUserListReducer from "./features/tenant/tenant-user-list/slice";

const store = configureStore({
  reducer: {
    landing: landingReducer,
    tenantList: tenantListReducer,
    userData: userDatatReducer,
    tenantUserList: tenantUserListReducer,
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
