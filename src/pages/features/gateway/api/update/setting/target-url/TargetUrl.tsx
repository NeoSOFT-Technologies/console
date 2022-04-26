import React, { useEffect } from "react";
// import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import {
  setFormData,
  setFormErrors,
  regexForTagetUrl,
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
    // console.log("load1", state.data.form.EnableRoundRobin);
  }

  // const [check, setCheck] = useState(false);

  // const enableLoadBalancing = () => {
  //   if (state.data.form.LoadBalancingTargets.length > 0) {
  //     setCheck(true);
  //   } else setCheck(false);
  // };
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
                        id="EnableRoundRobin"
                        name="EnableRoundRobin"
                        label="Enable round-robin load balancing"
                        // checked={check}
                        // onChange={(e: any) => setCheck(e.target.checked)}
                        checked={state.data.form.EnableRoundRobin}
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
                    <Form.Group className="mb-3">
                      <Form.Check
                        hidden
                        className="visually-hidden"
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
