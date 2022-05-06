import React from "react";
import { Accordion, Col, Form, Row } from "react-bootstrap";
import {
  regexForName,
  setFormData,
  setFormErrors,
} from "../../../../../../resources/gateway/api/api-constants";
import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";
import Authentication from "./authentication/Authentication";
import ListenPath from "./listen-path/ListenPath";
// import { Accordion } from "react-bootstrap";
import RateLimit from "./rate-limit/RateLimit";
import TargetUrl from "./target-url/TargetUrl";

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
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <span>API Setting</span>
                </Accordion.Header>
                <Accordion.Body>
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
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
