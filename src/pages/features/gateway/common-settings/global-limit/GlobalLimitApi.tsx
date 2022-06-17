import React, { useState, useEffect } from "react";
import { Accordion, Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Spinner from "../../../../../components/loader/Loader";
import { regexForNumber } from "../../../../../resources/gateway/api/api-constants";
import { IKeyCreateState } from "../../../../../store/features/gateway/key/create";

import {
  keystate,
  setFormErrors,
  setForms,
} from "../../../../../store/features/gateway/key/create/slice";
import { IPolicyCreateState } from "../../../../../store/features/gateway/policy/create";
// import { emptyState } from "../../../../../store/features/gateway/policy/create/payload";
import {
  policystate,
  setForm,
  setFormError,
} from "../../../../../store/features/gateway/policy/create/slice";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";

interface IProps {
  state?: IPolicyCreateState;
  keystate?: IKeyCreateState;
  index?: number;
  current: string;
  setForm: (state: any, action: any) => void;
  setFormError: (state: any, action: any) => void;
}

export default function GlobalLimitApi(props: IProps) {
  const dispatch = useAppDispatch();
  const states: IKeyCreateState = useAppSelector(
    (RootState) => RootState.createKeyState
  );
  const state: IPolicyCreateState = useAppSelector(
    (RootStates) => RootStates.createPolicyState
  );

  const { id } = useParams();
  const perapi =
    props.current === "policy"
      ? [...props.state?.data.errors?.PerApiLimit!]
      : [...props.keystate?.data.errors?.PerApiLimit!];

  function validateForm(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    perapi[props.index!] = {
      ...perapi[props.index!],
      [name]: regexForNumber.test(value) ? "" : "Enter only Numbers",
    };
    props.current === "policy"
      ? dispatch(
          setFormError({
            ...state.data.errors,
            PerApiLimit: perapi,
          })
        )
      : dispatch(
          setFormErrors({
            ...states.data.errors,
            PerApiLimit: perapi,
          })
        );
  }

  const [rateError, setRateError] = useState<boolean[]>([]);
  const [throttleError, setThrottleError] = useState<boolean[]>([]);
  const [quotaError, setQuotaError] = useState<boolean[]>([]);
  const len =
    props.current === "policy"
      ? props.state?.data.form.APIs?.length
      : props.keystate?.data.form.AccessRights?.length;

  function EffectSetRateError() {
    for (let i = 0; i < len!; i++) {
      const rates = [...rateError];
      rates.push(false);
      const throttles = [...throttleError];
      throttles.push(true);
      const quotas = [...quotaError];
      quotas.push(true);
      setThrottleError(throttles);
      setQuotaError(quotas);
      setRateError(rates);
    }
  }

  function updateValidationInput(attributeName: any) {
    perapi[props.index!] = {
      ...perapi[props.index!],
      Rate:
        attributeName !== "GlobalLimit.IsDisabled"
          ? perapi[props.index!].Rate
          : "",
      Per:
        attributeName !== "GlobalLimit.IsDisabled"
          ? perapi[props.index!].Per
          : "",
      ThrottleInterval:
        attributeName !== "Throttling.IsDisabled"
          ? perapi[props.index!].ThrottleInterval
          : "",
      ThrottleRetries:
        attributeName !== "Throttling.IsDisabled"
          ? perapi[props.index!].ThrottleRetries
          : "",
      Quota:
        attributeName !== "unlimitedRequests.IsDisabled"
          ? perapi[props.index!].Quota
          : "",
      QuotaRenewalRate:
        attributeName !== "unlimitedRequests.IsDisabled"
          ? perapi[props.index!].QuotaRenewalRate
          : "",
    };
  }
  function setRateValue(
    FormValue: any, // props  state
    FormData: any, // return state.data
    currentState: any, // data save previous previousstate
    statevalue: string, // return string APIs or AccessRight
    setFormRate: any,
    setFormErrorRate: any,
    event: React.ChangeEvent<HTMLInputElement>, // to get current toggle name
    togglecheck: any // to check toggtle is on or off
    // propertytype
  ) {
    const attributeName: string = event.target.getAttribute("name")!;
    if (togglecheck === -1) {
      console.log("check name", event.target.getAttribute("name"));
      const apisList = [...FormValue!];
      apisList[props.index!] = {
        ...apisList[props.index!],
        Limit: {
          Rate:
            attributeName !== "GlobalLimit.IsDisabled"
              ? FormValue[props.index!].Limit?.Rate
              : id === undefined
              ? 0
              : currentState === undefined
              ? 0
              : FormValue[props.index!].Limit?.Rate === -1
              ? 0
              : FormValue[props.index!].Limit?.Rate,
          Per:
            attributeName !== "GlobalLimit.IsDisabled"
              ? FormValue[props.index!].Limit?.Per
              : id === undefined
              ? 0
              : currentState === undefined
              ? 0
              : FormValue[props.index!].Limit?.Per! === -1
              ? 0
              : FormValue[props.index!].Limit?.Per!,
          Throttle_interval:
            attributeName !== "Throttling.IsDisabled"
              ? FormValue[props.index!].Limit?.Throttle_interval
              : id === undefined
              ? 0
              : currentState === undefined
              ? 0
              : FormValue[props.index!].Limit?.Throttle_interval === -1
              ? 0
              : FormValue[props.index!].Limit?.Throttle_interval,
          Throttle_retry_limit:
            attributeName !== "Throttling.IsDisabled"
              ? FormValue[props.index!].Limit?.Throttle_retry_limit
              : id === undefined
              ? 0
              : currentState === undefined
              ? 0
              : FormValue[props.index!].Limit?.Throttle_retry_limit === -1
              ? 0
              : FormValue[props.index!].Limit?.Throttle_retry_limit,
          Max_query_depth: FormValue[props.index!].Limit?.Max_query_depth,
          Quota_max:
            attributeName !== "unlimitedRequests.IsDisabled"
              ? FormValue[props.index!].Limit?.Quota_max
              : id === undefined
              ? 0
              : currentState === undefined
              ? 0
              : FormValue[props.index!].Limit?.Quota_max === -1
              ? 0
              : FormValue[props.index!].Limit?.Quota_max,
          Quota_renews: FormValue[props.index!].Limit?.Quota_renews,
          Quota_remaining: FormValue[props.index!].Limit?.Quota_remaining,
          Quota_renewal_rate:
            attributeName !== "unlimitedRequests.IsDisabled"
              ? FormValue[props.index!].Limit?.Quota_renewal_rate
              : id === undefined
              ? 0
              : currentState === undefined
              ? 0
              : FormValue[props.index!].Limit?.Quota_renewal_rate === -1
              ? 0
              : FormValue[props.index!].Limit?.Quota_renewal_rate,
          Set_by_policy: FormValue[props.index!].Limit?.Set_by_policy!,
        },
      };
      dispatch(
        setFormRate({
          ...FormData.form,
          [statevalue]: apisList,
        })
      );
      updateValidationInput(attributeName);
      dispatch(
        setFormErrorRate({
          ...FormData.errors,
          PerApiLimit: perapi,
        })
      );
    } else {
      const apisList = [...FormValue!];
      apisList[props.index!] = {
        ...apisList[props.index!],
        Limit: {
          Rate:
            attributeName !== "GlobalLimit.IsDisabled"
              ? FormValue[props.index!].Limit?.Rate
              : -1,
          Per:
            attributeName !== "GlobalLimit.IsDisabled"
              ? FormValue[props.index!].Limit?.Per
              : -1,
          Throttle_interval:
            attributeName !== "Throttling.IsDisabled"
              ? FormValue[props.index!].Limit?.Throttle_interval
              : -1,
          Throttle_retry_limit:
            attributeName !== "Throttling.IsDisabled"
              ? FormValue[props.index!].Limit?.Throttle_retry_limit
              : -1,
          Max_query_depth: FormValue[props.index!].Limit?.Max_query_depth,
          Quota_max:
            attributeName !== "unlimitedRequests.IsDisabled"
              ? FormValue[props.index!].Limit?.Quota_max
              : -1,
          Quota_renews: FormValue[props.index!].Limit?.Quota_renews,
          Quota_remaining: FormValue[props.index!].Limit?.Quota_remaining,
          Quota_renewal_rate:
            attributeName !== "unlimitedRequests.IsDisabled"
              ? FormValue[props.index!].Limit?.Quota_renewal_rate
              : -1,
          Set_by_policy: FormValue[props.index!].Limit?.Set_by_policy!,
        },
      };

      dispatch(
        setFormRate({
          ...FormData.form,
          [statevalue]: apisList,
        })
      );
      updateValidationInput(attributeName);
      dispatch(
        setFormErrorRate({
          ...FormData.errors,
          PerApiLimit: perapi,
        })
      );
    }
  }

  useEffect(() => {
    EffectSetRateError();
  }, []);

  const handlerateclick = (event: any) => {
    event.preventDefault();
    validateForm(event);
    const value = props.index!;
    const apisList =
      props.current === "policy"
        ? [...props.state?.data.form.APIs!]
        : [...props.keystate?.data.form.AccessRights!];
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData: any =
      props.current === "policy"
        ? {
            ...props.state?.data.form.APIs[props.index!].Limit!,
          }
        : { ...props.keystate?.data.form.AccessRights[props.index!].Limit! };
    switch (fieldName) {
      case "Rate":
        newFormData.Rate = fieldValue;
        break;
      case "Per":
        newFormData.Per = fieldValue;
        break;
      case "ThrottleRetries":
        newFormData.Throttle_retry_limit = fieldValue;
        break;
      case "ThrottleInterval":
        newFormData.Throttle_interval = fieldValue;
        break;
      case "Quota":
        newFormData.Quota_max = fieldValue;
        break;
      case "Quota_renewal_rate":
        newFormData.Quota_renewal_rate = fieldValue;
        break;
    }

    // setLimits(newFormData);
    apisList[value] = {
      ...apisList[value],
      Limit: { ...newFormData },
    };
    props.current === "policy"
      ? dispatch(setForm({ ...state.data.form, APIs: apisList }))
      : dispatch(setForms({ ...states.data.form, AccessRights: apisList }));
  };
  return (
    <>
      {(props.current === "policy" &&
        props.state?.data.errors?.PerApiLimit!.length! > 0) ||
      (props.current !== "policy" &&
        props.keystate?.data.errors?.PerApiLimit!.length! > 0) ? (
        <div className="card">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Per Limits and Quota</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Row>
                    <Col md="12">
                      <Form.Group className="mt-6">
                        <Form.Label>
                          {id !== undefined || id === undefined ? (
                            <i>
                              {props.current === "key" ? (
                                props.keystate?.data.form.AccessRights[
                                  props.index!
                                ].isRateLimitDisabled ||
                                props.keystate?.data.form.AccessRights[
                                  props.index!
                                ].isQuotaDisbaled ? (
                                  props.keystate?.data.form.AccessRights[
                                    props.index!
                                  ].isRateLimitDisabled &&
                                  props.keystate?.data.form.AccessRights[
                                    props.index!
                                  ].isQuotaDisbaled ? (
                                    <b className="pb-2">
                                      <h6 className="text-danger">
                                        Warning : RateLimit and Quota is
                                        Disabled by Api.
                                      </h6>{" "}
                                      If you want to apply RateLimit and Quotas
                                      than first you need to enabled it from
                                      APIs settings. <br />
                                    </b>
                                  ) : props.keystate?.data.form.AccessRights[
                                      props.index!
                                    ].isRateLimitDisabled ? (
                                    <b className="pb-2">
                                      <h6 className="text-danger">
                                        Warning : RateLimit is Disabled by Api.
                                      </h6>{" "}
                                      If you want to apply RateLimit than first
                                      you need to enabled it from APIs settings.
                                      <br />
                                    </b>
                                  ) : (
                                    <b className="pb-2">
                                      <h6 className="text-danger">
                                        Warning : Quota is Disabled by Api.{" "}
                                      </h6>{" "}
                                      If you want to apply Quota than first you
                                      need to enabled it from APIs settings.
                                      <br />
                                    </b>
                                  )
                                ) : (
                                  ""
                                )
                              ) : props.state?.data.form.APIs[props.index!]
                                  .isRateLimitDisabled ||
                                props.state?.data.form.APIs[props.index!]
                                  .isQuotaDisbaled ? (
                                props.state?.data.form.APIs[props.index!]
                                  .isRateLimitDisabled &&
                                props.state?.data.form.APIs[props.index!]
                                  .isQuotaDisbaled ? (
                                  <b className="pb-2">
                                    <h6 className="text-danger">
                                      Warning : RateLimit and Quota is Disabled
                                      by Api.
                                    </h6>{" "}
                                    If you want to apply RateLimit and Quotas
                                    than first you need to enabled it from APIs
                                    settings. <br />
                                  </b>
                                ) : props.state?.data.form.APIs[props.index!]
                                    .isRateLimitDisabled ? (
                                  <b className="pb-2">
                                    <h6 className="text-danger">
                                      Warning : RateLimit is Disabled by Api.
                                    </h6>{" "}
                                    If you want to apply RateLimit than first
                                    you need to enabled it from APIs settings.
                                    <br />
                                  </b>
                                ) : (
                                  <b className="pb-2">
                                    <h6 className="text-danger">
                                      Warning : Quota is Disabled by Api.{" "}
                                    </h6>{" "}
                                    If you want to apply Quota than first you
                                    need to enabled it from APIs settings.
                                    <br />
                                  </b>
                                )
                              ) : (
                                ""
                              )}
                            </i>
                          ) : (
                            <></>
                          )}
                        </Form.Label>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <Form.Group className="mb-3">
                        <Form.Label className="mt-2">
                          <b>Rate Limiting</b>
                        </Form.Label>
                        <Form.Check
                          type="switch"
                          id="disableGlobalRate"
                          name="GlobalLimit.IsDisabled"
                          label="Disable rate limiting"
                          className="ml-4"
                          checked={
                            props.current === "policy"
                              ? props.state?.data.form.APIs[props.index!].Limit
                                  ?.Rate! === -1
                              : props.keystate?.data.form.AccessRights[
                                  props.index!
                                ].Limit?.Rate! === -1
                          }
                          onChange={(e: any) =>
                            props.current === "policy"
                              ? setRateValue(
                                  props.state?.data.form.APIs,
                                  props.state?.data,
                                  policystate,
                                  "APIs",
                                  props.setForm,
                                  props.setFormError,
                                  e,
                                  props.state?.data.form.APIs[props.index!]
                                    .Limit?.Rate!
                                )
                              : setRateValue(
                                  props.keystate?.data.form.AccessRights,
                                  props.keystate?.data,
                                  keystate,
                                  "AccessRights",
                                  props.setForm,
                                  props.setFormError,
                                  e,
                                  props.keystate?.data.form.AccessRights[
                                    props.index!
                                  ].Limit?.Rate!
                                )
                          }
                        />
                        <Form.Label className="mt-3">Rate</Form.Label>
                        <br />

                        <Form.Control
                          className="mt-2"
                          type="text"
                          id="Rate"
                          required
                          value={
                            props.current === "policy"
                              ? props.state?.data.form.APIs[props.index!]?.Limit
                                  ?.Rate === -1
                                ? "Disabled Rate"
                                : props.state?.data.form.APIs[props.index!]
                                    ?.Limit?.Rate
                              : props.keystate?.data.form.AccessRights[
                                  props.index!
                                ]?.Limit?.Rate === -1
                              ? "Disabled Rate"
                              : props.keystate?.data.form.AccessRights[
                                  props.index!
                                ]?.Limit?.Rate
                          }
                          placeholder="Enter Request per period"
                          // onChange={(e: any) => validateForm(e)}
                          onChange={(e: any) => handlerateclick(e)}
                          name="Rate"
                          isInvalid={
                            props.current === "policy"
                              ? !!props.state?.data.errors?.PerApiLimit[
                                  props.index!
                                ].Rate
                              : !!states.data.errors?.PerApiLimit[props.index!]
                                  ?.Rate!
                          }
                          isValid={
                            props.current === "policy"
                              ? !props.state?.data.errors?.PerApiLimit[
                                  props.index!
                                ].Rate
                              : !states.data.errors?.PerApiLimit[props.index!]
                                  ?.Rate!
                          }
                          disabled={
                            props.current === "policy"
                              ? props.state?.data.form.APIs[props.index!].Limit
                                  ?.Rate! === -1
                              : props.keystate?.data.form.AccessRights[
                                  props.index!
                                ].Limit?.Rate! === -1
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {" "}
                          {props.current === "policy"
                            ? props.state?.data.errors?.PerApiLimit[
                                props.index!
                              ].Rate
                            : props.keystate?.data.errors?.PerApiLimit[
                                props.index!
                              ].Rate}
                        </Form.Control.Feedback>
                        <Form.Label className="mt-3">Per (Seconds)</Form.Label>
                        <br />
                        <Form.Control
                          className="mt-2"
                          type="text"
                          id="Per"
                          placeholder="Enter time"
                          onChange={(e: any) => handlerateclick(e)}
                          name="Per"
                          value={
                            props.current === "policy"
                              ? props.state?.data.form.APIs[props.index!]?.Limit
                                  ?.Per === -1
                                ? "Disabled Per"
                                : props.state?.data.form.APIs[props.index!]
                                    ?.Limit?.Per!
                              : props.keystate?.data.form.AccessRights[
                                  props.index!
                                ]?.Limit?.Per === -1
                              ? "Disabled Per"
                              : props.keystate?.data.form.AccessRights[
                                  props.index!
                                ]?.Limit?.Per!
                          }
                          isInvalid={
                            props.current === "policy"
                              ? !!state.data.errors?.PerApiLimit[props.index!]
                                  .Per
                              : !!states.data.errors?.PerApiLimit[props.index!]
                                  .Per
                          }
                          isValid={
                            props.current === "policy"
                              ? !state.data.errors?.PerApiLimit[props.index!]
                                  .Per
                              : !states.data.errors?.PerApiLimit[props.index!]
                                  .Per
                          }
                          disabled={
                            props.current === "policy"
                              ? props.state?.data.form.APIs[props.index!].Limit
                                  ?.Rate! === -1
                              : props.keystate?.data.form.AccessRights[
                                  props.index!
                                ].Limit?.Rate! === -1
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {props.current === "policy"
                            ? state.data.errors?.PerApiLimit[props.index!].Per
                            : states.data.errors?.PerApiLimit[props.index!].Per}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md="4">
                      <Form.Group className="mb-3">
                        <Form.Label className="mt-2">
                          <b>Throttling</b>
                        </Form.Label>
                        <Form.Check
                          type="switch"
                          id="disableThrottling"
                          name="Throttling.IsDisabled"
                          label="Disable Throttling"
                          checked={
                            props.current === "policy"
                              ? props.state?.data.form.APIs[props.index!].Limit
                                  ?.Throttle_retry_limit! === -1
                              : props.keystate?.data.form.AccessRights[
                                  props.index!
                                ].Limit?.Throttle_retry_limit! === -1
                          }
                          className="ml-4"
                          onChange={(e: any) =>
                            props.current === "policy"
                              ? setRateValue(
                                  props.state?.data.form.APIs,
                                  props.state?.data,
                                  policystate,
                                  "APIs",
                                  props.setForm,
                                  props.setFormError,
                                  e,
                                  props.state?.data.form.APIs[props.index!]
                                    .Limit?.Throttle_interval
                                )
                              : setRateValue(
                                  props.keystate?.data.form.AccessRights,
                                  props.keystate?.data,
                                  keystate,
                                  "AccessRights",
                                  props.setForm,
                                  props.setFormError,
                                  e,
                                  props.keystate?.data.form.AccessRights[
                                    props.index!
                                  ].Limit?.Throttle_interval
                                )
                          }
                        />
                        <Form.Label className="mt-3">
                          Throttle retry limit
                        </Form.Label>
                        <br />
                        <Form.Control
                          className="mt-2"
                          type="text"
                          id="retry"
                          value={
                            props.current === "policy"
                              ? props.state?.data.form.APIs[props.index!]?.Limit
                                  ?.Throttle_retry_limit === -1
                                ? "Disabled Throttling"
                                : props.state?.data.form.APIs[props.index!]
                                    ?.Limit?.Throttle_retry_limit
                              : props.keystate?.data.form.AccessRights[
                                  props.index!
                                ]?.Limit?.Throttle_retry_limit === -1
                              ? "Disabled Throttling"
                              : props.keystate?.data.form.AccessRights[
                                  props.index!
                                ]?.Limit?.Throttle_retry_limit
                          }
                          placeholder="Enter per request"
                          name="ThrottleRetries"
                          onChange={(e: any) => handlerateclick(e)}
                          // value={throttleDefault}
                          isInvalid={
                            props.current === "policy"
                              ? !!state.data.errors?.PerApiLimit[props.index!]
                                  .ThrottleRetries
                              : !!states.data.errors?.PerApiLimit[props.index!]
                                  .ThrottleRetries
                          }
                          isValid={
                            props.current === "policy"
                              ? !state.data.errors?.PerApiLimit[props.index!]
                                  .ThrottleRetries
                              : !states.data.errors?.PerApiLimit[props.index!]
                                  .ThrottleRetries
                          }
                          disabled={
                            props.current === "policy"
                              ? props.state?.data.form.APIs[props.index!].Limit
                                  ?.Throttle_retry_limit! === -1
                              : props.keystate?.data.form.AccessRights[
                                  props.index!
                                ].Limit?.Throttle_retry_limit! === -1
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {props.current === "policy"
                            ? state.data.errors?.PerApiLimit[props.index!]
                                .ThrottleRetries
                            : states.data.errors?.PerApiLimit[props.index!]
                                .ThrottleRetries}
                        </Form.Control.Feedback>
                        <Form.Label className="mt-3">
                          Throttle interval
                        </Form.Label>
                        <br />
                        <Form.Control
                          className="mt-2"
                          type="text"
                          id="interval"
                          name="ThrottleInterval"
                          value={
                            props.current === "policy"
                              ? props.state?.data.form.APIs[props.index!]?.Limit
                                  ?.Throttle_interval === -1
                                ? "Disabled Throttling"
                                : props.state?.data.form.APIs[props.index!]
                                    ?.Limit?.Throttle_interval
                              : props.keystate?.data.form.AccessRights[
                                  props.index!
                                ]?.Limit?.Throttle_interval === -1
                              ? "Disabled Throttling"
                              : props.keystate?.data.form.AccessRights[
                                  props.index!
                                ]?.Limit?.Throttle_interval
                          }
                          placeholder="Enter per request"
                          onChange={(e: any) => handlerateclick(e)}
                          isInvalid={
                            props.current === "policy"
                              ? !!state.data.errors?.PerApiLimit[props.index!]
                                  .ThrottleInterval
                              : !!states.data.errors?.PerApiLimit[props.index!]
                                  .ThrottleInterval
                          }
                          isValid={
                            props.current === "policy"
                              ? !state.data.errors?.PerApiLimit[props.index!]
                                  .ThrottleInterval
                              : !states.data.errors?.PerApiLimit[props.index!]
                                  .ThrottleInterval
                          }
                          disabled={
                            props.current === "policy"
                              ? props.state?.data.form.APIs[props.index!].Limit
                                  ?.Throttle_retry_limit! === -1
                              : props.keystate?.data.form.AccessRights[
                                  props.index!
                                ].Limit?.Throttle_retry_limit! === -1
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {props.current === "policy"
                            ? state.data.errors?.PerApiLimit[props.index!]
                                .ThrottleInterval
                            : states.data.errors?.PerApiLimit[props.index!]
                                .ThrottleInterval}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md="4">
                      <Form.Group className="mb-3">
                        <Form.Label className="mt-2">
                          <b>Usage Quota</b>
                        </Form.Label>
                        <Form.Check
                          type="switch"
                          id="unlimitedRequests"
                          name="unlimitedRequests.IsDisabled"
                          label="Unlimited requests"
                          checked={
                            props.current === "policy"
                              ? props.state?.data.form.APIs[props.index!].Limit
                                  ?.Quota_max! === -1
                              : props.keystate?.data.form.AccessRights[
                                  props.index!
                                ].Limit?.Quota_max! === -1
                          }
                          className="ml-4"
                          onChange={(e: any) =>
                            props.current === "policy"
                              ? setRateValue(
                                  props.state?.data.form.APIs,
                                  props.state?.data,
                                  policystate,
                                  "APIs",
                                  props.setForm,
                                  props.setFormError,
                                  e,
                                  props.state?.data.form.APIs[props.index!]
                                    .Limit?.Quota_max
                                )
                              : setRateValue(
                                  props.keystate?.data.form.AccessRights,
                                  props.keystate?.data,
                                  keystate,
                                  "AccessRights",
                                  props.setForm,
                                  props.setFormError,
                                  e,
                                  props.keystate?.data.form.AccessRights[
                                    props.index!
                                  ].Limit?.Quota_max
                                )
                          }
                        />
                        <Form.Label className="mt-3">
                          Max requests per period
                        </Form.Label>
                        <br />
                        <Form.Control
                          className="mt-2"
                          type="text"
                          id="quotaPer"
                          placeholder="Enter per period request"
                          onChange={(e: any) => handlerateclick(e)}
                          name="Quota"
                          value={
                            props.current === "policy"
                              ? props.state?.data.form.APIs[props.index!]?.Limit
                                  ?.Quota_max === -1
                                ? "Disabled Quota"
                                : props.state?.data.form.APIs[props.index!]
                                    ?.Limit?.Quota_max
                              : props.keystate?.data.form.AccessRights[
                                  props.index!
                                ]?.Limit?.Quota_max === -1
                              ? "Disabled Quota"
                              : props.keystate?.data.form.AccessRights[
                                  props.index!
                                ]?.Limit?.Quota_max
                          }
                          isInvalid={
                            props.current === "policy"
                              ? !!state.data.errors?.PerApiLimit[props.index!]
                                  .Quota
                              : !!states.data.errors?.PerApiLimit[props.index!]
                                  .Quota
                          }
                          isValid={
                            props.current === "policy"
                              ? !state.data.errors?.PerApiLimit[props.index!]
                                  .Quota
                              : !states.data.errors?.PerApiLimit[props.index!]
                                  .Quota
                          }
                          disabled={
                            props.current === "policy"
                              ? props.state?.data.form.APIs[props.index!].Limit
                                  ?.Quota_max! === -1
                              : props.keystate?.data.form.AccessRights[
                                  props.index!
                                ].Limit?.Quota_max! === -1
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {" "}
                          {props.current === "policy"
                            ? state.data.errors?.PerApiLimit[props.index!].Quota
                            : states.data.errors?.PerApiLimit[props.index!]
                                .Quota}
                        </Form.Control.Feedback>
                        <Form.Label className="mt-3">
                          Quota resets every
                        </Form.Label>
                        <Form.Select
                          className="mt-2"
                          style={{ height: 46 }}
                          disabled={
                            props.current === "policy"
                              ? props.state?.data.form.APIs[props.index!].Limit
                                  ?.Quota_max! === -1
                              : props.keystate?.data.form.AccessRights[
                                  props.index!
                                ].Limit?.Quota_max! === -1
                          }
                          name="Quota_renewal_rate"
                          value={
                            props.current === "policy"
                              ? props.state?.data.form.APIs[props.index!]?.Limit
                                  ?.Quota_renewal_rate
                              : props.keystate?.data.form.AccessRights[
                                  props.index!
                                ]?.Limit?.Quota_renewal_rate
                          }
                          onChange={(e: any) => handlerateclick(e)}
                        >
                          <option value={0}>never</option>
                          <option value={3600}>1 hour</option>
                          <option value={21_600}>6 hour</option>
                          <option value={43_200}>12 hour</option>
                          <option value={604_800}>1 week</option>
                          <option value={2.628e6}>1 month</option>
                          <option value={1.577e7}>6 months</option>
                          <option value={3.154_67}>12 months</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}
