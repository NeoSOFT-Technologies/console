import { IGetKeyByIdData } from "../../../store/features/gateway/key/create";
import apiFactory from "../../../utils/api";

export function keyListService(currentPage: number, pageSize: number) {
  return apiFactory().get(
    `${process.env.REACT_APP_GATEWAY_API}Key/GetAllKeys?pageNum=${currentPage}&pageSize=${pageSize}`
  );
}
export function addKeyService(data: IGetKeyByIdData) {
  return apiFactory().post(
    `${process.env.REACT_APP_GATEWAY_API}Key/CreateKey`,
    data
  );
}

export function getKeyByIdService(Id: string) {
  return apiFactory().get(
    `${process.env.REACT_APP_GATEWAY_API}Key/GetKey?keyId=` + Id
  );
}

export function updateKeyService(data: IGetKeyByIdData) {
  return apiFactory().put(
    `${process.env.REACT_APP_GATEWAY_API}Key/UpdateKey`,
    data
  );
}

export function deleteKeyService(Id: string) {
  return apiFactory().delete(
    `${process.env.REACT_APP_GATEWAY_API}Key/DeleteKey?keyId=` + Id
  );
}
