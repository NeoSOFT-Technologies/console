import {
  setFormError,
  setForm,
} from "../../../store/features/gateway/api/update/slice";
import { setNestedState } from "../common";

export const regexForName = /^[ A-Za-z][\d A-Za-z]{3,29}$/;
export const regexForListenPath = /^\/[\dA-Za-z]*\/$/;
export const regexForTagetUrl =
  /^(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([\w!#$%&+,./:=?@\\|]*\)|[\d!#$%&+,./:=?@A-Z\\_|-])*(?:\([\d!#$%&+,./:=?@A-Z\\_|-]*\)|[\d#$%&+/=@A-Z\\_|])*/;

export const regexForNumber = /^\d*$/;

export const regexForOverrideTarget =
  /^(?:https?|ftp|file):\/\/(?:\([\w!#$%&+,./:=?@\\|]*\)|[\d!#$%&+,./:=?@A-Z\\_|-])*(?:\([\d!#$%&+,./:=?@A-Z\\_|-]*\)|[\d#$%&+/=@A-Z\\_|])*/;

export function setFormData(e: any, dispatch: any, state: any) {
  const newState = setNestedState(e, state);
  dispatch(setForm(newState));
}

export function setFormErrors(e: any, dispatch: any) {
  dispatch(setFormError(e));
}
