import React, { useState } from "react";
import { Accordion, Form, Col, Row, Button, Table } from "react-bootstrap";
import { ToastAlert } from "../../../../../../../components/toast-alert/toast-alert";
import {
  setFormErrors,
  regexForAllowedOrigins,
} from "../../../../../../../resources/gateway/api/api-constants";
import { setForm } from "../../../../../../../store/features/gateway/api/update/slice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../store/hooks";

export default function CorsOptions() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((RootState) => RootState.updateApiState);
  // console.log("state form :", state.data.form);

  const [addAllowedOrigins, setAllowedOrigins] = useState<any>({
    AllowedOrigins: "",
  });

  const [addAllowedMethods, setAllowedMethods] = useState<any>({
    AllowedMethods: "GET",
  });

  const [addAllowedHeaders, setAllowedHeaders] = useState<any>({
    AllowedHeaders: "",
  });

  const [addExposedHeaders, setExposedHeaders] = useState<any>({
    ExposedHeaders: "",
  });

  function handleFormCheckChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = event.target;

    const corsObj = { ...state.data.form.CORS, [name]: checked };
    dispatch(setForm({ ...state.data.form, CORS: corsObj }));
  }

  function handleNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    const corsObj = { ...state.data.form.CORS, [name]: value };
    dispatch(setForm({ ...state.data.form, CORS: corsObj }));
  }

  function handleAllowedOriginsChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = event.target;
    switch (name) {
      case "AllowedOrigins":
        if (value === "") {
          setFormErrors(
            {
              ...state.data.errors,
              [name]: "",
            },
            dispatch
          );
        } else {
          setFormErrors(
            {
              ...state.data.errors,
              [name]: regexForAllowedOrigins.test(value)
                ? ""
                : "Please enter a Valid URL value(i.e. http://)",
            },
            dispatch
          );
        }
        break;
      default:
        break;
    }
    const allowedOrigins = { ...addAllowedOrigins };
    allowedOrigins[name] = value;
    setAllowedOrigins(allowedOrigins);
  }

  const handleAllowedOriginsAddClick = () => {
    if (state.data.form.CORS.AllowedOrigins.length > 0) {
      const filtered = state.data.form.CORS.AllowedOrigins.filter(
        (x) => x === addAllowedOrigins.AllowedOrigins
      );
      if (filtered.length > 0) {
        ToastAlert("This origin has been already added!", "error");
      } else {
        const allowedOrigins: any = [
          ...state.data.form.CORS.AllowedOrigins,
          addAllowedOrigins.AllowedOrigins,
        ];

        const corsObj = {
          IsEnabled: state.data.form.CORS.IsEnabled,
          AllowedOrigins: allowedOrigins,
          AllowedMethods: state.data.form.CORS.AllowedMethods,
          AllowedHeaders: state.data.form.CORS.AllowedHeaders,
          ExposedHeaders: state.data.form.CORS.ExposedHeaders,
          AllowCredentials: state.data.form.CORS.AllowCredentials,
          MaxAge: state.data.form.CORS.MaxAge,
          OptionsPassthrough: state.data.form.CORS.OptionsPassthrough,
          Debug: state.data.form.CORS.Debug,
        };

        dispatch(setForm({ ...state.data.form, CORS: corsObj }));
        setAllowedOrigins({ ...addAllowedOrigins, AllowedOrigins: "" });
      }
    } else {
      const allowedOrigins: any = [
        ...state.data.form.CORS.AllowedOrigins,
        addAllowedOrigins.AllowedOrigins,
      ];

      const corsObj = {
        IsEnabled: state.data.form.CORS.IsEnabled,
        AllowedOrigins: allowedOrigins,
        AllowedMethods: state.data.form.CORS.AllowedMethods,
        AllowedHeaders: state.data.form.CORS.AllowedHeaders,
        ExposedHeaders: state.data.form.CORS.ExposedHeaders,
        AllowCredentials: state.data.form.CORS.AllowCredentials,
        MaxAge: state.data.form.CORS.MaxAge,
        OptionsPassthrough: state.data.form.CORS.OptionsPassthrough,
        Debug: state.data.form.CORS.Debug,
      };

      dispatch(setForm({ ...state.data.form, CORS: corsObj }));
      setAllowedOrigins({ ...addAllowedOrigins, AllowedOrigins: "" });
    }
  };

  const handleAllowedOriginsDeleteRow = (
    index: number,
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.preventDefault();
    const list = [...state.data.form.CORS.AllowedOrigins];
    list.splice(index, 1);
    const corsObj = {
      IsEnabled: state.data.form.CORS.IsEnabled,
      AllowedOrigins: list,
      AllowedMethods: state.data.form.CORS.AllowedMethods,
      AllowedHeaders: state.data.form.CORS.AllowedHeaders,
      ExposedHeaders: state.data.form.CORS.ExposedHeaders,
      AllowCredentials: state.data.form.CORS.AllowCredentials,
      MaxAge: state.data.form.CORS.MaxAge,
      OptionsPassthrough: state.data.form.CORS.OptionsPassthrough,
      Debug: state.data.form.CORS.Debug,
    };

    dispatch(setForm({ ...state.data.form, CORS: corsObj }));
  };

  function handleAllowedMethodsChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    const allowedMethods = { ...addAllowedMethods };
    allowedMethods[name] = value;
    setAllowedMethods(allowedMethods);
  }

  const handleAllowedMethodsAddClick = () => {
    if (state.data.form.CORS.AllowedMethods.length > 0) {
      const filtered = state.data.form.CORS.AllowedMethods.filter(
        (x) => x === addAllowedMethods.AllowedMethods
      );
      if (filtered.length > 0) {
        ToastAlert("This method has been already added!", "error");
      } else {
        const allowedMethods: any = [
          ...state.data.form.CORS.AllowedMethods,
          addAllowedMethods.AllowedMethods,
        ];

        const corsObj = {
          IsEnabled: state.data.form.CORS.IsEnabled,
          AllowedOrigins: state.data.form.CORS.AllowedOrigins,
          AllowedMethods: allowedMethods,
          AllowedHeaders: state.data.form.CORS.AllowedHeaders,
          ExposedHeaders: state.data.form.CORS.ExposedHeaders,
          AllowCredentials: state.data.form.CORS.AllowCredentials,
          MaxAge: state.data.form.CORS.MaxAge,
          OptionsPassthrough: state.data.form.CORS.OptionsPassthrough,
          Debug: state.data.form.CORS.Debug,
        };

        dispatch(setForm({ ...state.data.form, CORS: corsObj }));
      }
    } else {
      const allowedMethods: any = [
        ...state.data.form.CORS.AllowedMethods,
        addAllowedMethods.AllowedMethods,
      ];

      const corsObj = {
        IsEnabled: state.data.form.CORS.IsEnabled,
        AllowedOrigins: state.data.form.CORS.AllowedOrigins,
        AllowedMethods: allowedMethods,
        AllowedHeaders: state.data.form.CORS.AllowedHeaders,
        ExposedHeaders: state.data.form.CORS.ExposedHeaders,
        AllowCredentials: state.data.form.CORS.AllowCredentials,
        MaxAge: state.data.form.CORS.MaxAge,
        OptionsPassthrough: state.data.form.CORS.OptionsPassthrough,
        Debug: state.data.form.CORS.Debug,
      };

      dispatch(setForm({ ...state.data.form, CORS: corsObj }));
    }
  };

  const handleAllowedMethodsDeleteRow = (
    index: number,
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.preventDefault();
    const list = [...state.data.form.CORS.AllowedMethods];
    list.splice(index, 1);
    const corsObj = {
      IsEnabled: state.data.form.CORS.IsEnabled,
      AllowedOrigins: state.data.form.CORS.AllowedOrigins,
      AllowedMethods: list,
      AllowedHeaders: state.data.form.CORS.AllowedHeaders,
      ExposedHeaders: state.data.form.CORS.ExposedHeaders,
      AllowCredentials: state.data.form.CORS.AllowCredentials,
      MaxAge: state.data.form.CORS.MaxAge,
      OptionsPassthrough: state.data.form.CORS.OptionsPassthrough,
      Debug: state.data.form.CORS.Debug,
    };

    dispatch(setForm({ ...state.data.form, CORS: corsObj }));
  };

  function handleAllowedHeadersChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = event.target;
    const allowedHeaders = { ...addAllowedHeaders };
    allowedHeaders[name] = value;
    setAllowedHeaders(allowedHeaders);
  }

  const handleAllowedHeadersAddClick = () => {
    if (state.data.form.CORS.AllowedHeaders.length > 0) {
      const filtered = state.data.form.CORS.AllowedHeaders.filter(
        (x) => x === addAllowedHeaders.AllowedHeaders
      );
      if (filtered.length > 0) {
        ToastAlert("This header has been already added!", "error");
      } else {
        const allowedHeaders: any = [
          ...state.data.form.CORS.AllowedHeaders,
          addAllowedHeaders.AllowedHeaders,
        ];

        const corsObj = {
          IsEnabled: state.data.form.CORS.IsEnabled,
          AllowedOrigins: state.data.form.CORS.AllowedOrigins,
          AllowedMethods: state.data.form.CORS.AllowedMethods,
          AllowedHeaders: allowedHeaders,
          ExposedHeaders: state.data.form.CORS.ExposedHeaders,
          AllowCredentials: state.data.form.CORS.AllowCredentials,
          MaxAge: state.data.form.CORS.MaxAge,
          OptionsPassthrough: state.data.form.CORS.OptionsPassthrough,
          Debug: state.data.form.CORS.Debug,
        };

        dispatch(setForm({ ...state.data.form, CORS: corsObj }));
        setAllowedHeaders({ ...addAllowedHeaders, AllowedHeaders: "" });
      }
    } else {
      const allowedHeaders: any = [
        ...state.data.form.CORS.AllowedHeaders,
        addAllowedHeaders.AllowedHeaders,
      ];

      const corsObj = {
        IsEnabled: state.data.form.CORS.IsEnabled,
        AllowedOrigins: state.data.form.CORS.AllowedOrigins,
        AllowedMethods: state.data.form.CORS.AllowedMethods,
        AllowedHeaders: allowedHeaders,
        ExposedHeaders: state.data.form.CORS.ExposedHeaders,
        AllowCredentials: state.data.form.CORS.AllowCredentials,
        MaxAge: state.data.form.CORS.MaxAge,
        OptionsPassthrough: state.data.form.CORS.OptionsPassthrough,
        Debug: state.data.form.CORS.Debug,
      };

      dispatch(setForm({ ...state.data.form, CORS: corsObj }));
      setAllowedHeaders({ ...addAllowedHeaders, AllowedHeaders: "" });
    }
  };

  const handleAllowedHeadersDeleteRow = (
    index: number,
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.preventDefault();
    const list = [...state.data.form.CORS.AllowedHeaders];
    list.splice(index, 1);
    const corsObj = {
      IsEnabled: state.data.form.CORS.IsEnabled,
      AllowedOrigins: state.data.form.CORS.AllowedOrigins,
      AllowedMethods: state.data.form.CORS.AllowedMethods,
      AllowedHeaders: list,
      ExposedHeaders: state.data.form.CORS.ExposedHeaders,
      AllowCredentials: state.data.form.CORS.AllowCredentials,
      MaxAge: state.data.form.CORS.MaxAge,
      OptionsPassthrough: state.data.form.CORS.OptionsPassthrough,
      Debug: state.data.form.CORS.Debug,
    };

    dispatch(setForm({ ...state.data.form, CORS: corsObj }));
  };

  function handleExposedHeadersChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = event.target;
    const exposedHeaders = { ...addExposedHeaders };
    exposedHeaders[name] = value;
    setExposedHeaders(exposedHeaders);
  }

  const handleExposedHeadersAddClick = () => {
    if (state.data.form.CORS.ExposedHeaders.length > 0) {
      const filtered = state.data.form.CORS.ExposedHeaders.filter(
        (x) => x === addExposedHeaders.ExposedHeaders
      );
      if (filtered.length > 0) {
        ToastAlert("This header has been already added!", "error");
      } else {
        const exposedHeaders: any = [
          ...state.data.form.CORS.ExposedHeaders,
          addExposedHeaders.ExposedHeaders,
        ];

        const corsObj = {
          IsEnabled: state.data.form.CORS.IsEnabled,
          AllowedOrigins: state.data.form.CORS.AllowedOrigins,
          AllowedMethods: state.data.form.CORS.AllowedMethods,
          AllowedHeaders: state.data.form.CORS.AllowedHeaders,
          ExposedHeaders: exposedHeaders,
          AllowCredentials: state.data.form.CORS.AllowCredentials,
          MaxAge: state.data.form.CORS.MaxAge,
          OptionsPassthrough: state.data.form.CORS.OptionsPassthrough,
          Debug: state.data.form.CORS.Debug,
        };

        dispatch(setForm({ ...state.data.form, CORS: corsObj }));
        setExposedHeaders({ ...addExposedHeaders, ExposedHeaders: "" });
      }
    } else {
      const exposedHeaders: any = [
        ...state.data.form.CORS.ExposedHeaders,
        addExposedHeaders.ExposedHeaders,
      ];

      const corsObj = {
        IsEnabled: state.data.form.CORS.IsEnabled,
        AllowedOrigins: state.data.form.CORS.AllowedOrigins,
        AllowedMethods: state.data.form.CORS.AllowedMethods,
        AllowedHeaders: state.data.form.CORS.AllowedHeaders,
        ExposedHeaders: exposedHeaders,
        AllowCredentials: state.data.form.CORS.AllowCredentials,
        MaxAge: state.data.form.CORS.MaxAge,
        OptionsPassthrough: state.data.form.CORS.OptionsPassthrough,
        Debug: state.data.form.CORS.Debug,
      };

      dispatch(setForm({ ...state.data.form, CORS: corsObj }));
      setExposedHeaders({ ...addExposedHeaders, ExposedHeaders: "" });
    }
  };

  const handleExposedHeadersDeleteRow = (
    index: number,
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.preventDefault();
    const list = [...state.data.form.CORS.ExposedHeaders];
    list.splice(index, 1);
    const corsObj = {
      IsEnabled: state.data.form.CORS.IsEnabled,
      AllowedOrigins: state.data.form.CORS.AllowedOrigins,
      AllowedMethods: state.data.form.CORS.AllowedMethods,
      AllowedHeaders: state.data.form.CORS.AllowedHeaders,
      ExposedHeaders: list,
      AllowCredentials: state.data.form.CORS.AllowCredentials,
      MaxAge: state.data.form.CORS.MaxAge,
      OptionsPassthrough: state.data.form.CORS.OptionsPassthrough,
      Debug: state.data.form.CORS.Debug,
    };

    dispatch(setForm({ ...state.data.form, CORS: corsObj }));
  };

  return (
    <div>
      <div className="card">
        <div>
          <div className="align-items-center justify-content-around">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <span>CORS Options</span>
                </Accordion.Header>
                <Accordion.Body>
                  <div>
                    <Row>
                      <Col md="12">
                        <b>CORS Options</b>
                      </Col>
                      <br />
                      <Col md="12">
                        <Form.Group className="mb-3 ml-4">
                          <Form.Check
                            type="switch"
                            data-testid="enableCors-switch"
                            label="Enable CORS"
                            name="IsEnabled"
                            checked={state.data.form.CORS.IsEnabled}
                            onChange={(e: any) => handleFormCheckChange(e)}
                          />
                        </Form.Group>
                      </Col>
                      <Col md="12">
                        <Form.Group className="mb-3 ml-4">
                          <Form.Check
                            type="switch"
                            data-testid="allowCred-switch"
                            label="Allow credentials"
                            name="AllowCredentials"
                            checked={state.data.form.CORS.AllowCredentials}
                            onChange={(e: any) => handleFormCheckChange(e)}
                          />
                        </Form.Group>
                      </Col>
                      <Col md="12">
                        <Form.Group className="mb-3 ml-4">
                          <Form.Check
                            type="switch"
                            data-testid="optionPass-switch"
                            label="Options pass through"
                            name="OptionsPassthrough"
                            checked={state.data.form.CORS.OptionsPassthrough}
                            onChange={(e: any) => handleFormCheckChange(e)}
                          />
                        </Form.Group>
                      </Col>
                      <Col md="12">
                        <p>Max credentials age:</p>
                      </Col>
                      <Col md="3">
                        <Form.Group className="mb-3">
                          <Form.Control
                            type="number"
                            data-testid="maxAge-input"
                            placeholder="1"
                            id="MaxCredentialsAge"
                            name="MaxAge"
                            value={state.data.form.CORS.MaxAge}
                            onChange={(e: any) => handleNumberChange(e)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Row>
                        <Form.Label>
                          <b>Allowed origins:</b>
                        </Form.Label>
                        <Col md={10}>
                          <Form.Group className="mt-0">
                            <Form.Control
                              type="text"
                              data-testid="allowedOrigin-input"
                              placeholder="http://localhost"
                              id="AllowedOrigins"
                              name="AllowedOrigins"
                              isInvalid={!!state.data.errors?.AllowedOrigins}
                              isValid={!state.data.errors?.AllowedOrigins}
                              value={addAllowedOrigins.AllowedOrigins}
                              onChange={(e: any) =>
                                handleAllowedOriginsChange(e)
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {state.data.errors?.AllowedOrigins}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={2}>
                          <Form.Group className="mb-5">
                            <Form.Label></Form.Label>
                            <Button
                              variant="dark"
                              data-testid="add-allowedOrigin"
                              disabled={!addAllowedOrigins.AllowedOrigins}
                              onClick={() => handleAllowedOriginsAddClick()}
                            >
                              Add
                            </Button>{" "}
                          </Form.Group>
                        </Col>
                      </Row>
                      {
                        <Row className="mr-5">
                          <Col md={10}>
                            <Table striped bordered hover size="lg">
                              {state.data.form.CORS.AllowedOrigins.length >
                              0 ? (
                                <thead>
                                  <tr>
                                    <th>Allowed origins</th>
                                    <th style={{ textAlign: "center" }}>
                                      Action
                                    </th>
                                  </tr>
                                </thead>
                              ) : (
                                <></>
                              )}

                              <tbody>
                                {state.data.form.CORS.AllowedOrigins.map(
                                  (data: any, index: any) => {
                                    return (
                                      <tr key={index}>
                                        <td>{data}</td>
                                        <td style={{ textAlign: "center" }}>
                                          <i
                                            data-testid="delete-allowedOrigin"
                                            className="btn btn-sm bi bi-trash-fill"
                                            onClick={(event) =>
                                              handleAllowedOriginsDeleteRow(
                                                index,
                                                event
                                              )
                                            }
                                          ></i>
                                        </td>
                                      </tr>
                                    );
                                  }
                                )}
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                      }
                      <Row>
                        <Form.Label>
                          <b>Allowed methods:</b>
                        </Form.Label>
                        <Col md={10}>
                          <Form.Group className="mt-0">
                            <Form.Select
                              name="AllowedMethods"
                              data-testid="allowedMethods-dropdown"
                              id="AllowedMethods"
                              onClick={(e: any) =>
                                handleAllowedMethodsChange(e)
                              }
                            >
                              {/* <option></option> */}
                              <option>GET</option>
                              <option>POST</option>
                              <option>PUT</option>
                              <option>PATCH</option>
                              <option>DELETE</option>
                              <option>OPTIONS</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={2}>
                          <Form.Group className="mb-5">
                            <Form.Label></Form.Label>
                            <Button
                              variant="dark"
                              data-testid="allowedMethods-add"
                              onClick={() => handleAllowedMethodsAddClick()}
                            >
                              Add
                            </Button>{" "}
                          </Form.Group>
                        </Col>
                      </Row>
                      {
                        <Row className="mr-5">
                          <Col md={10}>
                            <Table striped bordered hover size="lg">
                              {state.data.form.CORS.AllowedMethods.length >
                              0 ? (
                                <thead>
                                  <tr>
                                    <th>Allowed methods</th>
                                    <th style={{ textAlign: "center" }}>
                                      Action
                                    </th>
                                  </tr>
                                </thead>
                              ) : (
                                <></>
                              )}

                              <tbody>
                                {state.data.form.CORS.AllowedMethods.map(
                                  (data: any, index: any) => {
                                    return (
                                      <tr key={index}>
                                        <td>{data}</td>
                                        <td style={{ textAlign: "center" }}>
                                          <i
                                            data-testid="delete-allowedMethods"
                                            className="btn btn-sm bi bi-trash-fill"
                                            onClick={(event) =>
                                              handleAllowedMethodsDeleteRow(
                                                index,
                                                event
                                              )
                                            }
                                          ></i>
                                        </td>
                                      </tr>
                                    );
                                  }
                                )}
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                      }
                      <Row>
                        <Form.Label>
                          <b>Allowed headers:</b>
                        </Form.Label>
                        <Col md={10}>
                          <Form.Group className="mt-0">
                            <Form.Control
                              type="text"
                              data-testid="allowedHeaders-input"
                              placeholder="x-gateway-id"
                              id="AllowedHeaders"
                              name="AllowedHeaders"
                              value={addAllowedHeaders.AllowedHeaders}
                              onChange={(e: any) =>
                                handleAllowedHeadersChange(e)
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col md={2}>
                          <Form.Group className="mb-5">
                            <Form.Label></Form.Label>
                            <Button
                              variant="dark"
                              data-testid="allowedHeaders-add"
                              disabled={!addAllowedHeaders.AllowedHeaders}
                              onClick={() => handleAllowedHeadersAddClick()}
                            >
                              Add
                            </Button>{" "}
                          </Form.Group>
                        </Col>
                      </Row>
                      {
                        <Row className="mr-5">
                          <Col md={10}>
                            <Table striped bordered hover size="lg">
                              {state.data.form.CORS.AllowedHeaders.length >
                              0 ? (
                                <thead>
                                  <tr>
                                    <th>Allowed headers</th>
                                    <th style={{ textAlign: "center" }}>
                                      Action
                                    </th>
                                  </tr>
                                </thead>
                              ) : (
                                <></>
                              )}

                              <tbody>
                                {state.data.form.CORS.AllowedHeaders.map(
                                  (data: any, index: any) => {
                                    return (
                                      <tr key={index}>
                                        <td>{data}</td>
                                        <td style={{ textAlign: "center" }}>
                                          <i
                                            data-testid="allowedHeaders-delete"
                                            className="btn btn-sm bi bi-trash-fill"
                                            onClick={(event) =>
                                              handleAllowedHeadersDeleteRow(
                                                index,
                                                event
                                              )
                                            }
                                          ></i>
                                        </td>
                                      </tr>
                                    );
                                  }
                                )}
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                      }
                      <Row>
                        <Form.Label>
                          <b>Exposed headers:</b>
                        </Form.Label>
                        <Col md={10}>
                          <Form.Group className="mt-0">
                            <Form.Control
                              type="text"
                              data-testid="exposeHeaders-input"
                              placeholder="x-gateway-id"
                              id="ExposedHeaders"
                              name="ExposedHeaders"
                              value={addExposedHeaders.ExposedHeaders}
                              onChange={(e: any) =>
                                handleExposedHeadersChange(e)
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col md={2}>
                          <Form.Group className="mb-5">
                            <Form.Label></Form.Label>
                            <Button
                              variant="dark"
                              data-testid="exposeHeaders-add"
                              disabled={!addExposedHeaders.ExposedHeaders}
                              onClick={() => handleExposedHeadersAddClick()}
                            >
                              Add
                            </Button>{" "}
                          </Form.Group>
                        </Col>
                      </Row>
                      {
                        <Row className="mr-5">
                          <Col md={10}>
                            <Table striped bordered hover size="lg">
                              {state.data.form.CORS.ExposedHeaders.length >
                              0 ? (
                                <thead>
                                  <tr>
                                    <th>Exposed headers</th>
                                    <th style={{ textAlign: "center" }}>
                                      Action
                                    </th>
                                  </tr>
                                </thead>
                              ) : (
                                <></>
                              )}

                              <tbody>
                                {state.data.form.CORS.ExposedHeaders.map(
                                  (data: any, index: any) => {
                                    return (
                                      <tr key={index}>
                                        <td>{data}</td>
                                        <td style={{ textAlign: "center" }}>
                                          <i
                                            data-testid="exposeHeaders-delete"
                                            className="btn btn-sm bi bi-trash-fill"
                                            onClick={(event) =>
                                              handleExposedHeadersDeleteRow(
                                                index,
                                                event
                                              )
                                            }
                                          ></i>
                                        </td>
                                      </tr>
                                    );
                                  }
                                )}
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                      }
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
