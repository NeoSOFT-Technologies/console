import React, { useState } from "react";
import { Accordion, Button, Col, Form, Row } from "react-bootstrap";
import { ToastAlert } from "../../../../../../../components/toast-alert/toast-alert";
import {
  regexForOverrideTarget,
  setFormErrors,
} from "../../../../../../../resources/gateway/api/api-constants";
import { setForm } from "../../../../../../../store/features/gateway/api/update/slice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../store/hooks";

export default function Versions() {
  const dispatch = useAppDispatch();

  const state = useAppSelector((RootState) => RootState.updateApiState);

  const [addFormData, setAddFormData] = useState({
    Name: "",
    OverrideTarget: "",
    Expires: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case "OverrideTarget":
        setFormErrors(
          {
            ...state.data.errors,
            [name]: regexForOverrideTarget.test(value)
              ? ""
              : "Enter a Valid Override Target Host",
          },
          dispatch
        );
        break;
      default:
        break;
    }

    const newFormData: any = { ...addFormData };
    newFormData[name] = value;
    setAddFormData(newFormData);
  };

  const handleAddClick = () => {
    if (state.data.form.Versions.length > 0) {
      const filtered = state.data.form.Versions.filter(
        (x) => x.Name === addFormData.Name
      );
      if (filtered.length > 0) {
        ToastAlert("This version name has been already added!", "error");
      } else {
        const list = [
          ...state.data.form.Versions,
          {
            Name: addFormData.Name,
            OverrideTarget: addFormData.OverrideTarget,
            Expires: addFormData.Expires,
            GlobalRequestHeaders: {},
            GlobalRequestHeadersRemove: [],
            GlobalResponseHeaders: {},
            GlobalResponseHeadersRemove: [],
            ExtendedPaths: undefined,
          },
        ];
        dispatch(setForm({ ...state.data.form, Versions: list }));
        setAddFormData({ Name: "", Expires: "", OverrideTarget: "" });
      }
    } else {
      const list = [
        ...state.data.form.Versions,
        {
          Name: addFormData.Name,
          OverrideTarget: addFormData.OverrideTarget,
          Expires: addFormData.Expires,
          GlobalRequestHeaders: {},
          GlobalRequestHeadersRemove: [],
          GlobalResponseHeaders: {},
          GlobalResponseHeadersRemove: [],
          ExtendedPaths: undefined,
        },
      ];
      dispatch(setForm({ ...state.data.form, Versions: list }));
      setAddFormData({ Name: "", Expires: "", OverrideTarget: "" });
    }
  };

  const deleteTableRows = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    const list = [...state.data.form.Versions];
    list.splice(index, 1);
    dispatch(setForm({ ...state.data.form, Versions: list }));
  };

  const handleTableRowsInputChange = (index: number, evnt: any) => {
    const { name, value } = evnt.target;

    const versionsList = [...state.data.form.Versions];
    versionsList[index] = { ...versionsList[index], [name]: value };
    dispatch(setForm({ ...state.data.form, Versions: versionsList }));
  };

  const handleFormSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;

    dispatch(setForm({ ...state.data.form, DefaultVersion: value }));
  };

  return (
    <>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <span>Versions</span>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col md={12} className="mb-3">
                <i>
                  Add versions using the fields below. Leave the expiry field
                  empty for the version to never expire. Your local time will be
                  automatically converted to UTC time.
                </i>
                <Form.Group className="mt-3">
                  <Form.Label>
                    <b>Choose a version:</b>
                  </Form.Label>
                  <br></br>
                  <Form.Select
                    name="DefaultVersion"
                    id="defaultVersion"
                    value={state.data.form?.DefaultVersion}
                    onChange={handleFormSelectChange}
                  >
                    {state.data.form?.Versions.map((item) => {
                      return (
                        <option
                          key={item.Name}
                          value={item.Name}
                          id={item.Name}
                        >
                          {item.Name}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>

                <i>
                  If you do not set this and no specific version is requested,
                  Your API request will fail with an error.
                </i>
              </Col>
            </Row>
            <Row>
              <Row>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <b>Version:</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Version name(key value)"
                      id="versionName"
                      name="Name"
                      value={addFormData.Name}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <b>Override Target Host:</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="http://override-target.com"
                      id="overrideTarget"
                      name="OverrideTarget"
                      value={addFormData.OverrideTarget}
                      isInvalid={!!state.data.errors?.OverrideTarget}
                      isValid={!state.data.errors?.OverrideTarget}
                      onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {state.data.errors?.OverrideTarget}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <b>Expires:</b>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="Expires"
                      placeholder="Expiring date"
                      value={addFormData.Expires}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={2} className="pt-2">
                  <Form.Label></Form.Label>
                  <Form.Group className="mb-3">
                    <Button
                      variant="dark"
                      disabled={!addFormData.Name}
                      onClick={handleAddClick}
                    >
                      Add
                    </Button>{" "}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <div className="container">
                  <div className="row">
                    <div className="mb-1">
                      <b>Version List:</b>
                    </div>
                    <div className="col-sm-11">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Version</th>
                            <th>Override Target Host</th>
                            <th>Expires</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {state.data.form?.Versions.map(
                            (data: any, index: any) => {
                              const { Name, OverrideTarget, Expires } = data;
                              return (
                                <tr key={index}>
                                  <td>
                                    <input
                                      type="text"
                                      value={Name}
                                      onChange={(evnt) =>
                                        handleTableRowsInputChange(index, evnt)
                                      }
                                      name="Name"
                                      className="form-control"
                                    />
                                  </td>
                                  <td>
                                    {/* <input
                                      type="text"
                                      value={OverrideTarget}
                                      onChange={(evnt) =>
                                        handleTableRowsInputChange(index, evnt)
                                      }
                                      name="OverrideTarget"
                                      className="form-control"
                                    />{" "} */}

                                    <Form.Control
                                      type="text"
                                      placeholder="http://override-target.com"
                                      id="overrideTarget"
                                      name="OverrideTarget"
                                      value={OverrideTarget}
                                      isInvalid={
                                        !!state.data.errors?.OverrideTarget
                                      }
                                      isValid={
                                        !state.data.errors?.OverrideTarget
                                      }
                                      onChange={(evnt) =>
                                        handleTableRowsInputChange(index, evnt)
                                      }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      {state.data.errors?.OverrideTarget}
                                    </Form.Control.Feedback>
                                  </td>
                                  <td>
                                    <input
                                      type="date"
                                      value={Expires}
                                      onChange={(evnt) =>
                                        handleTableRowsInputChange(index, evnt)
                                      }
                                      name="Expires"
                                      className="form-control"
                                    />{" "}
                                  </td>
                                  <td>
                                    <button
                                      className="btn bi bi-trash-fill"
                                      onClick={(e) => deleteTableRows(e, index)}
                                    ></button>
                                  </td>
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div className="col-sm-4"></div>
                  </div>
                </div>
              </Row>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
