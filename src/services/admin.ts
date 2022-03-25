import { ITenantData } from "../types";
import apiFactory from "../utils/api";

export function addTenantDataService(data: ITenantData) {
  const body = {
    tenantName: data.tenantName,
    email: data.email,
    password: data.password,
    description: data.description,
  };
  console.log(
    "🚀 ~ file: admin.ts ~ line 11 ~ addTenantDataService ~ body",
    body
  );
  return apiFactory().post(`/api/tenants`, body);
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
