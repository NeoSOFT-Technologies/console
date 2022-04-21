import { IGetKeyByIdData } from "../../store/features/key/create";
import apiFactory from "../../utils/api";

export function keyListService(currentPage: number) {
  return apiFactory().get(`Key/GetAllKeys?pageNum=${currentPage}&pageSize=3`);
}
export function addKeyService(data: IGetKeyByIdData) {
  return apiFactory().post(`Key/CreateKey`, data);
}

export function getKeyByIdService(Id: string) {
  return apiFactory().get(`Key/GetKey?keyId=` + Id);
}

export function updateKeyService(data: IGetKeyByIdData) {
  return apiFactory().put(`Key/UpdateKey`, data);
}

export function deleteKeyService(Id: string) {
  return apiFactory().delete(`Key/DeleteKey?keyId=` + Id);
}
