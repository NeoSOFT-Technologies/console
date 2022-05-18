import React, { useEffect, useState } from "react";
import { Accordion, Row, Col, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Spinner from "../../../../../components/loader/Loader";
import { regexForNumber } from "../../../../../resources/gateway/api/api-constants";
import { IKeyCreateState } from "../../../../../store/features/gateway/key/create";
import {
  keystate,
  setForms,
  setFormErrors,
} from "../../../../../store/features/gateway/key/create/slice";
import { IPolicyCreateState } from "../../../../../store/features/gateway/policy/create";
import {
  policystate,
  setForm,
  setFormError,
} from "../../../../../store/features/gateway/policy/create/slice";

import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";

interface IProps {
  state?: IPolicyCreateState;
  keystate?: IKeyCreateState;
  current: string;
  message?: string;
}

export default function GlobalRateLimit(props: IProps) {
  const dispatch = useAppDispatch();
  const states = useAppSelector((RootState) => RootState.createKeyState);
  const state: IPolicyCreateState = useAppSelector(
    (RootStates) => RootStates.createPolicyState
  );
  let perapi =
    props.current === "policy"
      ? { ...props.state?.data.errors?.GlobalLimit! }
      : { ...props.keystate?.data.errors?.GlobalLimit! };
  const { id } = useParams();
  function validateForm(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    switch (name) {
      case "rate":
        perapi = {
          ...perapi,
          Rate: regexForNumber.test(value) ? "" : "Enter only Numbers",
        };
        props.current === "policy"
          ? dispatch(
              setFormError({
                ...state.data.errors,
                GlobalLimit: perapi,
              })
            )
          : dispatch(
              setFormErrors({
                ...states.data.errors,
                GlobalLimit: perapi,
              })
            );
        break;
      case "per":
        perapi = {
          ...perapi,
          Per: regexForNumber.test(value) ? "" : "Enter only Numbers",
        };
        props.current === "policy"
          ? dispatch(
              setFormError({
                ...state.data.errors,
                GlobalLimit: perapi,
              })
            )
          : dispatch(
              setFormErrors({
                ...states.data.errors,
                GlobalLimit: perapi,
              })
            );
        break;
      case "throttle_retry_limit":
        perapi = {
          ...perapi,
          ThrottleRetries: regexForNumber.test(value)
            ? ""
            : "Enter only Numbers",
        };
        props.current === "policy"
          ? dispatch(
              setFormError({
                ...state.data.errors,
                GlobalLimit: perapi,
              })
            )
          : dispatch(
              setFormErrors({
                ...states.data.errors,
                GlobalLimit: perapi,
              })
            );
        break;
      case "throttle_interval":
        perapi = {
          ...perapi,
          ThrottleInterval: regexForNumber.test(value)
            ? ""
            : "Enter only Numbers",
        };
        props.current === "policy"
          ? dispatch(
              setFormError({
                ...state.data.errors,
                GlobalLimit: perapi,
              })
            )
          : dispatch(
              setFormErrors({
                ...states.data.errors,
                GlobalLimit: perapi,
              })
            );
        break;
      case "quota_max":
        perapi = {
          ...perapi,
          Quota: regexForNumber.test(value) ? "" : "Enter only Numbers",
        };
        props.current === "policy"
          ? dispatch(
              setFormError({
                ...state.data.errors,
                GlobalLimit: perapi,
              })
            )
          : dispatch(
              setFormErrors({
                ...states.data.errors,
                GlobalLimit: perapi,
              })
            );
        break;
      default:
        break;
    }
  }

  const [rate, setRate] = useState(false);
  const [throttle, setThrottle] = useState(true);
  const [quota, setQuota] = useState(true);

  useEffect(() => {
    if (
      id !== undefined &&
      state.loading === false &&
      props.current === "policy"
    ) {
      state.data.form.Rate === -1 ? setRate(true) : setRate(false);
      state.data.form.ThrottleInterval === -1
        ? setThrottle(true)
        : setThrottle(false);
      state.data.form.MaxQuota === -1 ? setQuota(true) : setQuota(false);
    } else if (
      id !== undefined &&
      states.loading === false &&
      props.current !== "policy"
    ) {
      states.data.form.Rate === -1 ? setRate(true) : setRate(false);
      states.data.form.ThrottleInterval === -1
        ? setThrottle(true)
        : setThrottle(false);
      states.data.form.Quota === -1 ? setQuota(true) : setQuota(false);
    }
  }, [
    state.data.form.Rate,
    state.data.form.Per,
    state.data.form.ThrottleInterval,
    state.data.form.ThrottleRetries,
    state.data.form.MaxQuota,
    state.data.form.QuotaRate,
    states.data.form.Rate,
    states.data.form.Per,
    states.data.form.ThrottleInterval,
    states.data.form.ThrottleRetries,
    states.data.form.Quota,
    states.data.form.QuotaRenewalRate,
  ]);

  const handlerateclick = (event: any) => {
    event.preventDefault();
    validateForm(event);
    let fieldValue;
    const fieldName = event.target.getAttribute("name");
    if (fieldName === "quota_renews") {
      switch (event.target.value) {
        case "1 hour":
          fieldValue = 3600;
          console.log(fieldValue);
          break;
        case "6 hour":
          fieldValue = 21_600;
          break;
        case "12 hour":
          fieldValue = 43_200;
          break;
        case "1 week":
          fieldValue = 604_800;
          break;
        case "1 months":
          fieldValue = 2.628e6;
          break;
        case "6 months":
          fieldValue = 1.577e7;
          break;
        case "12 months":
          fieldValue = 3.154e7;
          break;
      }
    } else {
      fieldValue = event.target.value;
    }

    switch (fieldName) {
      case "rate":
        props.current === "policy"
          ? dispatch(setForm({ ...state.data.form, Rate: fieldValue }))
          : dispatch(setForms({ ...states.data.form, Rate: fieldValue }));
        break;
      case "per":
        props.current === "policy"
          ? dispatch(setForm({ ...state.data.form, Per: fieldValue }))
          : dispatch(setForms({ ...states.data.form, Per: fieldValue }));
        break;
      case "throttle_retry_limit":
        props.current === "policy"
          ? dispatch(
              setForm({ ...state.data.form, ThrottleRetries: fieldValue })
            )
          : dispatch(
              setForms({ ...states.data.form, ThrottleRetries: fieldValue })
            );
        break;
      case "throttle_interval":
        props.current === "policy"
          ? dispatch(
              setForm({ ...state.data.form, ThrottleInterval: fieldValue })
            )
          : dispatch(
              setForms({ ...states.data.form, ThrottleInterval: fieldValue })
            );
        break;
      case "quota_max":
        props.current === "policy"
          ? dispatch(setForm({ ...state.data.form, MaxQuota: fieldValue }))
          : dispatch(setForms({ ...states.data.form, Quota: fieldValue }));
        break;
      case "quota_renews":
        props.current === "policy"
          ? dispatch(setForm({ ...state.data.form, QuotaRate: fieldValue }))
          : dispatch(
              setForms({ ...states.data.form, QuotaRenewalRate: fieldValue })
            );
        break;
    }
  };

  useEffect(() => {
    function setRateValue() {
      if (rate === true) {
        if (props.current === "policy") {
          dispatch(
            setForm({
              ...state.data.form,
              Rate: -1,
              Per: -1,
            })
          );
          perapi = {
            ...perapi,
            Rate: "",
            Per: "",
          };
          dispatch(
            setFormError({
              ...state.data.errors,
              GlobalLimit: perapi,
            })
          );
        } else {
          dispatch(
            setForms({
              ...states.data.form,
              Rate: -1,
              Per: -1,
            })
          );
          perapi = {
            ...perapi,
            Rate: "",
            Per: "",
          };
          dispatch(
            setFormErrors({
              ...states.data.errors,
              GlobalLimit: perapi,
            })
          );
        }
      } else {
        if (props.current === "policy") {
          dispatch(
            setForm({
              ...state.data.form,
              Rate:
                id === undefined
                  ? 0
                  : policystate === undefined
                  ? 0
                  : policystate.data.form.Rate === -1
                  ? 0
                  : policystate.data.form.Rate,
              Per:
                id === undefined
                  ? 0
                  : policystate === undefined
                  ? 0
                  : policystate.data.form.Per === -1
                  ? 0
                  : policystate.data.form.Per,
            })
          );
        } else {
          dispatch(
            setForms({
              ...states.data.form,
              Rate:
                id === undefined
                  ? 0
                  : keystate === undefined
                  ? 0
                  : keystate.data.form.Rate === -1
                  ? 0
                  : keystate.data.form.Rate,
              Per:
                id === undefined
                  ? 0
                  : keystate === undefined
                  ? 0
                  : keystate.data.form.Per === -1
                  ? 0
                  : keystate.data.form.Per,
            })
          );
        }
      }
    }
    setRateValue();
  }, [rate]);

  useEffect(() => {
    function setThrottleValue() {
      if (throttle === true) {
        if (props.current === "policy") {
          dispatch(
            setForm({
              ...state.data.form,
              ThrottleInterval: -1,
              ThrottleRetries: -1,
            })
          );
          perapi = {
            ...perapi,
            ThrottleRetries: "",
            ThrottleInterval: "",
          };
          dispatch(
            setFormError({
              ...state.data.errors,
              GlobalLimit: perapi,
            })
          );
        } else {
          dispatch(
            setForms({
              ...states.data.form,
              ThrottleInterval: -1,
              ThrottleRetries: -1,
            })
          );
          perapi = {
            ...perapi,
            ThrottleRetries: "",
            ThrottleInterval: "",
          };
          dispatch(
            setFormErrors({
              ...states.data.errors,
              GlobalLimit: perapi,
            })
          );
        }
      } else {
        props.current === "policy"
          ? dispatch(
              setForm({
                ...state.data.form,
                ThrottleInterval:
                  id === undefined
                    ? 0
                    : policystate === undefined
                    ? 0
                    : policystate.data.form.ThrottleInterval === -1
                    ? 0
                    : policystate.data.form.ThrottleInterval,
                ThrottleRetries:
                  id === undefined
                    ? 0
                    : policystate === undefined
                    ? 0
                    : policystate.data.form.ThrottleRetries === -1
                    ? 0
                    : policystate.data.form.ThrottleRetries,
              })
            )
          : dispatch(
              setForms({
                ...states.data.form,
                ThrottleInterval:
                  id === undefined
                    ? 0
                    : keystate === undefined
                    ? 0
                    : keystate.data.form.ThrottleInterval === -1
                    ? 0
                    : keystate.data.form.ThrottleInterval,
                ThrottleRetries:
                  id === undefined
                    ? 0
                    : keystate === undefined
                    ? 0
                    : keystate.data.form.ThrottleRetries === -1
                    ? 0
                    : keystate.data.form.ThrottleRetries,
              })
            );
      }
    }
    setThrottleValue();
  }, [throttle]);

  useEffect(() => {
    function setQuotaValue() {
      if (quota === true) {
        if (props.current === "policy") {
          dispatch(
            setForm({
              ...state.data.form,
              MaxQuota: -1,
              QuotaRate: -1,
            })
          );
          perapi = {
            ...perapi,
            Quota: "",
          };
          dispatch(
            setFormError({
              ...state.data.errors,
              GlobalLimit: perapi,
            })
          );
        } else {
          dispatch(
            setForms({
              ...states.data.form,
              Quota: -1,
              QuotaRenewalRate: -1,
            })
          );
          perapi = {
            ...perapi,
            Quota: "",
          };
          dispatch(
            setFormErrors({
              ...states.data.errors,
              GlobalLimit: perapi,
            })
          );
        }
      } else {
        props.current === "policy"
          ? dispatch(
              setForm({
                ...state.data.form,
                MaxQuota:
                  id === undefined
                    ? 0
                    : policystate === undefined
                    ? 0
                    : policystate.data.form.MaxQuota === -1
                    ? 0
                    : policystate.data.form.MaxQuota,
                QuotaRate:
                  id === undefined
                    ? 0
                    : policystate === undefined
                    ? 0
                    : policystate.data.form.QuotaRate === -1
                    ? 0
                    : policystate.data.form.QuotaRate,
              })
            )
          : dispatch(
              setForms({
                ...states.data.form,
                Quota:
                  id === undefined
                    ? 0
                    : keystate === undefined
                    ? 0
                    : keystate.data.form.Quota === -1
                    ? 0
                    : keystate.data.form.Quota,
                QuotaRenewalRate:
                  id === undefined
                    ? 0
                    : keystate === undefined
                    ? 0
                    : keystate.data.form.QuotaRenewalRate === -1
                    ? 0
                    : keystate.data.form.QuotaRenewalRate,
              })
            );
      }
    }
    setQuotaValue();
  }, [quota]);
  return (
    <>
      {state.loading === false ? (
        <div className="card">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Global Limits and Quota</Accordion.Header>

              <Accordion.Body>
                <Row>
                  <Col md="4">
                    {props.current === "globalKey-applyPolicy" ? (
                      <Form.Group className="mb-3">
                        <Form.Label className="mt-2">
                          <b>Rate Limiting</b>
                        </Form.Label>
                        <div
                          className="mr-4 pt-3 pb-3 mt-2 border border-4 rounded-4 pl-2"
                          style={{ background: "#ADD8E6" }} // #96DED1
                        >
                          Rate Limit {props.message}
                        </div>
                      </Form.Group>
                    ) : (
                      <Form.Group className="mb-3">
                        <Form.Label className="mt-2">
                          <b>Rate Limiting</b>
                        </Form.Label>
                        <Form.Check
                          type="switch"
                          id="disableGlobalRate"
                          name="GlobalLimit.IsDisabled"
                          label="Disable rate limiting"
                          checked={rate}
                          className="ml-4"
                          onChange={(e: any) => setRate(e.target.checked)}
                        />
                        <Form.Label className="mt-3">Rate</Form.Label>
                        <br />

                        <Form.Control
                          className="mt-2"
                          type="text"
                          id="rate"
                          placeholder="Enter Request per period"
                          // onChange={(e: any) => validateForm(e)}
                          onChange={(e: any) => handlerateclick(e)}
                          name="rate"
                          value={
                            props.current === "policy"
                              ? state.data.form.Rate === -1
                                ? "Unlimited"
                                : state.data.form.Rate
                              : states.data.form.Rate === -1
                              ? "Unlimited"
                              : states.data.form.Rate
                          }
                          isInvalid={
                            props.current === "policy"
                              ? !!state.data.errors?.GlobalLimit.Rate!
                              : !!states.data.errors?.GlobalLimit.Rate!
                          }
                          isValid={
                            props.current === "policy"
                              ? !state.data.errors?.GlobalLimit.Rate!
                              : !states.data.errors?.GlobalLimit.Rate!
                          }
                          disabled={rate}
                        />
                        <Form.Control.Feedback type="invalid">
                          {" "}
                          {props.current === "policy"
                            ? state.data.errors?.GlobalLimit.Rate
                            : states.data.errors?.GlobalLimit.Rate!}
                        </Form.Control.Feedback>
                        <Form.Label className="mt-3">Per (Seconds)</Form.Label>
                        <br />
                        <Form.Control
                          className="mt-2"
                          type="text"
                          id="per"
                          placeholder="Enter time"
                          onChange={(e: any) => handlerateclick(e)}
                          name="per"
                          value={
                            props.current === "policy"
                              ? state.data.form.Per === -1
                                ? "Unlimited"
                                : state.data.form.Per
                              : states.data.form.Per === -1
                              ? "Unlimited"
                              : states.data.form.Per
                          }
                          isInvalid={
                            props.current === "policy"
                              ? !!state.data.errors?.GlobalLimit.Per
                              : !!states.data.errors?.GlobalLimit.Per!
                          }
                          isValid={
                            props.current === "policy"
                              ? !state.data.errors?.GlobalLimit.Per
                              : !states.data.errors?.GlobalLimit.Per!
                          }
                          disabled={rate}
                        />
                        <Form.Control.Feedback type="invalid">
                          {props.current === "policy"
                            ? state.data.errors?.GlobalLimit.Per
                            : states.data.errors?.GlobalLimit.Per!}
                        </Form.Control.Feedback>
                      </Form.Group>
                    )}
                  </Col>
                  <Col md="4">
                    {props.current === "globalKey-applyPolicy" ? (
                      <Form.Group className="mb-3">
                        <Form.Label className="mt-2">
                          <b>Throttling</b>
                        </Form.Label>
                        <div
                          className="mr-4 pt-3 pb-3 mt-2 border border-4 rounded-4 pl-2 "
                          style={{ background: "#ADD8E6" }}
                        >
                          Throttling {props.message}
                        </div>
                      </Form.Group>
                    ) : (
                      <Form.Group className="mb-3">
                        <Form.Label className="mt-2">
                          <b>Throttling</b>
                        </Form.Label>
                        <Form.Check
                          type="switch"
                          id="disableThrottling"
                          name="Throttling.IsDisabled"
                          label="Disable Throttling"
                          checked={throttle}
                          className="ml-4"
                          onChange={(e: any) => setThrottle(e.target.checked)}
                        />
                        <Form.Label className="mt-3">
                          Throttle retry limit
                        </Form.Label>
                        <br />
                        <Form.Control
                          className="mt-2"
                          type="text"
                          id="retry"
                          // placeholder={throttleRetry}
                          name="throttle_retry_limit"
                          value={
                            props.current === "policy"
                              ? state.data.form.ThrottleRetries === -1
                                ? "Disabled Throttling"
                                : state.data.form.ThrottleRetries
                              : states.data.form.ThrottleRetries === -1
                              ? "Disabled Throttling"
                              : states.data.form.ThrottleRetries
                          }
                          onChange={(e: any) => handlerateclick(e)}
                          // value={throttleDefault}
                          isInvalid={
                            props.current === "policy"
                              ? !!state.data.errors?.GlobalLimit.ThrottleRetries
                              : !!states.data.errors?.GlobalLimit
                                  .ThrottleRetries
                          }
                          isValid={
                            props.current === "policy"
                              ? !state.data.errors?.GlobalLimit.ThrottleRetries
                              : !states.data.errors?.GlobalLimit.ThrottleRetries
                          }
                          disabled={throttle}
                        />
                        <Form.Control.Feedback type="invalid">
                          {props.current === "policy"
                            ? state.data.errors?.GlobalLimit.ThrottleRetries
                            : states.data.errors?.GlobalLimit.ThrottleRetries}
                        </Form.Control.Feedback>
                        <Form.Label className="mt-3">
                          Throttle interval
                        </Form.Label>
                        <br />
                        <Form.Control
                          className="mt-2"
                          type="text"
                          id="interval"
                          name="throttle_interval"
                          value={
                            props.current === "policy"
                              ? state.data.form.ThrottleInterval === -1
                                ? "Disabled Throttling"
                                : state.data.form.ThrottleInterval
                              : states.data.form.ThrottleInterval === -1
                              ? "Disabled Throttling"
                              : states.data.form.ThrottleInterval
                          }
                          // placeholder={throttleInterval}
                          onChange={(e: any) => handlerateclick(e)}
                          isInvalid={
                            props.current === "policy"
                              ? !!state.data.errors?.GlobalLimit
                                  .ThrottleInterval
                              : !!states.data.errors?.GlobalLimit
                                  .ThrottleInterval
                          }
                          isValid={
                            props.current === "policy"
                              ? !state.data.errors?.GlobalLimit.ThrottleInterval
                              : !states.data.errors?.GlobalLimit
                                  .ThrottleInterval
                          }
                          disabled={throttle}
                        />
                        <Form.Control.Feedback type="invalid">
                          {props.current === "policy"
                            ? state.data.errors?.GlobalLimit.ThrottleInterval
                            : states.data.errors?.GlobalLimit.ThrottleInterval}
                        </Form.Control.Feedback>
                      </Form.Group>
                    )}
                  </Col>
                  <Col md="4">
                    {props.current === "globalKey-applyPolicy" ? (
                      <Form.Group className="mb-3">
                        <Form.Label className="mt-2">
                          <b>Usage Quota</b>
                        </Form.Label>
                        <div
                          className="mr-4 pt-3 pb-3 mt-2 border border-4 rounded-4 pl-2"
                          style={{ background: "#ADD8E6" }}
                        >
                          Usage Quota {props.message}
                        </div>
                      </Form.Group>
                    ) : (
                      <Form.Group className="mb-3">
                        <Form.Label className="mt-2">
                          <b>Usage Quota</b>
                        </Form.Label>
                        <Form.Check
                          type="switch"
                          id="unlimitedRequests"
                          name="unlimitedRequests.IsDisabled"
                          label="Unlimited requests"
                          checked={quota}
                          className="ml-4"
                          onChange={(e: any) => setQuota(e.target.checked)}
                        />
                        <Form.Label className="mt-3">
                          Max requests per period
                        </Form.Label>
                        <br />
                        <Form.Control
                          className="mt-2"
                          type="text"
                          id="quotaPer"
                          // placeholder={quotaPerPeriod}
                          onChange={(e: any) => handlerateclick(e)}
                          name="quota_max"
                          value={
                            props.current === "policy"
                              ? state.data.form.QuotaRate === -1
                                ? "Unlimited"
                                : state.data.form.MaxQuota
                              : states.data.form.QuotaRenewalRate === -1
                              ? "Unlimited"
                              : states.data.form.Quota
                          }
                          isInvalid={
                            props.current === "policy"
                              ? !!state.data.errors?.GlobalLimit.Quota
                              : !!states.data.errors?.GlobalLimit.Quota
                          }
                          isValid={
                            props.current === "policy"
                              ? !state.data.errors?.GlobalLimit.Quota
                              : !states.data.errors?.GlobalLimit.Quota
                          }
                          disabled={quota}
                        />
                        <Form.Control.Feedback type="invalid">
                          {" "}
                          {props.current === "policy"
                            ? state.data.errors?.GlobalLimit.Quota
                            : states.data.errors?.GlobalLimit.Quota}
                        </Form.Control.Feedback>
                        <Form.Label className="mt-3">
                          Quota resets every
                        </Form.Label>
                        <Form.Select
                          className="mt-2"
                          style={{ height: 46 }}
                          disabled={quota}
                          name="quota_renews"
                          onChange={(e: any) => handlerateclick(e)}
                        >
                          <option>never</option>
                          <option>1 hour</option>
                          <option>6 hour</option>
                          <option>12 hour</option>
                          <option>1 week</option>
                          <option>1 month</option>
                          <option>6 months</option>
                          <option>12 months</option>
                        </Form.Select>
                      </Form.Group>
                    )}
                  </Col>
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
