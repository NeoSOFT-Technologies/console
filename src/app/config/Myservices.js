import { URL } from "./URL";
import axios from "axios";

export function registerationGet(email, password) {
  return axios.get(
    `${URL}/api/registeration?email=${email}&password=${password}`
  );
}

export function registerationDelete(id) {
  return axios.delete(`${URL}/api/registeration/${id}`);
}

export function registerationPut(id, data) {
  return axios.put(`${URL}/api/registeration/${id}`, data);
}

export function registerationPost(data) {
  return axios.post(`${URL}/api/registeration`, data);
}

export function tenantListService(currentPage, search) {
  return axios.get(
    `${URL}/api/registeration?type=tenant&_page=${currentPage}&name_like=${search}`
  );
}
