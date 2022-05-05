import React, { useState, useEffect } from "react";
import { Accordion, Form, Col, Row, Button, Table } from "react-bootstrap";
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
    const formobj = { ...addFormData };
    formobj[name] = value;
    setAddFormData(formobj);
  };

  const handleAddClick = () => {
    const whitelistObj: any = [
      ...state.data.form.Whitelist,
      addFormData.Whitelist,
    ];
    dispatch(setForm({ ...state.data.form, Whitelist: whitelistObj }));
    setAddFormData({ ...addFormData, Whitelist: "" });
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
                        <Form.Group className="mb-3">
                          <Form.Check
                            type="checkbox"
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
                          <b>Whitelisted IPs</b>
                          {whitelistLength > 0 ? (
                            <></>
                          ) : (
                            <p>No IPs selected, please add one below.</p>
                          )}
                          <Row>
                            <Form.Label>
                              <b>IP Address:</b>
                            </Form.Label>
                            <Col md={10}>
                              <Form.Group className="mt-0">
                                <Form.Control
                                  type="text"
                                  placeholder="127.0.0.1"
                                  id="whitelist"
                                  name="Whitelist"
                                  value={addFormData.Whitelist}
                                  onChange={(event) =>
                                    handleFormInputChange(event)
                                  }
                                />
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
                          <Row>
                            <Col md={12}>
                              <Table striped bordered hover size="lg">
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
