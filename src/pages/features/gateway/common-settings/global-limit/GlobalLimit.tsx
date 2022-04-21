import React, { useEffect, useState } from "react";
import { Accordion, Col, Form, Row } from "react-bootstrap";
import {
  getPolicybyId,
  setForm,
} from "../../../../store/features/policy/create/slice";
import { setForms } from "../../../../store/features/key/create/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  IGetPolicyByIdData,
  IPolicyCreateState,
} from "../../../../store/features/policy/create";
import { IKeyCreateState } from "../../../../store/features/key/create";
import Spinner from "../../../../components/loader/Loader";

interface IProps {
  isDisabled: boolean;
  state?: IKeyCreateState | IPolicyCreateState;
  index?: number;
  policyId?: string;
  msg: string;
}

export default function GlobalLimit(props: IProps) {
  const dispatch = useAppDispatch();
  const states = useAppSelector((RootState) => RootState.createKeyState);
  const [loader, setLoader] = useState(true);
  const [localState, setLocalState] = useState({} as IPolicyCreateState);

  const state: IPolicyCreateState = useAppSelector(
    (RootStates) => RootStates.createPolicyState
  );

  const mainCall = async (id: string) => {
    if (id !== null && id !== "" && id !== undefined) {
      await dispatch(getPolicybyId(id));
      setLoader(false);
    }
  };

  useEffect(() => {
    mainCall(props.policyId!);
  }, []);

  useEffect(() => {
    if (
      props.policyId !== null &&
      props.policyId !== "" &&
      props.policyId !== undefined &&
      loader === false &&
      state.loading === false
    ) {
      console.log("second use effect - ", loader);

      const manageState = async () => {
        const policyByIdTemp = [...(states.data.form.PolicyByIds! as any[])];
        const policyState = state.data.form;
        policyByIdTemp.push(policyState);

        setLocalState(state);
        console.log(localState);

        await dispatch(
          setForms({ ...states.data.form, PolicyByIds: policyByIdTemp })
        );
      };
      manageState();
    }
  }, [loader]);

  // console.log("mainstate", states);
  const [rate, setRate] = useState(props.isDisabled);
  const [throttle, setThrottle] = useState(true);
  const [quota, setQuota] = useState(true);
  const [throttleRetry, setThrottleRetry] = useState("Disabled throttling");
  const [throttleInterval, setThrottleInterval] = useState(
    "Disabled throttling"
  );
  const [quotaPerPeriod, setQuotaPerPeriod] = useState("Unlimited");

  const [rateValue, setRateValue] = useState("");
  const [perValue, setPerValue] = useState("");
  const [retryValue, setRetryValue] = useState("");
  const [intervalValue, setIntervalValue] = useState("");
  const [maxQuotaValue, setMaxQuotaValue] = useState("");
  const [quotaResetValue, setQuotaResetValue] = useState("");

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

  function validateForm(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setRateValue(event.target.value);
    dispatch(setForm({ ...state.data.form, [name]: value }));
  }
  return (
    <>
      {loader === false &&
      state.loading === false &&
      states.data.form.PolicyByIds!.length > props.index! &&
      states.data.form.PolicyByIds![props.index!].APIs.length > 0 ? (
        (
          states.data.form.PolicyByIds![props.index!]
            .APIs as IGetPolicyByIdData[]
        ).map((data: any, index: number) => {
          return (
            <div className="card" key={index}>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Global Limits and Quota</Accordion.Header>

                  <Accordion.Body>
                    <Row>
                      <Row>
                        <Col md="4">
                          {props.msg !== "" && props.isDisabled === true ? (
                            <Form.Group className="mb-3">
                              <Form.Label className="mt-2">
                                <b>Rate Limiting</b>
                              </Form.Label>
                              <div
                                className="mr-4 pt-3 pb-3 mt-2 border border-4 rounded-4 pl-2"
                                style={{ background: "#ADD8E6" }} // #96DED1
                              >
                                Rate Limit {props.msg}
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
                                disabled={props.isDisabled}
                                // checked={rate}
                                onChange={(e: any) => setRate(e.target.checked)}
                              />
                              <Form.Label className="mt-3">Rate</Form.Label>
                              <br />

                              <Form.Control
                                className="mt-2"
                                type="text"
                                id="rate"
                                placeholder="Enter Rate"
                                value={
                                  props.isDisabled ? data.Limit.rate : rateValue
                                }
                                onChange={(e: any) => validateForm(e)}
                                name="Rate"
                                disabled={rate}
                              />
                              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                              <Form.Label className="mt-3">
                                Per (Seconds)
                              </Form.Label>
                              <br />
                              <Form.Control
                                className="mt-2"
                                type="text"
                                id="per"
                                placeholder="Enter time"
                                value={
                                  props.isDisabled
                                    ? states.data.form.PolicyByIds![
                                        props.index!
                                      ].Per
                                    : perValue
                                }
                                onChange={(e: any) =>
                                  setPerValue(e.target.value)
                                }
                                name="RateLimit.Per"
                                disabled={rate}
                              />
                              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                            </Form.Group>
                          )}
                        </Col>
                        <Col md="4">
                          {props.msg !== "" && props.isDisabled === true ? (
                            <Form.Group className="mb-3">
                              <Form.Label className="mt-2">
                                <b>Throttling</b>
                              </Form.Label>
                              <div
                                className="mr-4 pt-3 pb-3 mt-2 border border-4 rounded-4 pl-2 "
                                style={{ background: "#ADD8E6" }}
                              >
                                Throttling {props.msg}
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
                                disabled={props.isDisabled}
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
                                placeholder={throttleRetry}
                                name="Throttling.Retry"
                                value={
                                  props.isDisabled
                                    ? states.data.form.PolicyByIds![
                                        props.index!
                                      ].ThrottleRetries
                                    : retryValue
                                }
                                onChange={(e: any) =>
                                  setRetryValue(e.target.value)
                                }
                                // value={throttleDefault}
                                disabled={throttle}
                              />

                              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                              <Form.Label className="mt-3">
                                Throttle interval
                              </Form.Label>
                              <br />
                              <Form.Control
                                className="mt-2"
                                type="text"
                                id="interval"
                                placeholder={throttleInterval}
                                value={
                                  props.isDisabled
                                    ? states.data.form.PolicyByIds![
                                        props.index!
                                      ].ThrottleInterval
                                    : intervalValue
                                }
                                onChange={(e: any) =>
                                  setIntervalValue(e.target.value)
                                }
                                name="Throttling.Interval"
                                disabled={throttle}
                              />
                            </Form.Group>
                          )}
                        </Col>
                        <Col md="4">
                          {props.msg !== "" && props.isDisabled === true ? (
                            <Form.Group className="mb-3">
                              <Form.Label className="mt-2">
                                <b>Usage Quota</b>
                              </Form.Label>
                              <div
                                className="mr-4 pt-3 pb-3 mt-2 border border-4 rounded-4 pl-2"
                                style={{ background: "#ADD8E6" }}
                              >
                                Usage Quota {props.msg}
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
                                disabled={props.isDisabled}
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
                                value={
                                  props.isDisabled
                                    ? states.data.form.PolicyByIds![
                                        props.index!
                                      ].MaxQuota
                                    : maxQuotaValue
                                }
                                onChange={(e: any) =>
                                  setMaxQuotaValue(e.target.value)
                                }
                                name="Quota.Per"
                                disabled={quota}
                              />
                              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                              <Form.Label className="mt-3">
                                Quota resets every
                              </Form.Label>
                              <Form.Select
                                className="mt-2"
                                style={{ height: 46 }}
                                disabled={quota}
                                value={
                                  props.isDisabled
                                    ? states.data.form.PolicyByIds![
                                        props.index!
                                      ].QuotaRate
                                    : quotaResetValue
                                }
                                onChange={(e: any) =>
                                  setQuotaResetValue(e.target.value)
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
                          )}
                        </Col>
                      </Row>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          );
        })
      ) : (
        <Spinner />
      )}
    </>
  );
}
