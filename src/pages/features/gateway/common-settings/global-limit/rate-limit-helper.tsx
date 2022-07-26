import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React from "react";
export interface IPropsHelper {
  state?: any;
  form?: any; // props.state?.data,
  formProp?: any; // props.state?.data.form.APIs
  errors?: any;
  errorProp?: any;
  prevState?: any; // previous policystate or keystate
  propName?: string;
  setForm?: ActionCreatorWithPayload<any, string>;
  setFormError?: ActionCreatorWithPayload<any, string>;
  event?: React.ChangeEvent<HTMLInputElement>;
  index?: number;
  dispatch?: any;
  id?: any;
  current?: any;
}
function checkProp(prop: any) {
  return prop === -1 ? 0 : prop;
}
function checkPrevState(prevState: any, prop: any) {
  return prevState === undefined ? 0 : checkProp(prop);
}
function checkId(id: any, prevState: any, prop: any) {
  return id === undefined ? 0 : checkPrevState(prevState, prop);
}
function checkfirstAtrribute(
  attribute: string,
  attributeName: string,
  prop: any,
  id: any,
  prevState: any
) {
  return attribute !== attributeName ? prop : checkId(id, prevState, prop);
}
function checkLastAttribute(
  attribute: string,
  attributeName: string,
  prop: any
) {
  return attribute !== attributeName ? prop : -1;
}

function setValue(
  attribute: string,
  attributeName: string,
  prevState: any,
  prop: any,
  togglecheck: any,
  id: any
) {
  return togglecheck === -1
    ? checkfirstAtrribute(attribute, attributeName, prop, id, prevState)
    : checkLastAttribute(attribute, attributeName, prop);
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

  perapi1[index] = {
    ...perapi1[index],
    Rate:
      attributeName !== "GlobalLimit.IsDisabled"
        ? perapi1[index || 0].Rate
        : "",
    Per:
      attributeName !== "GlobalLimit.IsDisabled" ? perapi1[index || 0].Per : "",
    ThrottleInterval:
      attributeName !== "Throttling.IsDisabled"
        ? perapi1[index || 0].ThrottleInterval
        : "",
    ThrottleRetries:
      attributeName !== "Throttling.IsDisabled"
        ? perapi1[index || 0].ThrottleRetries
        : "",
    Quota:
      attributeName !== "unlimitedRequests.IsDisabled"
        ? perapi1[index || 0].Quota
        : "",
    QuotaRenewalRate:
      attributeName !== "unlimitedRequests.IsDisabled"
        ? perapi1[index || 0].QuotaRenewalRate
        : "",
  };
  dispatch(
    (setFormError as ActionCreatorWithPayload<any, string>)({
      ...error,
      PerApiLimit: perapi1,
    })
  );
}
export function setFormValue(props: IPropsHelper, event: any) {
  // const attributeName: string = props.event?.target.getAttribute("name")!;
  const attributeName: string = event.target.getAttribute("name") as string;
  const apisList = [...props.formProp];
  apisList[props.index as number] = {
    ...apisList[props.index as number],
    Limit: {
      Rate: setValue(
        attributeName,
        "GlobalLimit.IsDisabled",
        props.prevState,
        props.formProp[props.index as number].Limit?.Rate,
        props.formProp[props.index as number].Limit?.Rate,
        props.id
      ),
      Per: setValue(
        attributeName,
        "GlobalLimit.IsDisabled",
        props.prevState,
        props.formProp[props.index as number].Limit?.Per,
        props.formProp[props.index as number].Limit?.Per,
        props.id
      ),
      Throttle_interval: setValue(
        attributeName,
        "Throttling.IsDisabled",
        props.prevState,
        props.formProp[props.index as number].Limit?.Throttle_interval,
        props.formProp[props.index as number].Limit?.Throttle_interval,
        props.id
      ),
      Throttle_retry_limit: setValue(
        attributeName,
        "Throttling.IsDisabled",
        props.prevState,
        props.formProp[props.index as number].Limit?.Throttle_retry_limit,
        props.formProp[props.index as number].Limit?.Throttle_retry_limit,
        props.id
      ),
      Max_query_depth: props.formProp[props.index || 0].Limit?.Max_query_depth,
      Quota_max: setValue(
        attributeName,
        "unlimitedRequests.IsDisabled",
        props.prevState,
        props.formProp[props.index as number].Limit?.Quota_max,
        props.formProp[props.index as number].Limit?.Quota_max,
        props.id
      ),
      Quota_renews: props.formProp[props.index as number].Limit?.Quota_renews,
      Quota_remaining: props.formProp[props.index || 0].Limit?.Quota_remaining,
      Quota_renewal_rate: setValue(
        attributeName,
        "unlimitedRequests.IsDisabled",
        props.prevState,
        props.formProp[props.index as number].Limit?.Quota_renewal_rate,
        props.formProp[props.index as number].Limit?.Quota_renewal_rate,
        props.id
      ),
      Set_by_policy: props.formProp[props.index as number].Limit?.Set_by_policy,
    },
  };

  props.dispatch(
    (props.setForm as ActionCreatorWithPayload<any, string>)({
      ...props.form,
      [props.propName as string]: apisList,
    })
  );
  updateValidationInput(
    attributeName,
    props.errorProp,
    props.index as number,
    props.dispatch,
    props.setFormError,
    props.errors
  );
}
function GlobalupdateValidationInput(
  attributeName: any,
  perapi: any,
  dispatch: any,
  setFormError: any,
  error: any
) {
  let perapi1 = { ...perapi };

  perapi1 = {
    ...perapi1,
    Rate: attributeName !== "GlobalLimit.IsDisabled" ? perapi1.Rate : "",
    Per: attributeName !== "GlobalLimit.IsDisabled" ? perapi1.Per : "",
    ThrottleInterval:
      attributeName !== "Throttling.IsDisabled" ? perapi1.ThrottleInterval : "",
    ThrottleRetries:
      attributeName !== "Throttling.IsDisabled" ? perapi1.ThrottleRetries : "",
    Quota:
      attributeName !== "unlimitedRequests.IsDisabled" ? perapi1.Quota : "",
    QuotaRenewalRate:
      attributeName !== "unlimitedRequests.IsDisabled"
        ? perapi1.QuotaRenewalRate
        : "",
  };
  dispatch(
    (setFormError as ActionCreatorWithPayload<any, string>)({
      ...error,
      GlobalLimit: perapi1,
    })
  );
}
export function GlobalsetFormValue(props: IPropsHelper, event: any) {
  // const attributeName: string = props.event?.target.getAttribute("name")!;
  const attributeName: string = event?.target.getAttribute("name") as string;
  props.dispatch(
    (props.setForm as ActionCreatorWithPayload<any, string>)({
      ...props.form,
      Rate: setValue(
        attributeName,
        "GlobalLimit.IsDisabled",
        props.prevState,
        props.form.Rate || [],
        props.form.Rate || [],
        props.id
      ),
      ThrottleInterval: setValue(
        attributeName,
        "Throttling.IsDisabled",
        props.prevState,
        props.form.ThrottleInterval || [],
        props.form.ThrottleInterval || [],
        props.id
      ),
      ThrottleRetries: setValue(
        attributeName,
        "Throttling.IsDisabled",
        props.prevState,
        props.form.ThrottleRetries || [],
        props.form.ThrottleRetries || [],
        props.id
      ),
      Per: setValue(
        attributeName,
        "GlobalLimit.IsDisabled",
        props.prevState,
        props.form.Per || [],
        props.form.Per || [],
        props.id
      ),
      Quota: setValue(
        attributeName,
        "unlimitedRequests.IsDisabled",
        props.prevState,
        props.form.Quota || [],
        props.form.Quota || [],
        props.id
      ),
      QuotaRenewalRate: setValue(
        attributeName,
        "unlimitedRequests.IsDisabled",
        props.prevState,
        props.form.QuotaRenewalRate || [],
        props.form.QuotaRenewalRate || [],
        props.id
      ),
    })
  );
  GlobalupdateValidationInput(
    attributeName,
    props.errors.GlobalLimit,
    props.dispatch,
    props.setFormError,
    props.errors
  );
}
export function setLabel(props: IPropsHelper) {
  let _label = "";
  if (
    props.formProp[props.index as number].isRateLimitDisabled &&
    props.formProp[props.index as number].isQuotaDisbaled
  ) {
    _label = "RateLimit and Quota";
  } else if (props.formProp[props.index as number].isRateLimitDisabled) {
    _label = "RateLimit";
  } else if (props.formProp[props.index as number].isQuotaDisbaled) {
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
