import { URL } from "./URL";
import axios from "axios";

export function registerationGet(query) {
  return axios.get(`${URL}/Registration?${query}`);
}

export function registerationDelete(params) {
  return axios.delete(`${URL}/Registration/${params}`);
}

export function registerationPut(params, data) {
  return axios.put(`${URL}/Registration/${params}`, data);
}

export function registerationPost(params, data) {
  return axios.post(`${URL}/Registration/${params}`, data);
}
