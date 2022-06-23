import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React from "react";
// import { setForms } from "../../../../../store/features/gateway/key/create/slice";
// import { useParams } from "react-router-dom";
// import { useAppDispatch } from "../../../../../store/hooks";
// const dispatch = useAppDispatch();
// const { id } = useParams();
export interface IPropsHelper {
  form?: any; // props.state?.data,
  formProp?: any; // props.state?.data.form.APIs
  errors?: any;
  errorProp?: any;
  prevState?: any; // previous policystate or keystate
  propName?: string;
  setForm?: ActionCreatorWithPayload<any, string>;
  setFormError?: ActionCreatorWithPayload<any, string>;
  event?: React.ChangeEvent<HTMLInputElement>;
  togglecheck?: any;
  index?: number;
  dispatch?: any;
  id?: any;
  current?: any;
}
function setValue(
  attribute: string,
  attributeName: string,
  prevState: any,
  prop: any,
  togglecheck: any,
  id: any
) {
  // const propv = togglecheck === -1 ? prop : -1;
  console.log("togglecheck", togglecheck);
  return togglecheck === -1
    ? attribute !== attributeName
      ? prop
      : id === undefined
      ? 0
      : prevState === undefined
      ? 0
      : prop === -1
      ? 0
      : prop
    : attribute !== attributeName
    ? prop
    : -1;
}
function updateValidationInput(
  attributeName: any,
  perapi: any,
  index: number,
  dispatch: any,
  setFormError: any,
  error: any
) {
  const perapi1 = [...perapi];
  console.log("perapi1", perapi1);
  perapi1[index!] = {
    ...perapi1[index!],
    Rate:
      attributeName !== "GlobalLimit.IsDisabled" ? perapi1[index!].Rate : "",
    Per: attributeName !== "GlobalLimit.IsDisabled" ? perapi1[index!].Per : "",
    ThrottleInterval:
      attributeName !== "Throttling.IsDisabled"
        ? perapi1[index!].ThrottleInterval
        : "",
    ThrottleRetries:
      attributeName !== "Throttling.IsDisabled"
        ? perapi1[index!].ThrottleRetries
        : "",
    Quota:
      attributeName !== "unlimitedRequests.IsDisabled"
        ? perapi1[index!].Quota
        : "",
    QuotaRenewalRate:
      attributeName !== "unlimitedRequests.IsDisabled"
        ? perapi1[index!].QuotaRenewalRate
        : "",
  };
  dispatch(
    setFormError!({
      ...error,
      PerApiLimit: perapi1,
    })
  );
}
export function setFormValue(props: IPropsHelper, event: any) {
  // const attributeName: string = props.event?.target.getAttribute("name")!;
  const attributeName: string = event?.target.getAttribute("name")!;
  const apisList = [...props.formProp!];
  apisList[props.index!] = {
    ...apisList[props.index!],
    Limit: {
      Rate: setValue(
        attributeName,
        "GlobalLimit.IsDisabled",
        props.prevState,
        props.formProp[props.index!].Limit?.Rate,
        props.formProp[props.index!].Limit?.Rate,
        props.id
      ),
      Per: setValue(
        attributeName,
        "GlobalLimit.IsDisabled",
        props.prevState,
        props.formProp[props.index!].Limit?.Per,
        props.formProp[props.index!].Limit?.Per,
        props.id
      ),
      Throttle_interval: setValue(
        attributeName,
        "Throttling.IsDisabled",
        props.prevState,
        props.formProp[props.index!].Limit?.Throttle_interval,
        props.formProp[props.index!].Limit?.Throttle_interval,
        props.id
      ),
      Throttle_retry_limit: setValue(
        attributeName,
        "Throttling.IsDisabled",
        props.prevState,
        props.formProp[props.index!].Limit?.Throttle_retry_limit,
        props.formProp[props.index!].Limit?.Throttle_retry_limit,
        props.id
      ),
      Max_query_depth: props.formProp[props.index!].Limit?.Max_query_depth,
      Quota_max: setValue(
        attributeName,
        "unlimitedRequests.IsDisabled",
        props.prevState,
        props.formProp[props.index!].Limit?.Quota_max,
        props.formProp[props.index!].Limit?.Quota_max,
        props.id
      ),
      Quota_renews: props.formProp[props.index!].Limit?.Quota_renews,
      Quota_remaining: props.formProp[props.index!].Limit?.Quota_remaining,
      Quota_renewal_rate: setValue(
        attributeName,
        "unlimitedRequests.IsDisabled",
        props.prevState,
        props.formProp[props.index!].Limit?.Quota_renewal_rate,
        props.formProp[props.index!].Limit?.Quota_renewal_rate,
        props.id
      ),
      Set_by_policy: props.formProp[props.index!].Limit?.Set_by_policy!,
    },
  };

  props.dispatch(
    props.setForm!({
      ...props.form,
      [props.propName!]: apisList,
    })
  );
  updateValidationInput(
    attributeName,
    props.errorProp,
    props.index!,
    props.dispatch,
    props.setFormError,
    props.errors
  );
}

export function setLabel(props: IPropsHelper) {
  let _label = "";
  if (
    props.formProp![props.index!].isRateLimitDisabled &&
    props.formProp![props.index!].isQuotaDisbaled
  ) {
    _label = "RateLimit and Quota";
  } else if (props.formProp![props.index!].isRateLimitDisabled) {
    _label = "RateLimit";
  } else if (props.formProp![props.index!].isQuotaDisbaled) {
    _label = "Quota";
  }

  return props.id !== undefined || props.id === undefined ? (
    <b className="pb-2">
      <h6 className="text-danger">Warning : {_label} is Disabled by Api.</h6> If
      you want to apply
      {_label} than first you need to enabled it from APIs settings. <br />
    </b>
  ) : (
    <></>
  );
}
