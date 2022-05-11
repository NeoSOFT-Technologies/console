import React, { useState, useEffect } from "react";
import { Accordion, Form, Col, Row, Button, Table } from "react-bootstrap";
import { ToastAlert } from "../../../../../../../components/toast-alert/toast-alert";
import {
  setFormErrors,
  regexForIP_Address,
} from "../../../../../../../resources/gateway/api/api-constants";
import { setForm } from "../../../../../../../store/features/gateway/api/update/slice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../store/hooks";

export default function WhitelistedIPs() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((RootState) => RootState.updateApiState);
  // console.log("state:", state.data.form);

  const [enableWhitelist, setWhitelist] = useState(false);

  const whitelistLength = state.data.form.Whitelist.length;

  useEffect(() => {
    if (whitelistLength > 0) {
      setWhitelist(true);
    }
  }, []);

  const [addFormData, setAddFormData] = useState<any>({
    Whitelist: "",
  });

  function setEnableWhitelist(event: React.ChangeEvent<HTMLInputElement>) {
    setWhitelist(event.target.checked);
    if (event.target.checked === false) {
      const whitelistObj: any = [];
      dispatch(setForm({ ...state.data.form, Whitelist: whitelistObj }));
    }
  }

  const handleFormInputChange = (event: any) => {
    const { name, value } = event.target;
    switch (name) {
      case "Whitelist":
        setFormErrors(
          {
            ...state.data.errors,
            [name]: regexForIP_Address.test(value)
              ? ""
              : "Please enter a Valid IP Address",
          },
          dispatch
        );
        break;
      default:
        break;
    }
    const formobj = { ...addFormData };
    formobj[name] = value;
    setAddFormData(formobj);
  };

  const handleAddClick = () => {
    if (whitelistLength > 0) {
      const filtered = state.data.form.Whitelist.filter(
        (x) => x === addFormData.Whitelist
      );
      if (filtered.length > 0) {
        ToastAlert("This IP address has been already added!", "error");
      } else {
        const whitelistObj: any = [
          ...state.data.form.Whitelist,
          addFormData.Whitelist,
        ];
        dispatch(setForm({ ...state.data.form, Whitelist: whitelistObj }));
        setAddFormData({ ...addFormData, Whitelist: "" });
      }
    } else {
      const whitelistObj: any = [
        ...state.data.form.Whitelist,
        addFormData.Whitelist,
      ];
      dispatch(setForm({ ...state.data.form, Whitelist: whitelistObj }));
      setAddFormData({ ...addFormData, Whitelist: "" });
    }
  };

  const deleteTableRows = (
    index: number,
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.preventDefault();
    const list = [...state.data.form.Whitelist];
    list.splice(index, 1);
    dispatch(setForm({ ...state.data.form, Whitelist: list }));
  };

  return (
    <div>
      <div className="card">
        <div>
          <div className="align-items-center justify-content-around">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <span>Whitelisted IPs</span>
                </Accordion.Header>
                <Accordion.Body>
                  <div>
                    <Row>
                      <Col md="12">
                        <b>Enable Whitelisted IPs</b>
                        <p>
                          Whitelisted IPs limit the originating address of a
                          request to only come from a select group of addresses.
                        </p>
                      </Col>
                      <Col md="12">
                        <Form.Group className="mb-3 ml-4">
                          <Form.Check
                            type="switch"
                            label="Enable Whitelisted IPs"
                            name="whitelisted"
                            checked={enableWhitelist}
                            onChange={(e: any) => setEnableWhitelist(e)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    {enableWhitelist ? (
                      <div>
                        <Row>
                          {/* <b>Whitelisted IPs</b> */}
                          {whitelistLength > 0 ? (
                            <></>
                          ) : (
                            <p>No IPs selected, please add one below.</p>
                          )}
                          <Row>
                            <Form.Label>
                              <b>Whitelisted IP Address:</b>
                            </Form.Label>
                            <Col md={10}>
                              <Form.Group className="mt-0">
                                <Form.Control
                                  type="text"
                                  placeholder="127.0.0.1"
                                  id="whitelist"
                                  name="Whitelist"
                                  value={addFormData.Whitelist}
                                  isInvalid={!!state.data.errors?.Whitelist}
                                  isValid={!state.data.errors?.Whitelist}
                                  onChange={(event) =>
                                    handleFormInputChange(event)
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {state.data.errors?.Whitelist}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col md={2}>
                              <Form.Group className="mb-5">
                                <Form.Label></Form.Label>
                                <Button
                                  variant="dark"
                                  disabled={!addFormData.Whitelist}
                                  onClick={() => handleAddClick()}
                                >
                                  Add
                                </Button>{" "}
                              </Form.Group>
                            </Col>
                          </Row>
                        </Row>

                        {
                          <Row className="mr-5">
                            <Col md={10}>
                              <Table striped bordered hover size="lg">
                                {whitelistLength > 0 ? (
                                  <thead>
                                    <tr>
                                      <th>IP Address</th>
                                      <th style={{ textAlign: "center" }}>
                                        Action
                                      </th>
                                    </tr>
                                  </thead>
                                ) : (
                                  <></>
                                )}
                                <tbody>
                                  {state.data.form.Whitelist.map(
                                    (data: any, index: any) => {
                                      return (
                                        <tr key={index}>
                                          <td>{data}</td>
                                          <td style={{ textAlign: "center" }}>
                                            <i
                                              className="bi bi-trash"
                                              onClick={(event) =>
                                                deleteTableRows(index, event)
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
                      </div>
                    ) : (
                      <></>
                    )}
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
