import { combineReducers } from "redux";
import setAdminLogin from "./AdminLoginState";
import setTenantLogin from "./TenantLoginState";
import setUserData from "./userDataState";
import setTenantList from "./TenantListState";
const rootReducer = combineReducers({
  setAdminLogin,
  setTenantLogin,
  setUserData,
  setTenantList,
});
export default rootReducer;
