import React from "react";
import { Form, Accordion, Row, Col } from "react-bootstrap";
import {
  setFormErrors,
  setFormData,
  regexForName,
} from "../../../../../resources/key/key-constants";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";

function Configurations() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((RootState) => RootState.createKeyState);
  function validateForm(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    switch (name) {
      case "KeyName":
        setFormErrors(
          {
            ...state.data.errors,
            [name]:
              regexForName.test(value) && value.length !== 0
                ? ""
                : "Enter a Valid Name",
          },
          dispatch
        );
        break;
      case "Expires":
        setFormErrors(
          {
            ...state.data.errors,
            [name]: value !== "-1" ? "" : "Enter a Valid Input",
          },
          dispatch
        );
        break;
      default:
        break;
    }

    setFormData(event, dispatch, state);
    // console.log("keyId", name, value);
  }
  return (
    <div>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <span>Settings</span>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              {/* <Col md="12">
                <Form.Group className="mb-3">
                  <Form.Label>Enabled detailed logging :</Form.Label>
                  <Form.Check type="switch" />
                </Form.Group>{" "}
              </Col> */}
              <Col md="12">
                <Form.Group className="mb-3">
                  <Form.Label> Alias :</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Give your key alias to remember it by "
                    name="KeyName"
                    id="KeyName"
                    // data-testid="name-input"
                    value={state.data.form?.KeyName}
                    isInvalid={!!state.data.errors?.KeyName}
                    isValid={!state.data.errors?.KeyName}
                    onChange={(e: any) => validateForm(e)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.data.errors?.KeyName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md="12">
                <Form.Group>
                  <Form.Label> Expires :</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="Expires"
                    value={state.data.form?.Expires}
                    isInvalid={!!state.data.errors?.Expires}
                    isValid={!state.data.errors?.Expires}
                    onChange={(e: any) => validateForm(e)}
                  >
                    <option value="-1">Select an option</option>
                    <option value="0">Do not expire key</option>
                    <option value="1">1 hour</option>
                    <option value="2">6 hours</option>
                    <option value="3">12 hours</option>
                    <option value="4">24 hours</option>
                    <option value="5">1 week</option>
                    <option value="6">2 weeks</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {state.data.errors?.Expires}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
export default Configurations;
