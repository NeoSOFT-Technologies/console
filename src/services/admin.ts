import { ITenantData } from "../types";
import apiFactory from "../utils/api";

export function addTenantDataService(data: ITenantData) {
  return apiFactory().post(`/api/tenants`, data);
}

export function deleteTenantDataService(tenantName: string) {
  return apiFactory().delete(`/api/tenants/${tenantName}`);
}

export function tenantListService(
  currentPage: number,
  search: string // add search in backend
) {
  return apiFactory().get(`/api/tenants?page=${currentPage}`);
}

export function adminLogin() {
  return apiFactory().get(`/api/admin`);
}

// {
//   data: [
//     {
//       name: "Tushar Saxena",
//       description: "i am the king of the seven worlds :)",
//       userid: "tushar123",
//       email: "tushar057@gmail.com",
//       password: "tushar057",
//       databaseName: "Tushar Saxena",
//       databaseDescription: "database size of 100",
//       lastlogin: "Mar 01 2022 11:51:39",
//       type: "tenant",
//       id: 7,
//     },
//   ],
// };

// {
//   "tenantName": "string",
//   "email": "string",
//   "password": "string",
//   "description": "string"
// }
