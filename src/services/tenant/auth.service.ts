import { ILogin } from "../../types";
import apiFactory from "../../utils/api";
import tokenService from "./token.service";

class AuthService {
  public async login(data: ILogin) {
    const getlogin = await apiFactory().post(`api/login`, {
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

  public logout() {
    const data = {
      refreshToken: tokenService.getLocalRefreshToken(),
    };
    tokenService.removeUser();
    return apiFactory(process.env.REACT_APP_API_BASEURL).post(
      `api/logout`,
      data
    );
  }

  public getCurrentUser() {
    return tokenService.getUser();
  }
}

export default new AuthService();
