// import { IApiData } from "../../types/api/index";
import { IApiFormData } from "../../store/features/api/create";
import { IGetApiByIdData } from "../../store/features/api/update";
import apiFactory from "../../utils/api";

export function apiListService(currentPage: number, pageSize: number) {
  return apiFactory().get(
    `ApplicationGateway?pageNum=${currentPage}&pageSize=${pageSize}`
  );
}
export function addApiService(data: IApiFormData) {
  return apiFactory().post(`ApplicationGateway/CreateApi`, data);
}

export function getApiByIdService(Id: string) {
  return apiFactory().get(`ApplicationGateway/` + Id);
}

export function updateApiService(data: IGetApiByIdData) {
  return apiFactory().put(`ApplicationGateway`, data);
}

export function deleteApiService(Id: string) {
  return apiFactory().delete(`ApplicationGateway/` + Id);
}
