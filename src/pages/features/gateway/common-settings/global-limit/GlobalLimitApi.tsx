import React from "react";
import { Accordion, Col, Form, Row } from "react-bootstrap";
import Spinner from "../../../../../components/loader/Loader";
import { regexForNumber } from "../../../../../resources/gateway/api/api-constants";
import { IPropsHelper, setFormValue, setLabel } from "./rate-limit-helper";
export default function GlobalLimitApi(props: IPropsHelper) {
  const perapi = [...props.errorProp!];

  function validateForm(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    perapi[props.index!] = {
      ...perapi[props.index!],
      [name]: regexForNumber.test(value) ? "" : "Enter only Numbers",
    };

    props.dispatch(
      props.setFormError!({
        ...props.errors,
        PerApiLimit: perapi,
      })
    );
  }

  const handlerateclick = (event: any) => {
    event.preventDefault();
    validateForm(event);
    console.log("index check", props.index!);
    const value = props.index!;
    const apisList = [...props.formProp!];
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData: any = {
      ...props.formProp[props.index!].Limit!,
    };
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

    apisList[value] = {
      ...apisList[value],
      Limit: { ...newFormData },
    };
    props.dispatch(
      props.setForm!({
        ...props.form,
        [props.propName!]: apisList,
      })
    );
  };

  return (
    <>
      {props.errorProp!.length! > 0 ? (
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
                          {setLabel({
                            index: props.index!,
                            formProp: props.formProp,
                          })}
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
                            props.formProp[props.index!]?.Limit?.Rate! === -1
                          }
                          onChange={(e: any) => setFormValue(props, e)}
                        />
                        <Form.Label className="mt-3">Rate</Form.Label>
                        <br />

                        <Form.Control
                          className="mt-2"
                          type="text"
                          id="Rate"
                          required
                          value={
                            props.formProp[props.index!]?.Limit?.Rate === -1
                              ? "Disabled Rate"
                              : props.formProp[props.index!]?.Limit?.Rate
                          }
                          placeholder="Enter Request per period"
                          // onChange={(e: any) => validateForm(e)}
                          onChange={(e: any) => handlerateclick(e)}
                          name="Rate"
                          isInvalid={!!props.errorProp[props.index!].Rate}
                          isValid={!props.errorProp[props.index!].Rate}
                          disabled={
                            props.formProp[props.index!].Limit?.Rate! === -1
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {" "}
                          {props.errorProp[props.index!].Rate}
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
                            props.formProp[props.index!]?.Limit?.Per === -1
                              ? "Disabled Rate"
                              : props.formProp[props.index!]?.Limit?.Per
                          }
                          isInvalid={!!props.errorProp[props.index!].Per}
                          isValid={!props.errorProp[props.index!].Per}
                          disabled={
                            props.formProp[props.index!].Limit?.Per! === -1
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {props.errorProp[props.index!].Per}
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
                            props.formProp[props.index!]?.Limit
                              ?.Throttle_retry_limit! === -1
                          }
                          className="ml-4"
                          onChange={(e: any) => setFormValue(props, e)}
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
                            props.formProp[props.index!]?.Limit
                              ?.Throttle_retry_limit === -1
                              ? "Disabled Rate"
                              : props.formProp[props.index!]?.Limit
                                  ?.Throttle_retry_limit
                          }
                          placeholder="Enter per request"
                          name="ThrottleRetries"
                          onChange={(e: any) => handlerateclick(e)}
                          // value={throttleDefault}ThrottleRetries
                          isInvalid={
                            !!props.errorProp[props.index!].ThrottleRetries
                          }
                          isValid={
                            !props.errorProp[props.index!].ThrottleRetries
                          }
                          disabled={
                            props.formProp[props.index!].Limit
                              ?.Throttle_retry_limit! === -1
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {props.errorProp[props.index!].ThrottleRetries}
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
                            props.formProp[props.index!]?.Limit
                              ?.Throttle_interval === -1
                              ? "Disabled Rate"
                              : props.formProp[props.index!]?.Limit
                                  ?.Throttle_interval
                          }
                          placeholder="Enter per request"
                          onChange={(e: any) => handlerateclick(e)}
                          isInvalid={
                            !!props.errorProp[props.index!].ThrottleInterval
                          }
                          isValid={
                            !props.errorProp[props.index!].ThrottleInterval
                          }
                          disabled={
                            props.formProp[props.index!].Limit
                              ?.Throttle_interval! === -1
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {props.errorProp[props.index!].ThrottleInterval}
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
                            props.formProp[props.index!]?.Limit?.Quota_max! ===
                            -1
                          }
                          className="ml-4"
                          onChange={(e: any) => setFormValue(props, e)}
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
                            props.formProp[props.index!]?.Limit?.Quota_max ===
                            -1
                              ? "Disabled Rate"
                              : props.formProp[props.index!]?.Limit?.Quota_max
                          }
                          isInvalid={!!props.errorProp[props.index!].Quota}
                          isValid={!props.errorProp[props.index!].Quota}
                          disabled={
                            props.formProp[props.index!].Limit?.Quota_max! ===
                            -1
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {" "}
                          {props.errorProp[props.index!].Quota}
                        </Form.Control.Feedback>
                        <Form.Label className="mt-3">
                          Quota resets every
                        </Form.Label>
                        <Form.Select
                          className="mt-2"
                          style={{ height: 46 }}
                          disabled={
                            props.formProp[props.index!].Limit?.Quota_max! ===
                            -1
                          }
                          name="Quota_renewal_rate"
                          value={
                            props.formProp[props.index!]?.Limit
                              ?.Quota_renewal_rate === -1
                              ? "Disabled Rate"
                              : props.formProp[props.index!]?.Limit
                                  ?.Quota_renewal_rate
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
