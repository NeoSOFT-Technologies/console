import apiFactory from "../utils/api";
// import axios from "axios";
interface ILogout {
  tenantName: string;
  refreshToken: string;
}

export async function commonLoginService(
  username: string,
  password: string,
  tenantName: string
) {
  const data = { username, password, tenantName };
  console.log("data", data);
  return apiFactory().post(`/api/login`, data);
  // return {
  //   data: [
  //     {
  //       description: "i am going to win the world",
  //       email: "rahul768@gmail.com",
  //       id: "5",
  //       lastlogin: "Mar 01 2022 11:51:39",
  //       name: "Rahul kenchi",
  //       password: "rahul768",
  //       type: "admin",
  //       userid: "rahul123",
  //     },
  //   ],
  // };
}

export function commonLogoutService(data: ILogout) {
  return apiFactory().post(`/api/logout`, data);
}

// if (tenantName.length != 0) {
//   return {
//     data: [
//       {
//         id: 1,
//         userName: "User1",
//         email: "user1@gmail.com",
//         tenantName: "Tenant1",
//         createdDateTime: "Mar 01 2022 11:51:39",
//         isDeleted: false,
//         isActive: true,
//       },
//     ],
//   };
// }
// return {
//   data: [
//     {
//       description: "i am going to win the world",
//       email: "rahul768@gmail.com",
//       id: "5",
//       lastlogin: "Mar 01 2022 11:51:39",
//       name: "Rahul kenchi",
//       password: "rahul768",
//       type: "admin",
//       userid: "rahul123",
//     },
//   ],
// };
