import React, { useState } from "react";
import { Accordion, Col, Form, Row } from "react-bootstrap";
import ExpandCollapse from "../../../../../../components/expand-collapse/ExpandCollapse";
import { generateBreadcrumbs } from "../../../../../../components/scroll-to/ScrollTo";
import {
  regexForName,
  setFormData,
  setFormErrors,
} from "../../../../../../resources/gateway/api/api-constants";
import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";
import Authentication from "./authentication/Authentication";
import ListenPath from "./listen-path/ListenPath";
import RateLimit from "./rate-limit/RateLimit";
import TargetUrl from "./target-url/TargetUrl";

export default function Setting() {
  const state = useAppSelector((RootState) => RootState.updateApiState);
  const dispatch = useAppDispatch();

  const [clipboardApiId, setClipboardApiId] = useState(false);
  const [clipboardApiUrl, setClipboardApiUrl] = useState(false);

  const hostUrl = process.env.REACT_APP_GATEWAY_HOST || "http://localhost:8080";
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

  const copyToClipBoard = async (copyText: any) => {
    try {
      await navigator.clipboard.writeText(copyText);
      if (copyText === state.data.form.ApiId) {
        setClipboardApiId(true);

        setTimeout(() => {
          setClipboardApiId(false);
        }, 5000);
      } else if (copyText === hostUrl + state.data.form.ListenPath) {
        setClipboardApiUrl(true);

        setTimeout(() => {
          setClipboardApiUrl(false);
        }, 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const myRef = useRef<Element>();

  return (
    <>
      {generateBreadcrumbs([
        "ListenPath",
        "TargetUrl",
        "RateLimit",
        "Authentication",
      ])}
      <div className="card">
        <div>
          <div className="align-items-center justify-content-around">
            <Row>
              <Col md={10}>
                <div className="mb-3 mt-2 ml-4">
                  <div>
                    <b>API ID:</b> {state.data.form.ApiId}
                    <i
                      data-testid="apiIdCopy-button"
                      className="btn btn-sm bi bi-clipboard"
                      onClick={() => copyToClipBoard(state.data.form.ApiId)}
                    ></i>
                    {clipboardApiId ? "Copied!" : ""}
                  </div>
                  <br />
                  <div>
                    <b>API URL: </b>
                    <a
                      href={hostUrl + state.data.form.ListenPath}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {hostUrl + state.data.form.ListenPath}
                    </a>
                    <i
                      data-testid="apiUrlCopy-button"
                      className="btn btn-sm bi bi-clipboard"
                      onClick={() =>
                        copyToClipBoard(hostUrl + state.data.form.ListenPath)
                      }
                    ></i>
                    {clipboardApiUrl ? "Copied!" : ""}
                  </div>
                </div>
              </Col>
              <Col md={2}>
                <Form.Group className="mb-3 mt-2 ">
                  <Form.Check
                    className="ml-3"
                    data-testid="isActive-switch"
                    type="switch"
                    onChange={validateForm}
                    checked={state.data.form.IsActive}
                    name="IsActive"
                    id="IsActive"
                    label={state.data.form.IsActive ? "  Active" : "  InActive"}
                  />
                </Form.Group>

                <ExpandCollapse containerId="settingcollapse" />
              </Col>
            </Row>

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
                            data-testid="apiName-input"
                            type="text"
                            id="apiName"
                            placeholder="Enter API Name"
                            name="Name"
                            value={state.data.form?.Name}
                            isInvalid={!!state.data.errors?.Name}
                            isValid={!state.data.errors?.Name}
                            onChange={(e: any) => validateForm(e)}
                          />
                          <Form.Control.Feedback
                            type="invalid"
                            data-testid="nameErr"
                          >
                            {state.data.errors?.Name}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>
                    </Col>
                  </Row>
                  <br />
                  <div id="settingcollapse">
                    <div id="ListenPath">
                      <ListenPath />
                    </div>
                    <div id="TargetUrl">
                      <TargetUrl />
                    </div>
                    <div id="RateLimit">
                      <RateLimit />
                    </div>
                    <div id="Authentication">
                      <Authentication />
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
}
