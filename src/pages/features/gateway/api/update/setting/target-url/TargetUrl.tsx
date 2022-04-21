import React, { useEffect, useState } from "react";
// import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import {
  setFormData,
  setFormErrors,
  regexForTagetUrl,
} from "../../../../../../resources/api/api-constants";
import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";
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
            [name]: regexForTagetUrl.test(value)
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

  const [check, setCheck] = useState(false);

  const enableLoadBalancing = () => {
    if (state.data.form.LoadBalancingTargets.length > 0) {
      setCheck(true);
    } else setCheck(false);
  };
  useEffect(() => {
    if (state.loading === false) {
      enableLoadBalancing();
    }
  }, []);
  return (
    <div>
      <div className="accordion" id="accordionTargetUrl">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="true"
              aria-controls="collapseThree"
            >
              Targets
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse show"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionTargetUrl"
          >
            <div className="accordion-body">
              <div>
                <Row>
                  <Col md="12">
                    <Form.Group className="mb-3">
                      <Form.Label> Target Url :</Form.Label>
                      <br />
                      {!check ? (
                        <>
                          {" "}
                          <i className="mb-3">
                            Supported protocol schemes:
                            http,https,tcp,tls,h2c,tyk,ws,wss.If empty, fallback
                            to default protocolof current API.:
                          </i>
                          <Form.Control
                            className="mt-2"
                            type="text"
                            id="targetUrl"
                            placeholder="Enter Target Url"
                            name="TargetUrl"
                            value={state.data.form?.TargetUrl}
                            isInvalid={!!state.data.errors?.TargetUrl}
                            isValid={!state.data.errors?.TargetUrl}
                            onChange={(e: any) => validateForm(e)}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
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
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="isLoadBalancing"
                        name="isLoadBalancing"
                        label="Enable round-robin load balancing"
                        checked={check}
                        onChange={(e: any) => setCheck(e.target.checked)}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    {check === true ? <LoadBalancing /> : <span></span>}
                  </Col>
                  <Col md="12">
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="IsService"
                        name="IsService"
                        label="Enable service discovery"
                        // checked={state.data.form?.IsService}
                        onChange={(e: any) => validateForm(e)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
