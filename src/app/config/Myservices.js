import { URL } from "./URL";
import axios from "axios";

export function getUserData(email, password) {
  const data = { email, password };
  return axios.post(`${URL}/api/login`, data);
}

export function deleteTenantData(id) {
  return axios.delete(`${URL}/api/user/${id}`);
}

export function updateTenantData(id, data) {
  return axios.put(`${URL}/api/user/${id}`, data);
}

export function addTenantData(data) {
  return axios.post(`${URL}/api/user`, data);
}

export function tenantListService(currentPage, search) {
  return axios.get(
    `${URL}/api/user?type=tenant&_page=${currentPage}&name_like=${search}`
  );
}
