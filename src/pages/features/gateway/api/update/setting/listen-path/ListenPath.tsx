import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import {
  setFormErrors,
  setFormData,
  regexForListenPath,
} from "../../../../../../resources/api/api-constants";
import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";

export default function ListenPath() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((RootState) => RootState.updateApiState);
  function validateForm(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    switch (name) {
      case "ListenPath":
        setFormErrors(
          {
            ...state.data.errors,
            [name]: regexForListenPath.test(value)
              ? ""
              : "Enter a Valid Listen Path",
          },
          dispatch
        );
        break;
      default:
        break;
    }

    setFormData(event, dispatch, state);
    // console.log("listenpath", name, value);
  }
  return (
    <>
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
              Listen Path
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse show"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionListenPath"
          >
            <div className="accordion-body">
              <Row>
                <Col md={12} className="mb-3">
                  <p>
                    The listen path dictates what path Tyk will listen on, if
                    you leave this blank, it will be automatically populated by
                    the ID of the API.
                  </p>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <b>Listen Path:</b>
                    </Form.Label>

                    <Form.Control
                      type="text"
                      placeholder="Enter listen path"
                      id="listenPath"
                      name="ListenPath"
                      data-testid="name-input"
                      disabled={state.data.form?.IsInternal}
                      value={state.data.form?.ListenPath}
                      isInvalid={!!state.data.errors?.ListenPath}
                      isValid={!state.data.errors?.ListenPath}
                      onChange={(e: any) => validateForm(e)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {state.data.errors?.ListenPath}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <i>
                    If you add a trailing &apos;/ &apos; to your listen path,
                    you can only make requests that include the trailing &apos;/
                    &apos;.
                  </i>
                </Col>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <b>Strip the Listen path</b>
                    </Form.Label>
                    <p>
                      If this setting is checked, then Tyk will remove the above
                      listen path from the inbound URL so that it does not
                      interfere with routing upstream.
                    </p>
                    <Form.Check
                      type="switch"
                      id="stripListenPath"
                      name="StripListenPath"
                      label="Strip the Listen path"
                      disabled={state.data.form?.IsInternal}
                      checked={state.data.form?.StripListenPath}
                      onChange={(e: any) => validateForm(e)}
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <b>Internal</b>
                    </Form.Label>
                    <p>
                      If set, API can&apos;t be accessed except when using
                      Internal
                    </p>

                    <Form.Check
                      type="switch"
                      id="activated"
                      name="IsInternal"
                      label="Activated"
                      checked={state.data.form?.IsInternal}
                      onChange={(e: any) => validateForm(e)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
