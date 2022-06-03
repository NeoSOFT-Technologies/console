import { ILogin } from "../../types";
import apiFactory from "../../utils/api";
import authService from "./auth.service";

export async function commonLoginService(data: ILogin) {
  return authService.login(data);
}

export function commonLogoutService() {
  return authService.logout();
}

export function forgotPasswordService(tenantName: string) {
  return apiFactory().get(`api/forgotPassword?tenant=${tenantName}`);
}
