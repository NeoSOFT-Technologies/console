import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { setFormData } from "../../../../../../resources/api/api-constants";
import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";

export default function VersionSettings() {
  const dispatch = useAppDispatch();

  const state = useAppSelector((RootState) => RootState.updateApiState);

  function validateForm(event: React.ChangeEvent<HTMLInputElement>) {
    // const { name, value } = event.target;
    // console.log(name, value);
    setFormData(event, dispatch, state);
  }

  return (
    <div>
      <div className="card">
        <div>
          <div className="align-items-center justify-content-around">
            <div className="accordion" id="accordionVersionSettings">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFive">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                    aria-expanded="true"
                    aria-controls="collapseFive"
                  >
                    Version Settings
                  </button>
                </h2>
                <div
                  id="collapseFive"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingFive"
                  data-bs-parent="#accordionVersionSettings"
                >
                  <div className="accordion-body">
                    <div>
                      <Row>
                        <Col md="12">
                          <Form.Group className="mb-3">
                            <Form.Label> Version Data Location</Form.Label>
                            <br />
                            <Form.Select
                              aria-label="Default select example"
                              name="VersioningInfo.Location"
                              value={state.data.form?.VersioningInfo?.Location}
                              onChange={(e: any) => validateForm(e)}
                            >
                              <option value="0">Choose a location</option>
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
