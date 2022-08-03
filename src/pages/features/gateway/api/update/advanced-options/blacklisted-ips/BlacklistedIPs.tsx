import React, { useState, useEffect } from "react";
import { Accordion, Form, Col, Row, Button, Table } from "react-bootstrap";
import { ToastAlert } from "../../../../../../../components/toast-alert/toast-alert";
import {
  setFormErrors,
  // regexForIPAddress,
} from "../../../../../../../resources/gateway/api/api-constants";
import { setForm } from "../../../../../../../store/features/gateway/api/update/slice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../store/hooks";
import { handleFormInputChange } from "../whitelisted-ips/WhitelistedIPs";

export default function BlacklistedIPs() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((RootState) => RootState.updateApiState);

  const [enableBlacklist, setBlacklist] = useState(false);

  const blacklistLength = state.data.form.Blacklist.length;

  useEffect(() => {
    if (blacklistLength > 0) {
      setBlacklist(true);
    }
  }, []);

  const [addFormData, setAddFormData] = useState<any>({
    Blacklist: "",
  });

  function setEnableBlacklist(event: React.ChangeEvent<HTMLInputElement>) {
    setBlacklist(event.target.checked);
    if (event.target.checked === false) {
      const blacklistObj: any = [];
      dispatch(setForm({ ...state.data.form, Blacklist: blacklistObj }));
    }
    setAddFormData({ ...addFormData, Blacklist: "" });
    setFormErrors(
      {
        ...state.data.errors,
        Blacklist: "",
      },
      dispatch
    );
  }
  const handleAddClick = () => {
    if (blacklistLength > 0) {
      const filtered = state.data.form.Blacklist.filter(
        (x) => x === addFormData.Blacklist
      );
      if (filtered.length > 0) {
        ToastAlert("This IP address has been already added!", "error");
      } else {
        const blacklistObj: any = [
          ...state.data.form.Blacklist,
          addFormData.Blacklist,
        ];
        dispatch(setForm({ ...state.data.form, Blacklist: blacklistObj }));
        setAddFormData({ ...addFormData, Blacklist: "" });
      }
    } else {
      const blacklistObj: any = [
        ...state.data.form.Blacklist,
        addFormData.Blacklist,
      ];
      dispatch(setForm({ ...state.data.form, Blacklist: blacklistObj }));
      setAddFormData({ ...addFormData, Blacklist: "" });
    }
  };

  const deleteTableRow = (
    index: number,
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.preventDefault();
    const list = [...state.data.form.Blacklist];
    list.splice(index, 1);
    dispatch(setForm({ ...state.data.form, Blacklist: list }));
  };

  return (
    <div>
      <div className="card">
        <div>
          <div className="align-items-center justify-content-around">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <span>Blacklisted IPs</span>
                </Accordion.Header>
                <Accordion.Body>
                  <div>
                    <Row>
                      <Col md="12">
                        <b>Enable Blacklisted IPs</b>
                        <p>
                          Blacklisted IPs limit the originating address of a
                          request to disallow group of addresses.
                        </p>
                      </Col>
                      <Col md="12">
                        <Form.Group className="mb-3 ml-4">
                          <Form.Check
                            type="switch"
                            data-testid="blacklist-switch"
                            label="Enable Blacklisted IPs"
                            name="blacklisted"
                            checked={enableBlacklist}
                            onChange={(e: any) => setEnableBlacklist(e)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    {enableBlacklist ? (
                      <div>
                        <Row>
                          {(() => {
                            return blacklistLength > 0 ? (
                              <></>
                            ) : (
                              <p>No IPs selected, please add one below.</p>
                            );
                          })()}
                          <Row>
                            <Form.Label>
                              <b>IP Address:</b>
                            </Form.Label>
                            <Col md={10}>
                              <Form.Group className="mt-0">
                                <Form.Control
                                  type="text"
                                  data-testid="blacklist-input"
                                  placeholder="127.0.0.1"
                                  id="blacklist"
                                  name="Blacklist"
                                  value={addFormData.Blacklist}
                                  isInvalid={!!state.data.errors?.Blacklist}
                                  isValid={!state.data.errors?.Blacklist}
                                  onChange={(event) =>
                                    handleFormInputChange(
                                      event,
                                      state,
                                      dispatch,
                                      addFormData,
                                      setAddFormData
                                    )
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {state.data.errors?.Blacklist}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col md={2}>
                              <Form.Group className="mb-5">
                                <Form.Label></Form.Label>
                                <Button
                                  variant="dark"
                                  data-testid="add-ips"
                                  disabled={!addFormData.Blacklist}
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
                                {(() => {
                                  return blacklistLength > 0 ? (
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
                                  );
                                })()}
                                <tbody>
                                  {state.data.form.Blacklist.map(
                                    (data: any, index: any) => {
                                      return (
                                        <tr key={index}>
                                          <td>{data}</td>
                                          <td style={{ textAlign: "center" }}>
                                            <i
                                              className="btn btn-sm bi bi-trash-fill"
                                              data-testid="delete-row"
                                              onClick={(event) =>
                                                deleteTableRow(index, event)
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
