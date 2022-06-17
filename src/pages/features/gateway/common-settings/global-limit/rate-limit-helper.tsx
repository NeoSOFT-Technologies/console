import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../../store/hooks";
const dispatch = useAppDispatch();
const { id } = useParams();
interface IProps {
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
}
function setValue(
  attribute: string,
  attributeName: string,
  prevState: any,
  prop: any,
  togglecheck: any
) {
  prop = togglecheck === -1 ? prop : "-1";
  return attribute !== attributeName
    ? prop
    : id === undefined
    ? 0
    : prevState === undefined
    ? 0
    : prop === -1
    ? 0
    : prop;
}
function updateValidationInput(attributeName: any, perapi: any, index: number) {
  perapi[index!] = {
    ...perapi[index!],
    Rate: attributeName !== "GlobalLimit.IsDisabled" ? perapi[index!].Rate : "",
    Per: attributeName !== "GlobalLimit.IsDisabled" ? perapi[index!].Per : "",
    ThrottleInterval:
      attributeName !== "Throttling.IsDisabled"
        ? perapi[index!].ThrottleInterval
        : "",
    ThrottleRetries:
      attributeName !== "Throttling.IsDisabled"
        ? perapi[index!].ThrottleRetries
        : "",
    Quota:
      attributeName !== "unlimitedRequests.IsDisabled"
        ? perapi[index!].Quota
        : "",
    QuotaRenewalRate:
      attributeName !== "unlimitedRequests.IsDisabled"
        ? perapi[index!].QuotaRenewalRate
        : "",
  };
}
export function setFormValue(props: IProps) {
  const attributeName: string = props.event?.target.getAttribute("name")!;
  const apisList = [...props.formProp!];
  apisList[props.index!] = {
    ...apisList[props.index!],
    Limit: {
      Rate: setValue(
        attributeName,
        "GlobalLimit.IsDisabled",
        props.prevState,
        props.formProp[props.index!].Limit?.Rate,
        props.togglecheck
      ),
      Per: setValue(
        attributeName,
        "GlobalLimit.IsDisabled",
        props.prevState,
        props.formProp[props.index!].Limit?.Per,
        props.togglecheck
      ),
      Throttle_interval: setValue(
        attributeName,
        "Throttling.IsDisabled",
        props.prevState,
        props.formProp[props.index!].Limit?.Throttle_interval,
        props.togglecheck
      ),
      Throttle_retry_limit: setValue(
        attributeName,
        "Throttling.IsDisabled",
        props.prevState,
        props.formProp[props.index!].Limit?.Throttle_retry_limit,
        props.togglecheck
      ),
      Max_query_depth: props.formProp[props.index!].Limit?.Max_query_depth,
      Quota_max: setValue(
        attributeName,
        "unlimitedRequests.IsDisabled",
        props.prevState,
        props.formProp[props.index!].Limit?.Quota_max,
        props.togglecheck
      ),
      Quota_renews: props.formProp[props.index!].Limit?.Quota_renews,
      Quota_remaining: props.formProp[props.index!].Limit?.Quota_remaining,
      Quota_renewal_rate: setValue(
        attributeName,
        "unlimitedRequests.IsDisabled",
        props.prevState,
        props.formProp[props.index!].Limit?.Quota_renewal_rate,
        props.togglecheck
      ),
      Set_by_policy: props.formProp[props.index!].Limit?.Set_by_policy!,
    },
  };
  dispatch(
    props.setForm!({
      ...props.form,
      [props.propName!]: apisList,
    })
  );
  updateValidationInput(attributeName, props.errorProp, props.index!);
  dispatch(
    props.setFormError!({
      ...props.errors,
      PerApiLimit: props.errorProp,
    })
  );
}

export function setLabel(props: IProps) {
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

  return id !== undefined || id === undefined ? (
    <b className="pb-2">
      <h6 className="text-danger">Warning : {_label} is Disabled by Api.</h6> If
      you want to apply
      {_label} than first you need to enabled it from APIs settings. <br />
    </b>
  ) : (
    <></>
  );
}
