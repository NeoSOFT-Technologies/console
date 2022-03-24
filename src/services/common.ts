import tokenService from "../services/token.service";
import apiFactory from "../utils/api";
// import axios from "axios";

interface IConditions {
  userName: string;
  password: string;
  tenantName: string;
}

export async function commonLoginService(data: IConditions) {
  const getlogin = await apiFactory().post(`/api/login`, {
    username: "admin",
    tenantName: "",
    password: "adminPassword@1",
  });
  console.log("🚀 ~ file: common.ts ~ line 21 ~ getlogin ~ getlogin", getlogin);

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
  return {
    data: [
      {
        tenantName: "Rahul kenchi",
        description: "i am going to win the world",
        email: "rahul768@gmail.com",
        password: "rahul768",
        type: "admin",
        id: 5,
        roles: ["user"],
      },
    ],
  };
}

export function commonLogoutService() {
  const data = {
    refreshToken: tokenService.getLocalRefreshToken(),
  };
  return apiFactory().post(`/api/logout`, data);
}

// {
//   "name": "Tushar Saxena",
//   "description": "i am the king of the seven worlds :)",
//   "userid": "tushar123",
//   "email": "tushar057@gmail.com",
//   "password": "tushar057",
//   "databaseName": "Tushar Saxena",
//   "databaseDescription": "database size of 100",
//   "lastlogin": "Mar 01 2022 11:51:39",
//   "type": "tenant",
//   "id": 7
// },

// {
//   name: "Rahul kenchi",
//   description: "i am going to win the world",
//   userid: "rahul123",
//   email: "rahul768@gmail.com",
//   password: "rahul768",
//   lastlogin: "Mar 01 2022 11:51:39",
//   type: "admin",
//   id: 5,
// },
