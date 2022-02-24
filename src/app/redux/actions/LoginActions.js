import { getUserData } from "../../config/Myservices";

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
  let res = await getUserData(email, password);
  return { type: "setUser", payload: res.data[0] };
};
