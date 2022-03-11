import apiFactory from "../utils/api";

interface ILogout {
  tenantName: string;
  refreshToken: string;
}

export function commonLoginService(email: string, password: string) {
  const data = { email, password };
  return apiFactory().post(`/api/login`, data);
}

export function commonLogoutService(data: ILogout) {
  return apiFactory().post(`/api/logout`, data);
}
