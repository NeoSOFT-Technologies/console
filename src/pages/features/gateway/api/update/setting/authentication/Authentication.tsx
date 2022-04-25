import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { setFormData } from "../../../../../../../resources/gateway/api/api-constants";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../store/hooks";
import AuthenticationToken from "./authentication-token/AuthenticationToken";
import MutualTLS from "./mutual-tls/MutualTLS";

import OpenIdConnect from "./open-id-connect/OpenIdConnect";
import OpenKeyless from "./open-keyless/OpenKeyLess";
// import { setForm } from "../../../../../../store/features/api/update/slice";

export default function Authentication() {
  const dispatch = useAppDispatch();

  const state = useAppSelector((RootState) => RootState.updateApiState);
  const handleFormSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData(event, dispatch, state);
  };
  return (
    <div>
      <div className="card">
        <div>
          <div className="align-items-center justify-content-around">
            <div className="accordion" id="accordionListenPath">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="true"
                    aria-controls="collapseTwo"
                  >
                    Authentication
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionListenPath"
                >
                  <div className="accordion-body">
                    <div>
                      <Row>
                        <Col md="12">
                          <Form.Group className="mb-3">
                            <Form.Label> Authentication mode:</Form.Label>
                            <br />
                            <Form.Select
                              aria-label="Default select example"
                              name="AuthType"
                              value={state.data.form.AuthType}
                              // onClick={handleFormSelectChange}
                              onChange={(e: any) => handleFormSelectChange(e)}
                            >
                              <option id="authToken" value="standard">
                                Authentication Token
                              </option>
                              <option id="mutualTls" value="mutual">
                                Mutual TLS
                              </option>
                              <option id="openid" value="openid">
                                OpenId Connect
                              </option>
                              <option id="keyless" value="keyless">
                                Open (KeyLess)
                              </option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                    </div>

                    <div>
                      {state.data.form.AuthType === "standard" ? (
                        <AuthenticationToken />
                      ) : state.data.form.AuthType === "openid" ? (
                        <OpenIdConnect />
                      ) : state.data.form.EnableMTLS === true ||
                        state.data.form.AuthType === "mutual" ? (
                        <MutualTLS />
                      ) : state.data.form.AuthType === "keyless" ? (
                        <OpenKeyless />
                      ) : (
                        <></>
                      )}
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
