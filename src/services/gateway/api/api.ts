// import { IApiData } from "../../types/api/index";
import { IApiFormData } from "../../../store/features/gateway/api/create";
import { IGetApiByIdData } from "../../../store/features/gateway/api/update";
import apiFactory from "../../../utils/api";

export function apiListService(currentPage: number, pageSize: number) {
  return apiFactory().get(
    `${process.env.REACT_APP_GATEWAY_API}ApplicationGateway?pageNum=${currentPage}&pageSize=${pageSize}`
  );
}
export function addApiService(data: IApiFormData) {
  return apiFactory().post(
    `${process.env.REACT_APP_GATEWAY_API}ApplicationGateway/CreateApi`,
    data
  );
}

export function getApiByIdService(Id: string) {
  return apiFactory().get(
    `${process.env.REACT_APP_GATEWAY_API}ApplicationGateway/` + Id
  );
}

export function updateApiService(data: IGetApiByIdData) {
  return apiFactory().put(
    `${process.env.REACT_APP_GATEWAY_API}ApplicationGateway`,
    data
  );
}

export function deleteApiService(Id: string) {
  return apiFactory().delete(
    `${process.env.REACT_APP_GATEWAY_API}ApplicationGateway/` + Id
  );
}
