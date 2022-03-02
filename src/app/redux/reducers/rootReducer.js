import { combineReducers } from "redux";
import setAdminLogin from "./AdminLoginState";
import setTenantLogin from "./TenantLoginState";
import setUserData from "./userDataState";
import setTenantList from "./TenantListState";
import setTenantUserList from './TenantUserListState'
const rootReducer = combineReducers({
  setAdminLogin,
  setTenantLogin,
  setUserData,
  setTenantList,
  setTenantUserList
});
export default rootReducer;
