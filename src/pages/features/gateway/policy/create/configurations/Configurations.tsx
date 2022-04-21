import React from "react";
import { Form, Accordion, Col, Row } from "react-bootstrap";
import {
  setFormErrors,
  setFormData,
  regexForName,
} from "../../../../../resources/policy/policy-constants";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";

export default function Configurations() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((RootState) => RootState.createPolicyState);
  function validateForm(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    switch (name) {
      case "Name":
        setFormErrors(
          {
            ...state.data.errors,
            [name]: regexForName.test(value) ? "" : "Enter a Valid Policy name",
          },
          dispatch
        );
        break;
      default:
        break;
    }

    setFormData(event, dispatch, state);
    // console.log("policyId", name, value);
  }
  return (
    <div>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <span>Policy Name</span>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col md="12">
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="eg: DemoPolicy "
                    name="Name"
                    id="Name"
                    data-testid="name-input"
                    value={state.data.form?.Name}
                    isInvalid={!!state.data.errors?.Name}
                    isValid={!state.data.errors?.Name}
                    onChange={(e: any) => validateForm(e)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.data.errors?.Name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <br />
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <span>Settings</span>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col md="12" className="mt-3">
                <Form.Group>
                  <Form.Label>Policy status : </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="State"
                    value={state.data.form?.State}
                    onChange={(e: any) => validateForm(e)}
                  >
                    <option>Select an option</option>
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="deny">Access Denied</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <br />
              <Col md="12" className="mt-3">
                <Form.Group>
                  <Form.Label> Key expires after :</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="KeyExpiresIn"
                    value={state.data.form?.KeyExpiresIn}
                    onChange={(e: any) => validateForm(e)}
                  >
                    <option>Select an option</option>
                    <option value="0">Do not expire key</option>
                    <option value="3600">1 hour</option>
                    <option value="21600">6 hours</option>
                    <option value="43200">12 hours</option>
                    <option value="86400">24 hours</option>
                    <option value="604800">1 week</option>
                    <option value="1209600">2 weeks</option>
                    <option value="2592000">1 month</option>
                  </Form.Select>{" "}
                </Form.Group>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
