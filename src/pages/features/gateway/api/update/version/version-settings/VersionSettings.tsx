import React from "react";
import { Accordion, Col, Form, Row } from "react-bootstrap";
import { setFormData } from "../../../../../../../resources/gateway/api/api-constants";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../store/hooks";

export default function VersionSettings() {
  const dispatch = useAppDispatch();

  const state = useAppSelector((RootState) => RootState.updateApiState);

  function validateForm(event: React.ChangeEvent<HTMLInputElement>) {
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
                  <span>Version Setting</span>
                </Accordion.Header>
                <Accordion.Body>
                  <div>
                    <Row>
                      <Col md="12">
                        <Form.Group className="mb-3">
                          <Form.Label> Version Data Location</Form.Label>
                          <br />
                          <Form.Select
                            data-testid="versionLocation-select"
                            aria-label="Default select example"
                            name="VersioningInfo.Location"
                            value={state.data.form?.VersioningInfo?.Location}
                            onChange={(e: any) => validateForm(e)}
                          >
                            <option value="0" disabled>
                              Choose a location
                            </option>
                            <option id="Header" value="1">
                              Header
                            </option>
                            <option id="First part of path" value="2">
                              First part of path
                            </option>
                            <option id="URL or Form parameter" value="3">
                              URL or Form parameter
                            </option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md="12">
                        <Form.Group className="mb-3">
                          <Form.Label>Version Identifier Key Name</Form.Label>
                          <br />

                          <Form.Control
                            className="mt-2"
                            data-testid="versionKeyName-input"
                            type="text"
                            id="versionIdentifier"
                            placeholder="Enter Version key Name"
                            name="VersioningInfo.Key"
                            value={state.data.form?.VersioningInfo.Key}
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
        </div>
      </div>
    </div>
  );
}
