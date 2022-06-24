import React from "react";
import { Accordion, Row, Col, Form } from "react-bootstrap";
import Spinner from "../../../../../components/loader/Loader";
import { regexForNumber } from "../../../../../resources/gateway/api/api-constants";
import { IKeyCreateState } from "../../../../../store/features/gateway/key/create";
import { IPolicyCreateState } from "../../../../../store/features/gateway/policy/create";
// import { useAppSelector } from "../../../../../store/hooks";
import { GlobalsetFormValue, IPropsHelper } from "./rate-limit-helper";
interface IProps {
  helper?: IPropsHelper;
  state?: IPolicyCreateState;
  keystate?: IKeyCreateState;
  current?: string;
  message?: string;
}

export default function GlobalRateLimit(props: IProps) {
  // const state = useAppSelector((RootState) => RootState.createPolicyState);
  let perapi = { ...props.helper!.errors!.GlobalLimit! };
  function validateForm(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    console.log("name", name, perapi);
    perapi = {
      ...perapi,
      [name]: regexForNumber.test(value) ? "" : "Enter only Numbers",
    };
    props.helper!.dispatch(
      props.helper!.setFormError!({
        ...props.helper!.errors,
        GlobalLimit: perapi,
      })
    );
  }

  const handlerateclick = (event: any) => {
    event.preventDefault();
    validateForm(event);
    const fieldValue = event.target.value;
    const fieldName = event.target.getAttribute("name");
    props.helper!.dispatch(
      props.helper!.setForm!({
        ...props.helper!.form,
        [fieldName]: fieldValue,
      })
    );
  };
  return (
    <>
      {props.helper!.state!.loading === false ? (
        <div className="card">
          <Accordion defaultActiveKey="0" id="GlobalRateLimit">
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
                          data-testid="rate-switch"
                          id="disableGlobalRate"
                          name="GlobalLimit.IsDisabled"
                          label="Disable rate limiting"
                          checked={props.helper!.form.Rate! === -1}
                          className="ml-4"
                          onChange={(e: any) =>
                            GlobalsetFormValue(props.helper!, e)
                          }
                        />
                        <Form.Label className="mt-3">Rate</Form.Label>
                        <br />

                        <Form.Control
                          className="mt-2"
                          type="text"
                          data-testid="rate-input"
                          id="rate"
                          placeholder="Enter Request per period"
                          onChange={(e: any) => handlerateclick(e)}
                          name="Rate"
                          value={
                            props.helper!.form.Rate === -1
                              ? "Unlimited"
                              : props.helper!.form.Rate
                          }
                          isInvalid={!!props.helper!.errors?.GlobalLimit.Rate!}
                          isValid={!props.helper!.errors?.GlobalLimit.Rate!}
                          disabled={props.helper!.form.Rate === -1}
                        />
                        <Form.Control.Feedback type="invalid">
                          {" "}
                          {props.helper!.errors?.GlobalLimit.Rate!}
                        </Form.Control.Feedback>
                        <Form.Label className="mt-3">Per (Seconds)</Form.Label>
                        <br />
                        <Form.Control
                          className="mt-2"
                          type="text"
                          data-testid="per-input"
                          id="per"
                          placeholder="Enter time"
                          onChange={(e: any) => handlerateclick(e)}
                          name="Per"
                          value={
                            props.helper!.form.Per === -1
                              ? "Unlimited"
                              : props.helper!.form.Per
                          }
                          isInvalid={!!props.helper!.errors?.GlobalLimit.Per!}
                          isValid={!props.helper!.errors?.GlobalLimit.Per!}
                          disabled={props.helper!.form.Per === -1}
                        />
                        <Form.Control.Feedback type="invalid">
                          {props.helper!.errors?.GlobalLimit.Per}
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
                          data-testid="throttle-switch"
                          id="disableThrottling"
                          name="Throttling.IsDisabled"
                          label="Disable Throttling"
                          checked={props.helper!.form.ThrottleInterval! === -1}
                          className="ml-4"
                          onChange={(e: any) =>
                            GlobalsetFormValue(props.helper!, e)
                          }
                        />
                        <Form.Label className="mt-3">
                          Throttle retry limit
                        </Form.Label>
                        <br />
                        <Form.Control
                          className="mt-2"
                          type="text"
                          data-testid="retry-input"
                          id="retry"
                          // placeholder={throttleRetry}
                          name="ThrottleRetries"
                          value={
                            props.helper!.form.ThrottleRetries! === -1
                              ? "Disabled Throttling"
                              : props.helper!.form.ThrottleRetries!
                          }
                          onChange={(e: any) => handlerateclick(e)}
                          // value={throttleDefault}
                          isInvalid={
                            !!props.helper!.errors?.GlobalLimit.ThrottleRetries!
                          }
                          isValid={
                            !props.helper!.errors?.GlobalLimit.ThrottleRetries!
                          }
                          disabled={props.helper!.form.ThrottleRetries! === -1}
                        />
                        <Form.Control.Feedback type="invalid">
                          {props.helper!.errors?.GlobalLimit.ThrottleRetries}
                        </Form.Control.Feedback>
                        <Form.Label className="mt-3">
                          Throttle interval
                        </Form.Label>
                        <br />
                        <Form.Control
                          className="mt-2"
                          type="text"
                          data-testid="interval-input"
                          id="interval"
                          name="ThrottleInterval"
                          value={
                            props.helper!.form.ThrottleInterval! === -1
                              ? "Disabled Throttling"
                              : props.helper!.form.ThrottleInterval!
                          }
                          // placeholder={throttleInterval}
                          onChange={(e: any) => handlerateclick(e)}
                          isInvalid={
                            !!props.helper!.errors?.GlobalLimit
                              .ThrottleInterval!
                          }
                          isValid={
                            !props.helper!.errors?.GlobalLimit.ThrottleInterval!
                          }
                          disabled={props.helper!.form.ThrottleInterval! === -1}
                        />
                        <Form.Control.Feedback type="invalid">
                          {props.helper!.errors?.GlobalLimit.ThrottleInterval}
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
                          data-testid="quota-switch"
                          id="unlimitedRequests"
                          name="unlimitedRequests.IsDisabled"
                          label="Unlimited requests"
                          checked={props.helper!.form.Quota === -1}
                          className="ml-4"
                          onChange={(e: any) =>
                            GlobalsetFormValue(props.helper!, e)
                          }
                        />
                        <Form.Label className="mt-3">
                          Max requests per period
                        </Form.Label>
                        <br />
                        <Form.Control
                          className="mt-2"
                          type="text"
                          data-testid="quotaPer-input"
                          id="quotaPer"
                          // placeholder={quotaPerPeriod}
                          onChange={(e: any) => handlerateclick(e)}
                          name="Quota"
                          value={
                            props.helper!.form.Quota === -1
                              ? "Unlimited"
                              : props.helper!.form.Quota
                          }
                          isInvalid={!!props.helper!.errors?.GlobalLimit.Quota}
                          isValid={!props.helper!.errors?.GlobalLimit.Quota}
                          disabled={props.helper!.form.Quota === -1}
                        />
                        <Form.Control.Feedback type="invalid">
                          {" "}
                          {props.helper!.errors?.GlobalLimit.Quota}
                        </Form.Control.Feedback>
                        <Form.Label className="mt-3">
                          Quota resets every
                        </Form.Label>
                        <Form.Select
                          className="mt-2"
                          style={{ height: 46 }}
                          disabled={props.helper!.form.Quota === -1}
                          name="QuotaRenewalRate"
                          data-testid="quotaRenews-input"
                          value={props.helper!.form.QuotaRenewalRate}
                          onChange={(e: any) => handlerateclick(e)}
                        >
                          <option value={-1}>never</option>
                          <option value={3600}>1 hour</option>
                          <option value={21_600}>6 hour</option>
                          <option value={43_200}>12 hour</option>
                          <option value={604_800}>1 week</option>
                          <option value={2.628e6}>1 month</option>
                          <option value={1.577e7}>6 months</option>
                          <option value={3.154_67}>12 months</option>
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
