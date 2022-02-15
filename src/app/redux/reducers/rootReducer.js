import { combineReducers } from "redux";
import setAdminLogin from "./AdminLoginState";
import setTenantLogin from "./TenantLoginState";
import setUserData from "./userDataState";
const rootReducer = combineReducers({
  setAdminLogin,
  setTenantLogin,
  setUserData,
});
export default rootReducer;
