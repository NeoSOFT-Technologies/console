import { combineReducers } from "redux";
import setAdminLogin from "./AdminLoginState";
import setTenantLogin from "./TenantLoginState";
const rootReducer = combineReducers({ setAdminLogin, setTenantLogin });
export default rootReducer;
