import { registerationGet } from "../../config/Myservices";

export const AdminLoginSuccess = () => {
  return { type: "AdminLoginSuccess" };
};
export const AdminLoginFailure = () => {
  return { type: "AdminLoginFailure" };
};
export const TenantLoginFailure = () => {
  return { type: "TenantLoginFailure" };
};
export const TenantLoginSuccess = () => {
  return { type: "TenantLoginSuccess" };
};
export const UserLogin = async (email, password) => {
  let res = await registerationGet(email, password);
  if (res.data.err === 0) {
    return { type: "setUser", payload: res.data.data[0] };
  } else if (res.data.err > 0) {
    return { type: "setUser", payload: res.data };
  }
};
