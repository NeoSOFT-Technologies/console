import React from "react";
import { Form, Accordion, Row, Col } from "react-bootstrap";
import {
  setFormErrorkey,
  setFormData,
  regexForName,
} from "../../../../../../resources/gateway/key/key-constants";
import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";

function Configurations() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((RootState) => RootState.createKeyState);
  function validateForm(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    switch (name) {
      case "KeyName":
        setFormErrorkey(
          {
            ...state.data.errors,
            [name]: regexForName.test(value) ? "" : "Enter a Valid Name",
          },
          dispatch
        );
        break;
      case "Expires":
        setFormErrorkey(
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
    //
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
              <Col md="12">
                <Form.Group className="mb-3">
                  <Form.Label> Alias :</Form.Label>
                  <Form.Control
                    type="text"
                    data-testid="keyName-input"
                    placeholder="Give your key alias to remember it by "
                    name="KeyName"
                    id="KeyName"
                    // data-testid="name-input"
                    value={state.data.form?.KeyName}
                    onBlur={(e: any) => validateForm(e)}
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
                    data-testid="expiry"
                    aria-label="Default select example"
                    name="Expires"
                    value={state.data.form?.Expires}
                    isInvalid={!!state.data.errors?.Expires}
                    isValid={!state.data.errors?.Expires}
                    onChange={(e: any) => validateForm(e)}
                  >
                    <option value="-1">Select expiry</option>
                    <option value="0">Do not expire key</option>
                    <option value="3600">1 hour</option>
                    <option value="21600">6 hours</option>
                    <option value="43200">12 hours</option>
                    <option value="86400">24 hours</option>
                    <option value="604800">1 week</option>
                    <option value="1209600">2 weeks</option>
                    <option value="2592000">1 month</option>
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
