import React, { useState, useEffect } from "react";
import { Accordion, Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Spinner from "../../../../../components/loader/Loader";
import { regexForNumber } from "../../../../../resources/gateway/api/api-constants";
import { IKeyCreateState } from "../../../../../store/features/gateway/key/create";

import {
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
}

export default function GlobalLimitApi(props: IProps) {
  const dispatch = useAppDispatch();
  const states = useAppSelector((RootState) => RootState.createKeyState);
  const state: IPolicyCreateState = useAppSelector(
    (RootStates) => RootStates.createPolicyState
  );

  const { id } = useParams();
  const perapi = [...props.state?.data.errors?.PerApiLimit!];
  function validateForm(
    event: React.ChangeEvent<HTMLInputElement>,
    ApiId: any
  ) {
    const { name, value } = event.target;
    switch (name) {
      case "rate":
        perapi[props.index!] = {
          ...perapi[props.index!],
          Rate: regexForNumber.test(value) ? "" : "Enter only Numbers",
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
                Rate: regexForNumber.test(value) ? "" : "Enter only Numbers",
              })
            );

        break;
      case "per":
        perapi[props.index!] = {
          ...perapi[props.index!],
          Per: regexForNumber.test(value) ? "" : "Enter only Numbers",
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
                Per: regexForNumber.test(value) ? "" : "Enter only Numbers",
              })
            );
        break;
      case "throttle_retry_limit":
        perapi[props.index!] = {
          ...perapi[props.index!],
          ThrottleRetries: regexForNumber.test(value)
            ? ""
            : "Enter only Numbers",
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
                ThrottleRetries: regexForNumber.test(value)
                  ? ""
                  : "Enter only Numbers",
              })
            );
        break;
      case "throttle_interval":
        perapi[props.index!] = {
          ...perapi[props.index!],
          ThrottleInterval: regexForNumber.test(value)
            ? ""
            : "Enter only Numbers",
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
                ThrottleInterval: regexForNumber.test(value)
                  ? ""
                  : "Enter only Numbers",
              })
            );
        break;
      case "quota_max":
        perapi[props.index!] = {
          ...perapi[props.index!],
          Quota: regexForNumber.test(value) ? "" : "Enter only Numbers",
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
                Quota: regexForNumber.test(value) ? "" : "Enter only Numbers",
              })
            );
        break;
      default:
        break;
    }
  }

  const [rateError, setRateError] = useState<boolean[]>([]);
  const [throttleError, setThrottleError] = useState<boolean[]>([]);
  const [quotaError, setQuotaError] = useState<boolean[]>([]);
  const len =
    props.current === "policy"
      ? props.state?.data.form.APIs?.length
      : props.keystate?.data.form.AccessRights?.length;

  function EffectSetRateError() {
    for (let i = 0; i <= len!; i++) {
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
  function handleSetRateError() {
    const rates = [...rateError];
    if (rates[props.index!] === true) {
      rates[props.index!] = false;
    } else {
      rates[props.index!] = true;
    }
    setRateError(rates);
  }

  function handleSetThrottleError() {
    const throttle = [...throttleError];
    if (throttle[props.index!] === true) {
      throttle[props.index!] = false;
    } else {
      throttle[props.index!] = true;
    }
    setThrottleError(throttle);
  }

  function handleSetQuotasError() {
    const quotas = [...quotaError];
    if (quotas[props.index!] === true) {
      quotas[props.index!] = false;
    } else {
      quotas[props.index!] = true;
    }
    setQuotaError(quotas);
  }

  useEffect(() => {
    EffectSetRateError();
  }, []);
  useEffect(() => {
    function setRateValue() {
      if (rateError[props.index!] === true) {
        if (props.current === "policy") {
          const apisList = [...props.state?.data.form.APIs!];
          apisList[props.index!] = {
            ...apisList[props.index!],
            Limit: {
              rate: -1,
              per: -1,
              throttle_interval:
                props.state?.data.form.APIs[props.index!].Limit
                  ?.throttle_interval,
              throttle_retry_limit:
                props.state?.data.form.APIs[props.index!].Limit
                  ?.throttle_retry_limit,
              max_query_depth:
                props.state?.data.form.APIs[props.index!].Limit
                  ?.max_query_depth,
              quota_max:
                props.state?.data.form.APIs[props.index!].Limit?.quota_max,
              quota_renews:
                props.state?.data.form.APIs[props.index!].Limit?.quota_renews,
              quota_remaining:
                props.state?.data.form.APIs[props.index!].Limit
                  ?.quota_remaining,
              quota_renewal_rate:
                props.state?.data.form.APIs[props.index!].Limit
                  ?.quota_renewal_rate,
              set_by_policy:
                props.state?.data.form.APIs[props.index!].Limit?.set_by_policy!,
            },
          };
          dispatch(
            setForm({
              ...state.data.form,
              APIs: apisList,
            })
          );
          perapi[props.index!] = {
            ...perapi[props.index!],
            Rate: "",
            Per: "",
          };
          dispatch(
            setFormError({
              ...state.data.errors,
              PerApiLimit: perapi,
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
        }
      } else {
        if (props.current === "policy") {
          const apisList = [...props.state?.data.form.APIs!];
          console.log(
            "ratecheck",
            props.state?.data.form.APIs[props.index!].Limit?.rate
          );
          apisList[props.index!] = {
            ...apisList[props.index!],
            Limit: {
              rate:
                id === undefined
                  ? 0
                  : policystate.data.form.APIs[props.index!].Limit?.rate,
              per:
                id === undefined
                  ? 0
                  : policystate.data.form.APIs[props.index!].Limit?.per!,
              throttle_interval:
                props.state?.data.form.APIs[props.index!].Limit
                  ?.throttle_interval,
              throttle_retry_limit:
                props.state?.data.form.APIs[props.index!].Limit
                  ?.throttle_retry_limit,
              max_query_depth:
                props.state?.data.form.APIs[props.index!].Limit
                  ?.max_query_depth,
              quota_max:
                props.state?.data.form.APIs[props.index!].Limit?.quota_max,
              quota_renews:
                props.state?.data.form.APIs[props.index!].Limit?.quota_renews,
              quota_remaining:
                props.state?.data.form.APIs[props.index!].Limit
                  ?.quota_remaining,
              quota_renewal_rate:
                props.state?.data.form.APIs[props.index!].Limit
                  ?.quota_renewal_rate,
              set_by_policy:
                props.state?.data.form.APIs[props.index!].Limit?.set_by_policy!,
            },
          };
          dispatch(
            setForm({
              ...state.data.form,
              APIs: apisList,
            })
          );
        } else {
          dispatch(
            setForms({
              ...states.data.form,
              Rate: 0,
              Per: 0,
            })
          );
        }
      }
    }
    setRateValue();
  }, [rateError]);

  useEffect(() => {
    function setThrottleValue() {
      if (throttleError[props.index!] === true) {
        if (props.current === "policy") {
          const apisList = [...props.state?.data.form.APIs!];
          apisList[props.index!] = {
            ...apisList[props.index!],
            Limit: {
              rate: props.state?.data.form.APIs[props.index!].Limit?.rate,
              per: props.state?.data.form.APIs[props.index!].Limit?.per!,
              throttle_interval: -1,
              throttle_retry_limit: -1,
              max_query_depth:
                props.state?.data.form.APIs[props.index!].Limit
                  ?.max_query_depth,
              quota_max:
                props.state?.data.form.APIs[props.index!].Limit?.quota_max,
              quota_renews:
                props.state?.data.form.APIs[props.index!].Limit?.quota_renews,
              quota_remaining:
                props.state?.data.form.APIs[props.index!].Limit
                  ?.quota_remaining,
              quota_renewal_rate:
                props.state?.data.form.APIs[props.index!].Limit
                  ?.quota_renewal_rate,
              set_by_policy:
                props.state?.data.form.APIs[props.index!].Limit?.set_by_policy!,
            },
          };
          dispatch(
            setForm({
              ...state.data.form,
              APIs: apisList,
            })
          );
          perapi[props.index!] = {
            ...perapi[props.index!],
            ThrottleRetries: "",
            ThrottleInterval: "",
          };
          dispatch(
            setFormError({
              ...state.data.errors,
              PerApiLimit: perapi,
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
        }
      } else {
        if (props.current === "policy") {
          const apisList = [...props.state?.data.form.APIs!];

          apisList[props.index!] = {
            ...apisList[props.index!],
            Limit: {
              rate: props.state?.data.form.APIs[props.index!].Limit?.rate,
              per: props.state?.data.form.APIs[props.index!].Limit?.per!,
              throttle_interval:
                id === undefined
                  ? 0
                  : policystate.data.form.APIs[props.index!].Limit
                      ?.throttle_interval,
              throttle_retry_limit:
                id === undefined
                  ? 0
                  : policystate.data.form.APIs[props.index!].Limit
                      ?.throttle_retry_limit,
              max_query_depth:
                props.state?.data.form.APIs[props.index!].Limit
                  ?.max_query_depth,
              quota_max:
                props.state?.data.form.APIs[props.index!].Limit?.quota_max,
              quota_renews:
                props.state?.data.form.APIs[props.index!].Limit?.quota_renews,
              quota_remaining:
                props.state?.data.form.APIs[props.index!].Limit
                  ?.quota_remaining,
              quota_renewal_rate:
                props.state?.data.form.APIs[props.index!].Limit
                  ?.quota_renewal_rate,
              set_by_policy:
                props.state?.data.form.APIs[props.index!].Limit?.set_by_policy!,
            },
          };
          dispatch(
            setForm({
              ...state.data.form,
              APIs: apisList,
            })
          );
        } else {
          dispatch(
            setForms({
              ...states.data.form,
              Rate: 0,
              Per: 0,
            })
          );
        }
      }
    }
    setThrottleValue();
  }, [throttleError]);

  useEffect(() => {
    function setQuotaValue() {
      if (quotaError[props.index!] === true) {
        if (props.current === "policy") {
          const apisList = [...props.state?.data.form.APIs!];
          apisList[props.index!] = {
            ...apisList[props.index!],
            Limit: {
              rate: props.state?.data.form.APIs[props.index!].Limit?.rate,
              per: props.state?.data.form.APIs[props.index!].Limit?.per!,
              throttle_interval:
                props.state?.data.form.APIs[props.index!].Limit
                  ?.throttle_interval,
              throttle_retry_limit:
                props.state?.data.form.APIs[props.index!].Limit
                  ?.throttle_retry_limit,
              max_query_depth:
                props.state?.data.form.APIs[props.index!].Limit
                  ?.max_query_depth,
              quota_max: -1,
              quota_renews:
                props.state?.data.form.APIs[props.index!].Limit?.quota_renews,
              quota_remaining:
                props.state?.data.form.APIs[props.index!].Limit
                  ?.quota_remaining,
              quota_renewal_rate: -1,
              set_by_policy:
                props.state?.data.form.APIs[props.index!].Limit?.set_by_policy!,
            },
          };
          dispatch(
            setForm({
              ...state.data.form,
              APIs: apisList,
            })
          );
          // perapi[props.index!] = {
          //   ...perapi[props.index!],
          //   Quota: "",
          // };

          // dispatch(
          //   setFormError({
          //     ...state.data.errors,
          //     PerApiLimit: perapi,
          //   })
          // );
        } else {
          dispatch(
            setForms({
              ...states.data.form,
              Rate: -1,
              Per: -1,
            })
          );
        }
      } else {
        if (props.current === "policy") {
          const apisList = [...props.state?.data.form.APIs!];
          console.log(
            "ratecheck",
            props.state?.data.form.APIs[props.index!].Limit?.rate
          );
          apisList[props.index!] = {
            ...apisList[props.index!],
            Limit: {
              rate: props.state?.data.form.APIs[props.index!].Limit?.rate,
              per: props.state?.data.form.APIs[props.index!].Limit?.per!,
              throttle_interval:
                props.state?.data.form.APIs[props.index!].Limit
                  ?.throttle_interval,
              throttle_retry_limit:
                props.state?.data.form.APIs[props.index!].Limit
                  ?.throttle_retry_limit,
              max_query_depth:
                props.state?.data.form.APIs[props.index!].Limit
                  ?.max_query_depth,
              quota_max:
                id === undefined
                  ? 0
                  : policystate.data.form.APIs[props.index!].Limit?.quota_max,
              quota_renews:
                props.state?.data.form.APIs[props.index!].Limit?.quota_renews,
              quota_remaining:
                props.state?.data.form.APIs[props.index!].Limit
                  ?.quota_remaining,
              quota_renewal_rate:
                id === undefined
                  ? 0
                  : policystate.data.form.APIs[props.index!].Limit
                      ?.quota_renewal_rate,
              set_by_policy:
                props.state?.data.form.APIs[props.index!].Limit?.set_by_policy!,
            },
          };
          dispatch(
            setForm({
              ...state.data.form,
              APIs: apisList,
            })
          );
        } else {
          dispatch(
            setForms({
              ...states.data.form,
              Rate: 0,
              Per: 0,
            })
          );
        }
      }
    }
    setQuotaValue();
  }, [quotaError]);

  const [Limits, setLimits] = useState<any>({
    rate:
      props.current === "policy"
        ? props.state?.data.form.APIs[props.index!].Limit?.rate
        : props.keystate?.data.form.AccessRights[props.index!].Limit?.Rate,
    per:
      props.current === "policy"
        ? props.state?.data.form.APIs[props.index!].Limit?.per
        : props.keystate?.data.form.AccessRights[props.index!].Limit?.Per,
    throttle_interval:
      props.current === "policy"
        ? props.state?.data.form.APIs[props.index!].Limit?.throttle_interval
        : props.keystate?.data.form.AccessRights[props.index!].Limit
            ?.Throttle_interval,
    throttle_retry_limit:
      props.current === "policy"
        ? props.state?.data.form.APIs[props.index!].Limit?.throttle_retry_limit
        : props.keystate?.data.form.AccessRights[props.index!].Limit
            ?.Throttle_retry_limit,
    max_query_depth: 0,
    quota_max:
      props.current === "policy"
        ? props.state?.data.form.APIs[props.index!].Limit?.quota_max
        : props.keystate?.data.form.AccessRights[props.index!].Limit?.Quota_max,
    quota_renews:
      props.current === "policy"
        ? props.state?.data.form.APIs[props.index!].Limit?.quota_renews
        : props.keystate?.data.form.AccessRights[props.index!].Limit
            ?.Quota_renews,
    quota_remaining: 0,
    quota_renewal_rate: 0,
    set_by_policy: false,
  });

  const handlerateclick = (event: any, ApiId: any) => {
    event.preventDefault();
    validateForm(event, ApiId);
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

    const newFormData: any = { ...Limits };
    newFormData[fieldName] = fieldValue;

    setLimits(newFormData);

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
      {state.loading === false ? (
        <div className="card">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Per Limits and Quota</Accordion.Header>

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
                          className="ml-4"
                          // checked={rate}
                          onChange={() => handleSetRateError()}
                        />
                        <Form.Label className="mt-3">Rate</Form.Label>
                        <br />

                        <Form.Control
                          className="mt-2"
                          type="text"
                          id="rate"
                          required
                          value={
                            props.current === "policy"
                              ? props.state?.data.form.APIs[props.index!]?.Limit
                                  ?.rate === -1
                                ? "Unlimited"
                                : props.state?.data.form.APIs[props.index!]
                                    ?.Limit?.rate
                              : props.keystate?.data.form.AccessRights[
                                  props.index!
                                ]?.Limit?.Rate
                          }
                          placeholder="Enter Request per period"
                          // onChange={(e: any) => validateForm(e)}
                          onChange={(e: any) =>
                            handlerateclick(
                              e,
                              props.state?.data.form.APIs[props.index!].Id
                            )
                          }
                          name="rate"
                          isInvalid={
                            props.current === "policy"
                              ? !!props.state?.data.errors?.PerApiLimit[
                                  props.index!
                                ].Rate
                              : !!states.data.errors?.Rate
                          }
                          isValid={
                            props.current === "policy"
                              ? !props.state?.data.errors?.PerApiLimit[
                                  props.index!
                                ].Rate
                              : !states.data.errors?.Rate
                          }
                          disabled={rateError[props.index!]}
                        />
                        <Form.Control.Feedback type="invalid">
                          {" "}
                          {props.current === "policy"
                            ? props.state?.data.errors?.PerApiLimit[
                                props.index!
                              ].Rate
                            : states.data.errors?.Rate}
                        </Form.Control.Feedback>
                        <Form.Label className="mt-3">Per (Seconds)</Form.Label>
                        <br />
                        <Form.Control
                          className="mt-2"
                          type="text"
                          id="per"
                          placeholder="Enter time"
                          onChange={(e: any) =>
                            handlerateclick(
                              e,
                              props.state?.data.form.APIs[props.index!].Id
                            )
                          }
                          name="per"
                          value={
                            props.current === "policy"
                              ? props.state?.data.form.APIs[props.index!]?.Limit
                                  ?.per === -1
                                ? "Unlimited"
                                : props.state?.data.form.APIs[props.index!]
                                    ?.Limit?.per!
                              : props.keystate?.data.form.AccessRights[
                                  props.index!
                                ]?.Limit?.Per
                          }
                          isInvalid={
                            props.current === "policy"
                              ? !!state.data.errors?.PerApiLimit[props.index!]
                                  .Per
                              : !!states.data.errors?.Per
                          }
                          isValid={
                            props.current === "policy"
                              ? !state.data.errors?.PerApiLimit[props.index!]
                                  .Per
                              : !states.data.errors?.Per
                          }
                          disabled={rateError[props.index!]}
                        />
                        <Form.Control.Feedback type="invalid">
                          {props.current === "policy"
                            ? state.data.errors?.PerApiLimit[props.index!].Per
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
                          checked={throttleError[props.index!]}
                          className="ml-4"
                          onChange={() => handleSetThrottleError()}
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
                                  ?.throttle_retry_limit === -1
                                ? "Unlimited"
                                : props.state?.data.form.APIs[props.index!]
                                    ?.Limit?.throttle_retry_limit
                              : props.keystate?.data.form.AccessRights[
                                  props.index!
                                ]?.Limit?.Throttle_retry_limit
                          }
                          placeholder="Enter per request"
                          name="throttle_retry_limit"
                          onChange={(e: any) =>
                            handlerateclick(
                              e,
                              props.state?.data.form.APIs[props.index!].Id
                            )
                          }
                          // value={throttleDefault}
                          isInvalid={
                            props.current === "policy"
                              ? !!state.data.errors?.PerApiLimit[props.index!]
                                  .ThrottleRetries
                              : !!states.data.errors?.ThrottleRetries
                          }
                          isValid={
                            props.current === "policy"
                              ? !state.data.errors?.PerApiLimit[props.index!]
                                  .ThrottleRetries
                              : !states.data.errors?.ThrottleRetries
                          }
                          disabled={throttleError[props.index!]}
                        />
                        <Form.Control.Feedback type="invalid">
                          {props.current === "policy"
                            ? state.data.errors?.PerApiLimit[props.index!]
                                .ThrottleRetries
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
                              ? props.state?.data.form.APIs[props.index!]?.Limit
                                  ?.throttle_interval === -1
                                ? "Unlimited"
                                : props.state?.data.form.APIs[props.index!]
                                    ?.Limit?.throttle_interval
                              : props.keystate?.data.form.AccessRights[
                                  props.index!
                                ]?.Limit?.Throttle_interval
                          }
                          placeholder="Enter per request"
                          onChange={(e: any) =>
                            handlerateclick(
                              e,
                              props.state?.data.form.APIs[props.index!].Id
                            )
                          }
                          isInvalid={
                            props.current === "policy"
                              ? !!state.data.errors?.PerApiLimit[props.index!]
                                  .ThrottleInterval
                              : !!states.data.errors?.ThrottleInterval
                          }
                          isValid={
                            props.current === "policy"
                              ? !state.data.errors?.PerApiLimit[props.index!]
                                  .ThrottleInterval
                              : !states.data.errors?.ThrottleInterval
                          }
                          disabled={throttleError[props.index!]}
                        />
                        <Form.Control.Feedback type="invalid">
                          {props.current === "policy"
                            ? state.data.errors?.PerApiLimit[props.index!]
                                .ThrottleInterval
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
                          checked={quotaError[props.index!]}
                          className="ml-4"
                          onChange={() => handleSetQuotasError()}
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
                          onChange={(e: any) =>
                            handlerateclick(
                              e,
                              props.state?.data.form.APIs[props.index!].Id
                            )
                          }
                          name="quota_max"
                          value={
                            props.current === "policy"
                              ? props.state?.data.form.APIs[props.index!]?.Limit
                                  ?.quota_max === -1
                                ? "Unlimited"
                                : props.state?.data.form.APIs[props.index!]
                                    ?.Limit?.quota_max
                              : props.keystate?.data.form.AccessRights[
                                  props.index!
                                ]?.Limit?.Quota_max
                          }
                          isInvalid={
                            props.current === "policy"
                              ? !!state.data.errors?.PerApiLimit[props.index!]
                                  .Quota
                              : !!states.data.errors?.Quota
                          }
                          isValid={
                            props.current === "policy"
                              ? !state.data.errors?.PerApiLimit[props.index!]
                                  .Quota
                              : !states.data.errors?.Quota
                          }
                          disabled={quotaError[props.index!]}
                        />
                        <Form.Control.Feedback type="invalid">
                          {" "}
                          {props.current === "policy"
                            ? state.data.errors?.PerApiLimit[props.index!].Quota
                            : states.data.errors?.Quota}
                        </Form.Control.Feedback>
                        <Form.Label className="mt-3">
                          Quota resets every
                        </Form.Label>
                        <Form.Select
                          className="mt-2"
                          style={{ height: 46 }}
                          disabled={quotaError[props.index!]}
                          name="quota_renewal_rate"
                          value={
                            props.current === "policy"
                              ? props.state?.data.form.APIs[props.index!]?.Limit
                                  ?.quota_renews
                              : props.keystate?.data.form.AccessRights[
                                  props.index!
                                ]?.Limit?.Quota_renews
                          }
                          onChange={(e: any) =>
                            handlerateclick(
                              e,
                              props.state?.data.form.APIs[props.index!].Id
                            )
                          }
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
