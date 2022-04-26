import {
  setForms,
  setFormErrors,
} from "../../../store/features/gateway/key/create/slice";
import { setNestedState } from "../common";

export const regexForName = /^[ A-Za-z][\d A-Za-z]{3,29}$/;

export function setFormData(e: any, dispatch: any, state: any) {
  const newState = setNestedState(e, state);
  dispatch(setForms(newState));
}

export function setFormErrorkey(e: any, dispatch: any) {
  dispatch(setFormErrors(e));
}
