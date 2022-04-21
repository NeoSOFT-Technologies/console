import React from "react";
import ListenPath from "./listen-path/ListenPath";
// import { Accordion } from "react-bootstrap";
import RateLimit from "./rate-limit/RateLimit";
import TargetUrl from "./target-url/TargetUrl";
import { Col, Form, Row } from "react-bootstrap";
import {
  regexForName,
  setFormData,
  setFormErrors,
} from "../../../../../resources/api/api-constants";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import Authentication from "./authentication/Authentication";

export default function Setting() {
  const state = useAppSelector((RootState) => RootState.updateApiState);
  const dispatch = useAppDispatch();
  // console.log("setting", state);
  function validateForm(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    switch (name) {
      case "Name":
        setFormErrors(
          {
            ...state.data.errors,
            [name]: regexForName.test(value) ? "" : "Enter a valid Api Name ",
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
            <div className="accordion" id="accordionSetting">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    API Settings
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionSetting"
                >
                  <div className="accordion-body">
                    <Row>
                      <Col md={12} className="mb-3">
                        <div className="h-50">
                          <Form.Group className="mb-3">
                            <Form.Label> API Name</Form.Label>
                            <br />

                            <Form.Control
                              className="mt-2"
                              type="text"
                              id="apiName"
                              placeholder="Enter API Name"
                              name="Name"
                              value={state.data.form?.Name}
                              isInvalid={!!state.data.errors?.Name}
                              isValid={!state.data.errors?.Name}
                              onChange={(e: any) => validateForm(e)}
                            />
                            <Form.Control.Feedback type="invalid">
                              {state.data.errors?.Name}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>
                      </Col>
                    </Row>
                    <br />
                    <div>
                      <ListenPath />
                    </div>
                    <div>
                      <TargetUrl />
                    </div>
                    <div>
                      <RateLimit />
                    </div>
                    <div>
                      <Authentication />
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
