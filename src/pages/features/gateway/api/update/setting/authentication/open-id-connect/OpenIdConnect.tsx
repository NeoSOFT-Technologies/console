import React, { useEffect, useState } from "react";
import { Form, Col, Row, Button, Table } from "react-bootstrap";
import Spinner from "../../../../../../../../components/loader/Loader";
import { setForm } from "../../../../../../../../store/features/gateway/api/update/slice";
import { IPolicyListState } from "../../../../../../../../store/features/gateway/policy/list";
import { getPolicyList } from "../../../../../../../../store/features/gateway/policy/list/slice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../../store/hooks";

export default function OpenIdConnectAuthentication() {
  const state = useAppSelector((RootState) => RootState.updateApiState);

  const policyList: IPolicyListState = useAppSelector(
    (RootState) => RootState.policyListState
  );
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);
  const mainCall = async (currentPage: number, pageSize: number) => {
    dispatch(getPolicyList({ currentPage, pageSize }));
    setLoading(false);
  };
  useEffect(() => {
    mainCall(1, 100);
  }, []);

  const [addFormData, setAddFormData] = useState({
    issuer: "",
    client_ids: [],
  });

  const [addClientFormData, setClientAddFormData] = useState<any>([]);

  const handleIssuerInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const newFormData: any = { ...addFormData };
    newFormData[name] = value;

    setAddFormData(newFormData);
  };

  const handleClientInputChange = (event: any, index: number) => {
    const { name, value } = event.target;
    const newFormData: any = [...addClientFormData];
    newFormData[index] = { ...newFormData[index], [name]: value };
    setClientAddFormData(newFormData);
    // setClientAddFormData((preState : any)  => ({
    //   newFormData[index] : {
    //     ...preState[index],
    //     [name]: value,
    //   },
    // }));
  };

  const handleIssuerAddClick = () => {
    const clientObj: any = {
      clientId: "",
      policy: "",
    };
    setClientAddFormData([...addClientFormData, clientObj]);

    const providerList = [...state.data.form.OpenidOptions.Providers];
    const list = {
      Issuer: addFormData.issuer,
      Client_ids: [],
    };
    providerList.push(list);

    const OpenidOptionsData = {
      Providers: providerList,
    };
    dispatch(setForm({ ...state.data.form, OpenidOptions: OpenidOptionsData }));
    setAddFormData({ issuer: "", client_ids: [] });
  };

  const handleClientAddClick = (index: any) => {
    const providerList = [...state.data.form.OpenidOptions.Providers];

    const clientList = [
      ...state.data.form.OpenidOptions.Providers[index].Client_ids,
    ];

    const list = {
      ClientId: addClientFormData[index].clientId,
      Policy: addClientFormData[index].policy,
    };
    clientList.push(list);

    providerList[index] = {
      ...providerList[index],
      Client_ids: [...clientList],
    };

    const OpenidOptionsData = {
      Providers: providerList,
    };
    dispatch(setForm({ ...state.data.form, OpenidOptions: OpenidOptionsData }));

    const clientObj = {
      clientId: "",
      policy: "",
    };
    const newFormData: any = [...addClientFormData];
    newFormData[index] = clientObj;
    setClientAddFormData(newFormData);
  };

  const deleteIssuerTableRows = (
    index: number,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const providerList = [...state.data.form.OpenidOptions.Providers];
    providerList.splice(index, 1);

    const OpenidOptionsData = {
      Providers: providerList,
    };
    dispatch(setForm({ ...state.data.form, OpenidOptions: OpenidOptionsData }));
  };

  const deleteClientTableRows = (
    issuerIndex: number,
    clientIndex: number,
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.preventDefault();
    const providerList = [...state.data.form.OpenidOptions.Providers];
    const clientList = [
      ...state.data.form.OpenidOptions.Providers[issuerIndex].Client_ids,
    ];
    clientList.splice(clientIndex, 1);
    providerList[issuerIndex] = {
      ...providerList[issuerIndex],
      Client_ids: [...clientList],
    };
    const OpenidOptionsData1 = {
      Providers: providerList,
    };
    dispatch(
      setForm({ ...state.data.form, OpenidOptions: OpenidOptionsData1 })
    );
  };

  return (
    <div>
      {policyList.loading ? (
        <Spinner />
      ) : (
        <div className="ml-3 mr-3">
          <Row>
            <Col
              md={12}
              className="border bg-warning bg-opacity-10 rounded mb-3  p-2"
            >
              Changing the Authentication mode on an Active API can have severe
              consequences for your users. Please be aware that this will stop
              the current keys working for this API.
            </Col>

            <Col
              md={12}
              className="border bg-info bg-opacity-10 rounded mb-3  p-2"
            >
              API Gateway can transparently handle OpenID connect JWT ID Token,
              in order to make these works, register the issue(iss) ,
              client(aud) to a policy ID for the API in order for dynamic
              per-token access limits to be applied.
            </Col>

            <Col md={12} className="border rounded">
              <div>
                <h5 className="mt-2">OpenID Connect</h5>
              </div>
              <br />
              <b>Add Issuers, clients and policies</b>
              <br />
              <div>
                OpenID connect only allows valid issuers and registered client
                IDs to be validated. Add your issuer below, and for each Client
                that is managed by an issuer, add a matching policy that will be
                applied to tokens registered to that client.
              </div>
              <br />
              <Row>
                <Form.Label>
                  <b> Add Issuers, clients and policies:</b>
                </Form.Label>
                <Col md={10}>
                  <Form.Group className="mt-0">
                    <Form.Control
                      type="text"
                      placeholder="accounts.google.com"
                      id="issuer"
                      name="issuer"
                      value={addFormData.issuer}
                      onChange={handleIssuerInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group className="mb-5">
                    <Form.Label></Form.Label>
                    <Button
                      variant="dark"
                      disabled={!addFormData.issuer}
                      onClick={handleIssuerAddClick}
                    >
                      Add
                    </Button>{" "}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <div className="container">
                  <div className="row">
                    <div className="mb-1"></div>
                    <div className="col-sm-11">
                      {loading ? (
                        <></>
                      ) : (
                        (state.data.form.OpenidOptions.Providers as any[]).map(
                          (data: any, index) => {
                            const { Issuer, Client_ids } = data;
                            return Client_ids?.length > 0 ? (
                              state.data.form.OpenidOptions.Providers[
                                index
                              ].Client_ids.map(
                                (clientData: any, clientIndex: any) => {
                                  return (
                                    <div key={index}>
                                      {clientIndex === 0 ? (
                                        <table className="table table-bordered">
                                          <thead>
                                            <tr>
                                              <th>Issuer</th>
                                              <th>ClientID</th>
                                              <th>Policy</th>
                                              <th>Actions</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              {/* <td>
                                                    <button
                                                      className="btn bi bi-trash-fill"
                                                      onClick={(event) =>
                                                        deleteIssuerTableRows(
                                                          index,
                                                          event
                                                        )
                                                      }
                                                    ></button>
                                                  </td> */}
                                              <td>
                                                <input
                                                  type="text"
                                                  className="form-control"
                                                  id="issuer"
                                                  name="issuer"
                                                  value={Issuer}
                                                  readOnly
                                                />
                                              </td>
                                              <td>
                                                <input
                                                  type="text"
                                                  className="form-control"
                                                  placeholder="Your-client-id"
                                                  id="clientId"
                                                  name="clientId"
                                                  value={
                                                    addClientFormData[index]
                                                      ?.clientId
                                                  }
                                                  onChange={(evnt) =>
                                                    handleClientInputChange(
                                                      evnt,
                                                      index
                                                    )
                                                  }
                                                />{" "}
                                              </td>
                                              <td>
                                                <select
                                                  className="p-2 rounded mb-0"
                                                  name="policy"
                                                  id="policy"
                                                  placeholder="select policy"
                                                  value={
                                                    addClientFormData.policy
                                                  }
                                                  onChange={(evnt) =>
                                                    handleClientInputChange(
                                                      evnt,
                                                      index
                                                    )
                                                  }
                                                >
                                                  <option></option>
                                                  {policyList.data?.Policies.map(
                                                    (item: any) => {
                                                      return (
                                                        <option
                                                          key={item.Name}
                                                          value={item.Id}
                                                          id={item.Name}
                                                        >
                                                          {item.Name}
                                                        </option>
                                                      );
                                                    }
                                                  )}
                                                </select>
                                              </td>
                                              <td>
                                                <button
                                                  className="btn btn-outline-dark btn-dark"
                                                  onClick={() =>
                                                    handleClientAddClick(index)
                                                  }
                                                  disabled={
                                                    !(
                                                      addClientFormData[index]
                                                        ?.clientId &&
                                                      addClientFormData[index]
                                                        ?.policy
                                                    )
                                                  }
                                                >
                                                  Add
                                                </button>
                                                <button
                                                  className="btn bi bi-trash-fill"
                                                  onClick={(event) =>
                                                    deleteIssuerTableRows(
                                                      index,
                                                      event
                                                    )
                                                  }
                                                ></button>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      ) : (
                                        <></>
                                      )}

                                      {clientIndex === 0 ? (
                                        <Table striped bordered hover>
                                          <thead>
                                            <tr>
                                              <th>ClientID</th>
                                              <th>Policy</th>
                                              <th
                                                style={{
                                                  textAlign: "center",
                                                }}
                                              >
                                                Action
                                              </th>
                                            </tr>
                                          </thead>

                                          <tbody>
                                            {state.data.form.OpenidOptions.Providers[
                                              index
                                            ].Client_ids.map(
                                              (clientObj: any, cIndex: any) => {
                                                const { ClientId, Policy } =
                                                  clientObj;
                                                return policyList?.data?.Policies.filter(
                                                  (p: any) => p.Id === Policy
                                                ).map((filteredPolicy) => {
                                                  const { Name, Id } =
                                                    filteredPolicy;

                                                  return (
                                                    <tr key={clientIndex}>
                                                      <td>{ClientId}</td>
                                                      <td
                                                        style={{
                                                          textAlign: "left",
                                                        }}
                                                      >
                                                        {Name} : {Id}
                                                      </td>
                                                      <td
                                                        style={{
                                                          textAlign: "center",
                                                        }}
                                                      >
                                                        <i
                                                          className="bi bi-trash"
                                                          onClick={(event) =>
                                                            deleteClientTableRows(
                                                              index,
                                                              cIndex,
                                                              event
                                                            )
                                                          }
                                                        ></i>
                                                      </td>
                                                    </tr>
                                                  );
                                                });
                                              }
                                            )}
                                          </tbody>
                                        </Table>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                  );
                                }
                              )
                            ) : (
                              <div key={index}>
                                <table className="table table-bordered">
                                  <thead>
                                    <tr>
                                      <th>Issuer</th>
                                      <th>ClientID</th>
                                      <th>Policy</th>
                                      <th>Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      {/* <td>
                                        <button
                                          className="btn bi bi-trash-fill"
                                          onClick={(event) =>
                                            deleteIssuerTableRows(index, event)
                                          }
                                        ></button>
                                      </td> */}
                                      <td>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="issuer"
                                          name="issuer"
                                          value={Issuer}
                                          readOnly
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Your-client-id"
                                          id="clientId"
                                          name="clientId"
                                          value={
                                            addClientFormData[index]?.clientId
                                          }
                                          onChange={(evnt) =>
                                            handleClientInputChange(evnt, index)
                                          }
                                        />{" "}
                                      </td>
                                      <td>
                                        <select
                                          className="p-2 rounded mb-0"
                                          name="policy"
                                          id="policy"
                                          placeholder="select policy"
                                          value={addClientFormData.policy}
                                          onChange={(evnt) =>
                                            handleClientInputChange(evnt, index)
                                          }
                                        >
                                          <option></option>
                                          {policyList.data?.Policies.map(
                                            (item: any) => {
                                              return (
                                                <option
                                                  key={item.Name}
                                                  value={item.Id}
                                                  id={item.Name}
                                                >
                                                  {item.Name}
                                                </option>
                                              );
                                            }
                                          )}
                                        </select>
                                      </td>
                                      <td>
                                        <button
                                          className="btn btn-outline-dark btn-dark"
                                          onClick={() =>
                                            handleClientAddClick(index)
                                          }
                                          disabled={
                                            !(
                                              addClientFormData[index]
                                                ?.clientId &&
                                              addClientFormData[index]?.policy
                                            )
                                          }
                                        >
                                          Add
                                        </button>
                                        <button
                                          className="btn bi bi-trash-fill"
                                          onClick={(event) =>
                                            deleteIssuerTableRows(index, event)
                                          }
                                        ></button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            );
                          }
                        )
                      )}
                    </div>
                    <div className="col-sm-4"></div>
                  </div>
                </div>
              </Row>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}
