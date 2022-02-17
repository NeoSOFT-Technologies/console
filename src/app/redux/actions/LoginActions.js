import axios from "axios";

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
  let res = await axios.get(
    `http://localhost:3001/Registration?email=${email}&password=${password}`
  );
  return { type: "setUser", payload: res.data[0] };
};
