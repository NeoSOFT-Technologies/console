import React, { useState } from "react";
import { Accordion, Col, Form, Row } from "react-bootstrap";
import Spinner from "../../../../../components/loader/Loader";
import { regexForNumber } from "../../../../../resources/gateway/api/api-constants";
import { IKeyCreateState } from "../../../../../store/features/gateway/key/create";
import {
  setFormErrors,
  setForms,
} from "../../../../../store/features/gateway/key/create/slice";
import { IPolicyCreateState } from "../../../../../store/features/gateway/policy/create";
import {
  setForm,
  setFormError,
} from "../../../../../store/features/gateway/policy/create/slice";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";

interface IProps {
  state?: IPolicyCreateState;
  keystate?: IKeyCreateState;
  index?: number;
  current: string;
}

export default function GlobalLimitApi(props: IProps) {
  const dispatch = useAppDispatch();
  const states = useAppSelector((RootState) => RootState.createKeyState);
  const state: IPolicyCreateState = useAppSelector(
    (RootStates) => RootStates.createPolicyState
  );

  function validateForm(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    switch (name) {
      case "rate":
        props.current === "policy"
          ? dispatch(
              setFormError({
                ...state.data.errors,
                Rate: regexForNumber.test(value) ? "" : "Enter only Numbers",
              })
            )
          : dispatch(
              setFormErrors({
                ...states.data.errors,
                Rate: regexForNumber.test(value) ? "" : "Enter only Numbers",
              })
            );
        break;
      case "per":
        props.current === "policy"
          ? dispatch(
              setFormError({
                ...state.data.errors,
                Per: regexForNumber.test(value) ? "" : "Enter only Numbers",
              })
            )
          : dispatch(
              setFormErrors({
                ...states.data.errors,
                Per: regexForNumber.test(value) ? "" : "Enter only Numbers",
              })
            );
        break;
      case "throttle_retry_limit":
        props.current === "policy"
          ? dispatch(
              setFormError({
                ...state.data.errors,
                ThrottleRetries: regexForNumber.test(value)
                  ? ""
                  : "Enter only Numbers",
              })
            )
          : dispatch(
              setFormErrors({
                ...states.data.errors,
                ThrottleRetries: regexForNumber.test(value)
                  ? ""
                  : "Enter only Numbers",
              })
            );
        break;
      case "throttle_interval":
        props.current === "policy"
          ? dispatch(
              setFormError({
                ...state.data.errors,
                ThrottleInterval: regexForNumber.test(value)
                  ? ""
                  : "Enter only Numbers",
              })
            )
          : dispatch(
              setFormErrors({
                ...states.data.errors,
                ThrottleInterval: regexForNumber.test(value)
                  ? ""
                  : "Enter only Numbers",
              })
            );
        break;
      case "quota_max":
        props.current === "policy"
          ? dispatch(
              setFormError({
                ...state.data.errors,
                Quota: regexForNumber.test(value) ? "" : "Enter only Numbers",
              })
            )
          : dispatch(
              setFormErrors({
                ...states.data.errors,
                Quota: regexForNumber.test(value) ? "" : "Enter only Numbers",
              })
            );
        break;
      default:
        break;
    }
  }

  const [Limits, setLimits] = useState<any>({
    rate: 0,
    per: 0,
    throttle_interval: 0,
    throttle_retry_limit: 0,
    max_query_depth: 0,
    quota_max: 0,
    quota_renews: 0,
    quota_remaining: 0,
    quota_renewal_rate: 0,
    set_by_policy: false,
  });
  const [rate, setRate] = useState(false);
  const [throttle, setThrottle] = useState(true);
  const [quota, setQuota] = useState(true);
  const [throttleRetry, setThrottleRetry] = useState("Disabled throttling");
  const [throttleInterval, setThrottleInterval] = useState(
    "Disabled throttling"
  );
  const [quotaPerPeriod, setQuotaPerPeriod] = useState("Unlimited");

  const handlerateclick = (event: any) => {
    event.preventDefault();
    validateForm(event);
    const value = props.index!;
    let fieldValue;
    const apisList =
      props.current === "policy"
        ? [...props.state?.data.form.APIs!]
        : [...props.keystate?.data.form.AccessRights!];
    const fieldName = event.target.getAttribute("name");
    if (fieldName === "quota_renewal_rate") {
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
    console.log("ye field values -", fieldValue);
    const newFormData: any = { ...Limits };
    newFormData[fieldName] = fieldValue;
    console.log("ye new form data -", newFormData);
    setLimits(newFormData);

    apisList[value] = {
      ...apisList[value],
      Limit: { ...newFormData },
    };
    props.current === "policy"
      ? dispatch(setForm({ ...state.data.form, APIs: apisList }))
      : dispatch(setForms({ ...states.data.form, AccessRights: apisList }));
  };
  console.log("checklimit", state.data.form);
  console.log("checklimit2", states.data.form);

  function handleThrottleChange(evt: any) {
    setThrottle(evt.target.checked);
    if (throttle === false) {
      setThrottleRetry("Disabled throttling");
      setThrottleInterval("Disabled throttling");
    } else {
      setThrottleRetry("Enter retry limit");
      setThrottleInterval("Enter interval");
    }
  }

  function handleQuotaChange(evt: any) {
    setQuota(evt.target.checked);
    if (quota === false) {
      setQuotaPerPeriod("Unlimited");
    } else {
      setQuotaPerPeriod("Enter request per period");
    }
  }

  // function validateForm(event: React.ChangeEvent<HTMLInputElement>) {
  //   const { name, value } = event.target;
  //   setRateValue(event.target.value);
  //   dispatch(setForm({ ...state.data.form, [name]: value }));
  // }
  return (
    <>
      {state.loading === false ? (
        <div className="card">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Global Limits and Quota</Accordion.Header>

              <Accordion.Body>
                <Row>
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
                          // checked={rate}
                          onChange={(e: any) => setRate(e.target.checked)}
                        />
                        <Form.Label className="mt-3">Rate</Form.Label>
                        <br />

                        <Form.Control
                          className="mt-2"
                          type="text"
                          id="rate"
                          value={
                            props.current === "policy"
                              ? state.data.form.APIs[props.index!]?.Limit?.rate
                              : states.data.form.AccessRights[props.index!]
                                  ?.Limit?.Rate
                          }
                          placeholder="Enter Request per period"
                          // onChange={(e: any) => validateForm(e)}
                          onChange={(e: any) => handlerateclick(e)}
                          name="rate"
                          isInvalid={
                            props.current === "policy"
                              ? !!state.data.errors?.Rate
                              : !!states.data.errors?.Rate
                          }
                          isValid={
                            props.current === "policy"
                              ? !state.data.errors?.Rate
                              : !states.data.errors?.Rate
                          }
                          disabled={rate}
                        />
                        <Form.Control.Feedback type="invalid">
                          {" "}
                          {props.current === "policy"
                            ? state.data.errors?.Rate
                            : states.data.errors?.Rate}
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
                              ? state.data.form.APIs[props.index!]?.Limit?.per
                              : states.data.form.AccessRights[props.index!]
                                  ?.Limit?.Per
                          }
                          isInvalid={
                            props.current === "policy"
                              ? !!state.data.errors?.Per
                              : !!states.data.errors?.Per
                          }
                          isValid={
                            props.current === "policy"
                              ? !state.data.errors?.Per
                              : !states.data.errors?.Per
                          }
                          disabled={rate}
                        />
                        <Form.Control.Feedback type="invalid">
                          {props.current === "policy"
                            ? state.data.errors?.Per
                            : states.data.errors?.Per}
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
                          checked={throttle}
                          onChange={(e: any) => handleThrottleChange(e)}
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
                              ? state.data.form.APIs[props.index!]?.Limit
                                  ?.throttle_retry_limit
                              : states.data.form.AccessRights[props.index!]
                                  ?.Limit?.Throttle_retry_limit
                          }
                          placeholder={throttleRetry}
                          name="throttle_retry_limit"
                          onChange={(e: any) => handlerateclick(e)}
                          // value={throttleDefault}
                          isInvalid={
                            props.current === "policy"
                              ? !!state.data.errors?.ThrottleRetries
                              : !!states.data.errors?.ThrottleRetries
                          }
                          isValid={
                            props.current === "policy"
                              ? !state.data.errors?.ThrottleRetries
                              : !states.data.errors?.ThrottleRetries
                          }
                          disabled={throttle}
                        />
                        <Form.Control.Feedback type="invalid">
                          {props.current === "policy"
                            ? state.data.errors?.ThrottleRetries
                            : states.data.errors?.ThrottleRetries}
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
                              ? state.data.form.APIs[props.index!]?.Limit
                                  ?.throttle_interval
                              : states.data.form.AccessRights[props.index!]
                                  ?.Limit?.Throttle_interval
                          }
                          placeholder={throttleInterval}
                          onChange={(e: any) => handlerateclick(e)}
                          isInvalid={
                            props.current === "policy"
                              ? !!state.data.errors?.ThrottleInterval
                              : !!states.data.errors?.ThrottleInterval
                          }
                          isValid={
                            props.current === "policy"
                              ? !state.data.errors?.ThrottleInterval
                              : !states.data.errors?.ThrottleInterval
                          }
                          disabled={throttle}
                        />
                        <Form.Control.Feedback type="invalid">
                          {props.current === "policy"
                            ? state.data.errors?.ThrottleInterval
                            : states.data.errors?.ThrottleInterval}
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
                          checked={quota}
                          onChange={(e: any) => handleQuotaChange(e)}
                        />
                        <Form.Label className="mt-3">
                          Max requests per period
                        </Form.Label>
                        <br />
                        <Form.Control
                          className="mt-2"
                          type="text"
                          id="quotaPer"
                          placeholder={quotaPerPeriod}
                          onChange={(e: any) => handlerateclick(e)}
                          name="quota_max"
                          value={
                            props.current === "policy"
                              ? state.data.form.APIs[props.index!]?.Limit
                                  ?.quota_max
                              : states.data.form.AccessRights[props.index!]
                                  ?.Limit?.Quota_max
                          }
                          isInvalid={
                            props.current === "policy"
                              ? !!state.data.errors?.Quota
                              : !!states.data.errors?.Quota
                          }
                          isValid={
                            props.current === "policy"
                              ? !state.data.errors?.Quota
                              : !states.data.errors?.Quota
                          }
                          disabled={quota}
                        />
                        <Form.Control.Feedback type="invalid">
                          {" "}
                          {props.current === "policy"
                            ? state.data.errors?.Quota
                            : states.data.errors?.Quota}
                        </Form.Control.Feedback>
                        <Form.Label className="mt-3">
                          Quota resets every
                        </Form.Label>
                        <Form.Select
                          className="mt-2"
                          style={{ height: 46 }}
                          disabled={quota}
                          name="quota_renewal_rate"
                          value={
                            props.current === "policy"
                              ? state.data.form.APIs[props.index!]?.Limit
                                  ?.quota_renews
                              : states.data.form.AccessRights[props.index!]
                                  ?.Limit?.Quota_renews
                          }
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
