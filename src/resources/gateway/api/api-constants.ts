/* eslint-disable unicorn/better-regex */
import {
  setFormError,
  setForm,
} from "../../../store/features/gateway/api/update/slice";
import { setNestedState } from "../common";

export const regexForName = /^[ A-Za-z][\d A-Za-z]{3,29}$/;
export const regexForListenPath = /^\/[A-Za-z]+[\dA-Za-z-][\dA-Za-z]*\/$/;

export const regexForTargetUrl =
  /^((https?|ftp|file):\/\/|www\.|ftp\.)(\([\w!#$%&+,./:=?@\\|]*\)|[\d!#$%&+,./:=?@A-Z\\_|-])*((\.[a-z0-9]{1,6}|:[a-z0-9]{1,6}))/i;

export const regexForNumber = /^-?\d+$/;

export const regexForOverrideTarget =
  /^((https?|ftp|file):\/\/|www\.|ftp\.)(\([\w!#$%&+,./:=?@\\|]*\)|[\d!#$%&+,./:=?@A-Z\\_|-])*((\.[a-z0-9]{1,6}|:[a-z0-9]{1,6}))/i;

export const regexForIssuer =
  /^((https?|ftp|file):\/\/|www\.|ftp\.)(\([\w!#$%&+,./:=?@\\|]*\)|[\d!#$%&+,./:=?@A-Z\\_|-])*((\.[a-z0-9]{1,6}|:[a-z0-9]{1,6}))/i;

export const regexForAllowedOrigins =
  /^(((https?|ftp|file):\/\/|www\.|ftp\.)(\([\w!#$%&+,./:=?@\\|]*\)|[\d!#$%&+,./:=?@A-Z\\_|-])*((\.[a-z0-9]{1,6}|:[a-z0-9]{1,6}))|(\*))/i;

export const regexForIPAddress =
  /^(?:\b25[0-5]|\b2[0-4]\d|\b[01]?\d{1,2})(\.(25[0-5]|2[0-4]\d|[01]?\d{1,2})){3}$/;

export function setFormData(e: any, dispatch: any, state: any) {
  const newState = setNestedState(e, state);
  dispatch(setForm(newState));
}

export function setFormErrors(e: any, dispatch: any) {
  dispatch(setFormError(e));
}
