import React, { useEffect } from "react";
import { Accordion, Col, Form, Row } from "react-bootstrap";
import {
  setFormData,
  setFormErrors,
  regexForTargetUrl,
} from "../../../../../../../resources/gateway/api/api-constants";
import { setForm } from "../../../../../../../store/features/gateway/api/update/slice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../store/hooks";
import LoadBalancing from "./load-balacing/LoadBalancing";

export default function TargetUrl() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((RootState) => RootState.updateApiState);
  function validateForm(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    switch (name) {
      case "TargetUrl":
        setFormErrors(
          {
            ...state.data.errors,
            [name]: regexForTargetUrl.test(value)
              ? ""
              : "Enter a Valid Target URL",
          },
          dispatch
        );
        break;
      default:
        break;
    }
    setFormData(event, dispatch, state);
  }

  const enableLoadBalancing = () => {
    if (state.data.form.LoadBalancingTargets.length > 0) {
      dispatch(setForm({ ...state.data.form, EnableRoundRobin: true }));
    }
  };
  useEffect(() => {
    if (state.loading === false) {
      enableLoadBalancing();
    }
  }, []);
  return (
    <div>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <span>Target Url</span>
          </Accordion.Header>
          <Accordion.Body>
            <div>
              <Row>
                <Col md="12">
                  <Form.Group className="mb-3">
                    <Form.Label> Target Url :</Form.Label>
                    <br />
                    {!state.data.form.EnableRoundRobin ? (
                      <>
                        {" "}
                        <i className="mb-3">
                          Supported protocol schemes: http,https.If empty,
                          fallback to default protocol of current API.:
                        </i>
                        <Form.Control
                          className="mt-2"
                          type="text"
                          data-testid="targetUrl-input"
                          id="targetUrl"
                          placeholder="Enter Target Url"
                          name="TargetUrl"
                          value={state.data.form?.TargetUrl}
                          isInvalid={!!state.data.errors?.TargetUrl}
                          isValid={!state.data.errors?.TargetUrl}
                          onChange={(e: any) => validateForm(e)}
                          required
                        />
                        <Form.Control.Feedback
                          type="invalid"
                          data-testid="targetUrlErr"
                        >
                          {state.data.errors?.TargetUrl}
                        </Form.Control.Feedback>
                        <i>
                          If you add a trailing &apos;/ &apos; to your listen
                          path, you can only make requests that include the
                          trailing &apos;/ &apos;
                        </i>
                      </>
                    ) : (
                      <></>
                    )}
                  </Form.Group>
                </Col>

                <Col md="12">
                  <Form.Group className="ml-4 mb-3">
                    <Form.Check
                      type="switch"
                      data-testid="roundRobin-switch"
                      id="EnableRoundRobin"
                      name="EnableRoundRobin"
                      label="Enable round-robin load balancing"
                      checked={
                        state.data.form.EnableRoundRobin === undefined
                          ? false
                          : state.data.form.EnableRoundRobin
                      }
                      onChange={(e: any) => validateForm(e)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  {state.data.form.EnableRoundRobin === true ? (
                    <LoadBalancing />
                  ) : (
                    <span></span>
                  )}
                </Col>

                <Col md="12">
                  <Form.Group className="ml-4 mb-3">
                    <Form.Check
                      hidden
                      className="visually-hidden"
                      type="switch"
                      data-testid="isService-switch"
                      id="IsService"
                      name="IsService"
                      label="Enable service discovery"
                      onChange={(e: any) => validateForm(e)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
