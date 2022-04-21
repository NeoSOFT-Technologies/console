import { setFormError, setForm } from "../../store/features/api/update/slice";
import { setNestedState } from "../common";

export const regexForName = /^[A-Z a-z][A-Z a-z 0-9]{3,29}$/;
export const regexForListenPath = /^[/][a-zA-Z0-9]*[/]$/;
export const regexForTagetUrl =
  /^(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([a-zA-Z0-9+&@#\\/%=_|$?!:,.]*\)|[-A-Z0-9+&@#\\/%=_|$?!:,.])*(?:\([-A-Z0-9+&@#\\/%=_|$?!:,.]*\)|[A-Z0-9+&@#\\/%=_|$])*/;

export const regexForNumber = /^[0-9]*$/;

export const regexForOverrideTarget =
  /^(?:(?:https?|ftp|file):\/\/)(?:\([a-zA-Z0-9+&@#\\/%=_|$?!:,.]*\)|[-A-Z0-9+&@#\\/%=_|$?!:,.])*(?:\([-A-Z0-9+&@#\\/%=_|$?!:,.]*\)|[A-Z0-9+&@#\\/%=_|$])*/;

export function setFormData(e: any, dispatch: any, state: any) {
  const newState = setNestedState(e, state);
  dispatch(setForm(newState));
}

export function setFormErrors(e: any, dispatch: any) {
  dispatch(setFormError(e));
}
