import axios from "axios";
import apiFactory from "../utils/api";

interface ILogout {
  tenantName: string;
  refreshToken: string;
}

export function commonLoginService(email: string, password: string) {
  const data = { email, password };
  const res = axios.post(`http://localhost:5000/api/login`, data);
  console.log(res);
  return res;
}

export function commonLogoutService(data: ILogout) {
  return apiFactory().post(`/api/logout`, data);
}
