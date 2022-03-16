class TokenService {
  public getLocalRefreshToken() {
    let user: any = localStorage.getItem("user") || undefined;
    if (user) {
      user = JSON.parse(user);
    }
    return user?.refreshToken;
  }

  public getLocalAccessToken() {
    let user: any = localStorage.getItem("user") || undefined;
    if (user) {
      user = JSON.parse(user);
    }
    return user?.accessToken;
  }

  public updateLocalAccessToken(token: string): void {
    let user: any = localStorage.getItem("user") || undefined;
    if (user) {
      user = JSON.parse(user);
    }
    user.accessToken = token;
    localStorage.setItem("user", JSON.stringify(user));
  }

  public getUser() {
    let user: any = localStorage.getItem("user") || undefined;
    if (user) {
      user = JSON.parse(user);
    }
    return user;
  }

  public setUser(user: any) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  public removeUser() {
    localStorage.removeItem("user");
  }
}

export default new TokenService();
