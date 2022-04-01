import tokenService from "../services/token.service";
import apiFactory from "../utils/api";

interface IConditions {
  userName: string;
  password: string;
  tenantName: string;
}

export async function commonLoginService(data: IConditions) {
  const getlogin = await apiFactory().post(`/api/login`, {
    username: data.userName,
    password: data.password,
    tenantName: data.tenantName,
  });

  const setlogin = {
    accessToken: getlogin.data.access_token,
    refreshToken: getlogin.data.refresh_token,
    expiresIn: getlogin.data.expires_in,
    refreshExpiresIn: getlogin.data.refresh_expires_in,
    tokenType: getlogin.data.token_type,
    scope: getlogin.data.scope,
    sessionState: getlogin.data.session_state,
  };

  tokenService.setUser(setlogin);
}

export function commonLogoutService() {
  const data = {
    refreshToken: tokenService.getLocalRefreshToken(),
  };
  tokenService.removeUser();
  return apiFactory().post(`/api/logout`, data);
}
