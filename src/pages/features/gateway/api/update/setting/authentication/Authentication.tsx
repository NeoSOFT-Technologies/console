import React from "react";
import { Accordion, Col, Form, Row } from "react-bootstrap";
import Tooltips from "../../../../../../../components/tooltips/Tooltips";
import { setFormData } from "../../../../../../../resources/gateway/api/api-constants";
import { setForm } from "../../../../../../../store/features/gateway/api/update/slice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../store/hooks";
import AuthenticationToken from "./authentication-token/AuthenticationToken";
import MutualTLS from "./mutual-tls/MutualTLS";

import OpenIdConnect from "./open-id-connect/OpenIdConnect";
import OpenKeyless from "./open-keyless/OpenKeyLess";

export default function Authentication() {
  const dispatch = useAppDispatch();

  const state = useAppSelector((RootState) => RootState.updateApiState);
  const handleFormSelectChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name } = event.target;
    if (name === "EnableMTLS" && event.target.checked === false) {
      const list: string[] = [];
      dispatch(
        setForm({
          ...state.data.form,
          EnableMTLS: event.target.checked,
          CertIds: list,
        })
      );
    } else {
      setFormData(event, dispatch, state);
    }
  };
  return (
    <div>
      <div className="card">
        <div>
          <div className="align-items-center justify-content-around">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <span>Authentication</span>
                </Accordion.Header>
                <Accordion.Body>
                  <div>
                    <Row>
                      <Col md="12">
                        <Form.Group className="mb-3">
                          <Form.Label className="float-left mt-2">
                            {" "}
                            Authentication mode:
                          </Form.Label>
                          <Tooltips
                            content="Changing the Authentication mode on an Active API can have severe
                            consequences for your users. Please be aware that this will stop
                            the current keys working for this API."
                          />
                          <br />
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
                    ) : state.data.form.AuthType === "keyless" ? (
                      <OpenKeyless />
                    ) : (
                      <></>
                    )}
                  </div>
                  <Row>
                    <Col md="12">
                      <Form.Group className="mb-3 ml-4 mt-4">
                        <Form.Check
                          type="switch"
                          id="EnableMTLS"
                          name="EnableMTLS"
                          label="Enable Mutual TLS"
                          // checked={check}
                          // onChange={(e: any) => setCheck(e.target.checked)}
                          checked={state.data.form.EnableMTLS}
                          onChange={(e: any) => handleFormSelectChange(e)}
                        />
                      </Form.Group>
                      {state.data.form.EnableMTLS ? <MutualTLS /> : <></>}
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
