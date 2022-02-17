import { URL } from "./URL";
import axios from "axios";

export function registerationGet(email, password) {
  return axios.get(`${URL}/Registration?email=${email}&password=${password}`);
}

export function registerationDelete(id) {
  return axios.delete(`${URL}/Registration/${id}`);
}

export function registerationPut(id, data) {
  return axios.put(`${URL}/Registration/${id}`, data);
}

export function registerationPost(data) {
  return axios.post(`${URL}/Registration`, data);
}

export function tenantListService() {
  return axios.get(`${URL}/Registration?type=tenant`);
}
