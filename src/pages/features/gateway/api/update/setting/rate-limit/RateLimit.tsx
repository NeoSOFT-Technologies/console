import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import {
  setFormErrors,
  setFormData,
  regexForNumber,
} from "../../../../../../resources/api/api-constants";
import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";

export default function RateLimit() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((RootState) => RootState.updateApiState);
  function validateForm(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    switch (name) {
      case "RateLimit.Rate":
        setFormErrors(
          {
            ...state.data.errors,
            Rate: regexForNumber.test(value) ? "" : "Enter only Numbers",
          },
          dispatch
        );
        break;
      case "RateLimit.Per":
        setFormErrors(
          {
            ...state.data.errors,
            Per: regexForNumber.test(value) ? "" : "Enter only Numbers",
          },
          dispatch
        );
        break;
      default:
        break;
    }
    setFormData(event, dispatch, state);
  }
  return (
    <div>
      <div className="card">
        <div>
          <div className="align-items-center justify-content-around">
            <div className="accordion" id="accordionRateLimit">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFour">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="true"
                    aria-controls="collapseFour"
                  >
                    Rate Limiting And Quotas
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingFour"
                  data-bs-parent="#accordionRateLimit"
                >
                  <div className="accordion-body">
                    <div>
                      <Row>
                        <Col md="12">
                          <Form.Group className="mb-3">
                            <Form.Check
                              type="switch"
                              id="disableRate"
                              name="RateLimit.IsDisabled"
                              label="Disable rate limiting"
                              checked={state.data.form?.RateLimit.IsDisabled}
                              onChange={(e: any) => validateForm(e)}
                            />
                          </Form.Group>
                        </Col>
                        <Col md="12">
                          <i> Global Rate Limiting</i>
                          <i className="mb-3">
                            Turn on global rate limit for the whole Api.Key
                            specific rate limit will still work, but separate
                            Api global rate limiter will have higher priority
                            and will be aggregated across all keys.
                          </i>
                          <Form.Group className="mb-3">
                            <Form.Label> Rate</Form.Label>
                            <br />

                            <Form.Control
                              className="mt-2"
                              type="text"
                              id="rate"
                              placeholder="Enter Rate"
                              name="RateLimit.Rate"
                              disabled={
                                state.data.form?.RateLimit.IsDisabled === true
                              }
                              value={state.data.form?.RateLimit.Rate}
                              isInvalid={!!state.data.errors?.Rate}
                              isValid={!state.data.errors?.Rate}
                              onChange={(e: any) => validateForm(e)}
                            />
                            <Form.Control.Feedback type="invalid">
                              {state.data.errors?.Rate}
                            </Form.Control.Feedback>
                            <i>
                              If you add a trailing &apos;/ &apos; to your
                              listen path, you can only make requests that
                              include the trailing &apos;/ &apos;
                            </i>
                          </Form.Group>
                        </Col>
                        <Col md="12">
                          <Form.Group className="mb-3">
                            <Form.Label> Per (Seconds)</Form.Label>
                            <br />

                            <Form.Control
                              className="mt-2"
                              type="text"
                              id="perSecond"
                              placeholder="Enter time"
                              name="RateLimit.Per"
                              disabled={
                                state.data.form?.RateLimit.IsDisabled === true
                              }
                              value={state.data.form?.RateLimit.Per}
                              isInvalid={!!state.data.errors?.Per}
                              isValid={!state.data.errors?.Per}
                              onChange={(e: any) => validateForm(e)}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              {state.data.errors?.Per}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md="12">
                          <Form.Group className="mb-3">
                            <Form.Check
                              type="switch"
                              id="disableQuotas"
                              name="IsQuotaDisabled"
                              label="Disable quotas"
                              checked={state.data.form?.IsQuotaDisabled}
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
        </div>
      </div>
    </div>
  );
}
