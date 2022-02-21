import { URL } from "./URL";
import axios from "axios";

export function registerationGet(email, password) {
  return axios.get(`${URL}/Registeration?email=${email}&password=${password}`);
}

export function registerationDelete(id) {
  return axios.delete(`${URL}/Registeration/${id}`);
}

export function registerationPut(id, data) {
  return axios.put(`${URL}/Registeration/${id}`, data);
}

export function registerationPost(data) {
  return axios.post(`${URL}/Registeration`, data);
}

export function tenantListService() {
  return axios.get(`${URL}/Registeration?type=tenant`);
}
