import React, { useState } from "react";
import { Button, Form, Row, Col, Accordion } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  AuthGuard,
  access,
} from "../../../../../components/gateway/auth-guard";
import { ToastAlert } from "../../../../../components/toast-alert/toast-alert";
import {
  regexForName,
  regexForListenPath,
  regexForTagetUrl,
} from "../../../../../resources/gateway/api/api-constants";
import {
  IErrorApiInput,
  IApiFormData,
} from "../../../../../store/features/gateway/api/create/index";
import { addNewApi } from "../../../../../store/features/gateway/api/create/slice";
import { getApiById } from "../../../../../store/features/gateway/api/update/slice";
import { useAppDispatch } from "../../../../../store/hooks";
function CreateApi() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [apisForm, setForm] = useState<IApiFormData>({
    name: "",
    listenPath: "",
    targetUrl: "",
    stripListenPath: true,
    isActive: true,
  });

  const [err, setFormErrors] = useState<IErrorApiInput>({
    name: "",
    targetUrl: "",
    listenPath: "",
    // status: true,
  });
  const validateForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setFormErrors({
          ...err,
          [name]: regexForName.test(value)
            ? ""
            : "Enter valid Api Name eg: abcd or Abcd1",
        });
        break;
      case "listenPath":
        setFormErrors({
          ...err,
          [name]: regexForListenPath.test(value)
            ? ""
            : "Enter a Valid Listen Path eg: /abc/",
        });
        break;

      case "targetUrl":
        setFormErrors({
          ...err,
          [name]: regexForTagetUrl.test(value) ? "" : "Enter a Valid url",
        });
        break;

      default:
        break;
    }
    const value1 =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setForm({ ...apisForm, [name]: value1 });
  };

  const handleValidate = () => {
    const validate =
      err.name === "" && err.listenPath === "" && err.targetUrl === "";
    return validate;
  };
  const handleSubmitApi = async (event: React.FormEvent) => {
    event.preventDefault();

    if (handleValidate()) {
      const result = await dispatch(
        addNewApi({
          ...apisForm,
        })
      );
      if (result.meta.requestStatus === "rejected") {
        ToastAlert(result.payload.message, "error");
      } else {
        const valId: string = result.payload.Data.ApiId;
        ToastAlert("Api created successfully", "success");
        if (valId) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          await dispatch(getApiById(valId));
          navigate(`/gateway/apis/update/${valId}`);
        }
      }
    } else {
      ToastAlert("Please fill all the fields correctly", "error");
    }
  };

  const NavigateToApisList = (
    val: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    val.preventDefault();
    navigate("/gateway/apis");
  };
  return (
    <>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="align-items-center">
            <Form onSubmit={handleSubmitApi} data-testid="form-input">
              <div
                className="card-header bg-white mt-3 pt-1 pb-4"
                style={{ padding: "0.5rem 1.5rem" }}
              >
                <AuthGuard
                  resource={access.resources.Api}
                  scope={access.scopes.Create}
                >
                  <Button
                    className="btn btn-sm btn-success btn-md d-flex float-right mb-3 mr-3"
                    type="submit"
                    data-testid="submit-input"
                  >
                    Save
                  </Button>
                </AuthGuard>

                <Button
                  className="btn btn-sm btn-light btn-md d-flex float-right mb-3"
                  type="button"
                  data-testid="cancel-input"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                    NavigateToApisList(event)
                  }
                >
                  Cancel
                </Button>
                <span>
                  <b>CREATE API</b>
                </span>
              </div>
              <div>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <span>Create Api</span>
                    </Accordion.Header>
                    <Accordion.Body>
                      <Row>
                        <Col md="12">
                          <Form.Group className="mt-6">
                            <Form.Label> API Name :</Form.Label>
                            <Form.Control
                              type="text"
                              id="name"
                              placeholder="Enter API Name"
                              name="name"
                              data-testid="name-input"
                              value={apisForm.name}
                              isInvalid={!!err.name}
                              isValid={!err.name && !!apisForm.name}
                              onChange={validateForm}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              {err.name}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md="12">
                          <Form.Group className="mt-3">
                            <Form.Label>Listen Path :</Form.Label>
                            <Form.Control
                              type="text"
                              name="listenPath"
                              id="listenPath"
                              data-testid="listenPath-input"
                              placeholder="Enter Listen Path"
                              isValid={!err.listenPath && !!apisForm.listenPath}
                              value={apisForm.listenPath}
                              isInvalid={!!err.listenPath}
                              onChange={validateForm}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              {err.listenPath}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md="12">
                          <Form.Group className="mt-2">
                            <Form.Label>Target Url :</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Target Url"
                              name="targetUrl"
                              id="targetUrl"
                              data-testid="targetUrl-input"
                              isValid={!err.targetUrl && !!apisForm.targetUrl}
                              value={apisForm.targetUrl}
                              isInvalid={!!err.targetUrl}
                              onChange={validateForm}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              {err.targetUrl}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>

                        <Col md="12">
                          <Form.Group className="mb-3 mt-3">
                            <Form.Label>API Status :</Form.Label>
                            <Form.Check
                              type="switch"
                              onChange={validateForm}
                              data-testid="isActive-input"
                              checked={apisForm.isActive}
                              name="isActive"
                              id="isActive"
                              label={
                                apisForm.isActive ? "  Active" : "  InActive"
                              }
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateApi;
