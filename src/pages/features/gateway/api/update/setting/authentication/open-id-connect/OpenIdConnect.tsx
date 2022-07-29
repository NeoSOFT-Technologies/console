import React, { useEffect, useState } from "react";
import { Form, Col, Row, Button, Table } from "react-bootstrap";
import Spinner from "../../../../../../../../components/loader/Loader";
import { ToastAlert } from "../../../../../../../../components/toast-alert/toast-alert";
import Tooltips from "../../../../../../../../components/tooltips/Tooltips";
import {
  setFormErrors,
  regexForIssuer,
} from "../../../../../../../../resources/gateway/api/api-constants";
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

  const selectedPolicy = policyList.data?.Policies.filter((a) =>
    a.Apis.includes(state.data.form.Name)
  );

  const [addFormData, setAddFormData] = useState({
    issuer: "",
    client_ids: [],
  });

  const [addClientFormData, setClientAddFormData] = useState<any>([]);

  const handleIssuerInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    if (name === "issuer") {
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
            [name]: regexForIssuer.test(value)
              ? ""
              : "Please enter a Valid Issuer URL",
          },
          dispatch
        );
      }
    }
    const newFormData: any = { ...addFormData };
    newFormData[name] = value;

    setAddFormData(newFormData);
  };

  const handleClientInputChange = (event: any, index: number) => {
    const { name, value } = event.target;
    const newFormData: any = [...addClientFormData];
    newFormData[index] = { ...newFormData[index], [name]: value };
    setClientAddFormData(newFormData);
  };

  const handleIssuerAddClick = () => {
    if (state.data.form.OpenidOptions.Providers.length > 0) {
      const filtered = state.data.form.OpenidOptions.Providers.filter(
        (x) => x.Issuer === addFormData.issuer
      );
      if (filtered.length > 0) {
        ToastAlert("This issuer has been already added!", "error");
      } else {
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
        dispatch(
          setForm({ ...state.data.form, OpenidOptions: OpenidOptionsData })
        );
        setAddFormData({ issuer: "", client_ids: [] });
      }
    } else {
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
      dispatch(
        setForm({ ...state.data.form, OpenidOptions: OpenidOptionsData })
      );
      setAddFormData({ issuer: "", client_ids: [] });
    }
  };

  function filterClient(filteredClientId: any, issuerIndex: any) {
    if (filteredClientId[0].Policy === addClientFormData[issuerIndex].policy) {
      ToastAlert(
        "This client with same policy name has been already added!",
        "error"
      );
    } else {
      const providerList = [...state.data.form.OpenidOptions.Providers];

      const clientList = [
        ...state.data.form.OpenidOptions.Providers[issuerIndex].Client_ids,
      ];
      for (const element of state.data.form.OpenidOptions.Providers[issuerIndex]
        .Client_ids) {
        if (element.ClientId === addClientFormData[issuerIndex].clientId) {
          const i = clientList.findIndex(
            (e) => e.ClientId === addClientFormData[issuerIndex].clientId
          );
          clientList.splice(i, 1);
          const list = {
            ClientId: addClientFormData[issuerIndex].clientId,
            Policy: addClientFormData[issuerIndex].policy,
          };
          clientList.push(list);
          providerList[issuerIndex] = {
            ...providerList[issuerIndex],
            Client_ids: [...clientList],
          };
          const OpenidOptionsData = {
            Providers: providerList,
          };
          dispatch(
            setForm({
              ...state.data.form,
              OpenidOptions: OpenidOptionsData,
            })
          );

          const clientObj = {
            clientId: "",
            policy: "",
          };
          const newFormData: any = [...addClientFormData];
          newFormData[issuerIndex] = clientObj;
          setClientAddFormData(newFormData);
        }
      }
    }
  }
  const handleClientAddClick = (issuerIndex: any, event: any) => {
    event.preventDefault();
    if (
      state.data.form.OpenidOptions.Providers[issuerIndex].Client_ids.length > 0
    ) {
      const filteredClientId = state.data.form.OpenidOptions.Providers[
        issuerIndex
      ].Client_ids.filter(
        (x) => x.ClientId === addClientFormData[issuerIndex].clientId
      );
      if (filteredClientId.length > 0) {
        return filterClient(filteredClientId, issuerIndex);
      } else {
        const providerList = [...state.data.form.OpenidOptions.Providers];

        const clientList = [
          ...state.data.form.OpenidOptions.Providers[issuerIndex].Client_ids,
        ];

        const list = {
          ClientId: addClientFormData[issuerIndex].clientId,
          Policy: addClientFormData[issuerIndex].policy,
        };
        clientList.push(list);

        providerList[issuerIndex] = {
          ...providerList[issuerIndex],
          Client_ids: [...clientList],
        };

        const OpenidOptionsData = {
          Providers: providerList,
        };
        dispatch(
          setForm({ ...state.data.form, OpenidOptions: OpenidOptionsData })
        );

        const clientObj = {
          clientId: "",
          policy: "",
        };
        const newFormData: any = [...addClientFormData];
        newFormData[issuerIndex] = clientObj;
        setClientAddFormData(newFormData);
      }
    } else {
      const providerList = [...state.data.form.OpenidOptions.Providers];
      const clientList = [
        ...state.data.form.OpenidOptions.Providers[issuerIndex].Client_ids,
      ];

      const list = {
        ClientId: addClientFormData[issuerIndex].clientId,
        Policy: addClientFormData[issuerIndex].policy,
      };
      clientList.push(list);

      providerList[issuerIndex] = {
        ...providerList[issuerIndex],
        Client_ids: [...clientList],
      };

      const OpenidOptionsData = {
        Providers: providerList,
      };
      dispatch(
        setForm({ ...state.data.form, OpenidOptions: OpenidOptionsData })
      );

      const clientObj = {
        clientId: "",
        policy: "",
      };
      const newFormData: any = [...addClientFormData];
      newFormData[issuerIndex] = clientObj;
      setClientAddFormData(newFormData);
    }
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

  function inputChange(event: any, index: number) {
    handleClientInputChange(event, index);
  }

  return (
    <div>
      {policyList.loading ? (
        <Spinner />
      ) : (
        <div className="ml-3 mr-3">
          <Row>
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
              <div>
                <div className="float-left mt-2">
                  <b>Add Issuers, clients and policies</b>
                </div>

                <Tooltips
                  content="Add your issuer below, and for each Client
                that is managed by an issuer, add a matching policy that will be
                applied to tokens registered to that client."
                />
                <br />
                <br />
                <div>
                  OpenID connect only allows valid issuers and registered client
                  IDs to be validated.
                </div>
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
                      data-testid="issuer"
                      placeholder="https://issuer.com"
                      id="issuer"
                      name="issuer"
                      value={addFormData.issuer}
                      isInvalid={!!state.data.errors?.issuer}
                      isValid={!state.data.errors?.issuer}
                      onChange={handleIssuerInputChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {state.data.errors?.issuer}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group className="mb-5">
                    <Form.Label></Form.Label>
                    <Button
                      variant="dark"
                      data-testid="add-btn"
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
                      {(() => {
                        return loading ? (
                          <></>
                        ) : (
                          (
                            state.data.form.OpenidOptions.Providers as any[]
                          ).map((data: any, index) => {
                            const { Issuer, Client_ids } = data;
                            return Client_ids?.length > 0 ? (
                              state.data.form.OpenidOptions.Providers[
                                index
                              ].Client_ids.map(
                                (_clientData: any, clientIndex: any) => {
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
                                              <td>{Issuer}</td>
                                              <td>
                                                <input
                                                  type="text"
                                                  data-testid="clientId"
                                                  className="form-control"
                                                  placeholder="Your-client-id"
                                                  id="clientId"
                                                  name="clientId"
                                                  value={
                                                    addClientFormData[index]
                                                      ?.clientId || ""
                                                  }
                                                  onChange={(evnt) =>
                                                    inputChange(evnt, index)
                                                  }
                                                />{" "}
                                              </td>
                                              <td>
                                                {(() => {
                                                  return (selectedPolicy?.length as number) >
                                                    0 ? (
                                                    <select
                                                      className="p-2 rounded mb-0"
                                                      data-testid="selected-policy"
                                                      name="policy"
                                                      id="policy"
                                                      placeholder="select policy"
                                                      value={
                                                        addClientFormData.policy
                                                      }
                                                      onChange={(evnt) =>
                                                        inputChange(evnt, index)
                                                      }
                                                    >
                                                      <option></option>
                                                      {selectedPolicy?.map(
                                                        (item: any) => {
                                                          return (
                                                            <option
                                                              key={item.Id}
                                                              value={item.Id}
                                                              id={item.Name}
                                                            >
                                                              {item.Name}
                                                            </option>
                                                          );
                                                        }
                                                      )}
                                                    </select>
                                                  ) : (
                                                    <>
                                                      <p>No policy available</p>
                                                    </>
                                                  );
                                                })()}
                                              </td>
                                              <td>
                                                <button
                                                  className="btn btn-outline-dark btn-dark"
                                                  onClick={(event) =>
                                                    handleClientAddClick(
                                                      index,
                                                      event
                                                    )
                                                  }
                                                  data-testid="add-Client"
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
                                                  data-testid="delete-issuer"
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
                                                  (p) => p.Id === Policy
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
                                                          className="btn btn-sm bi bi-trash-fill"
                                                          data-testid="delete-client"
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
                                      <td>{Issuer}</td>
                                      <td>
                                        <input
                                          type="text"
                                          className="form-control"
                                          data-testid="client-id"
                                          placeholder="Your-client-id"
                                          id="clientId"
                                          name="clientId"
                                          value={
                                            addClientFormData[index]
                                              ?.clientId || ""
                                          }
                                          onChange={(evnt) =>
                                            inputChange(evnt, index)
                                          }
                                        />{" "}
                                      </td>
                                      <td>
                                        {(() => {
                                          return (selectedPolicy?.length as number) >
                                            0 ? (
                                            <select
                                              className="p-2 rounded mb-0"
                                              data-testid="selectedPolicy"
                                              name="policy"
                                              id="policy"
                                              placeholder="select policy"
                                              value={addClientFormData.policy}
                                              onChange={(evnt) =>
                                                inputChange(evnt, index)
                                              }
                                            >
                                              <option></option>
                                              {selectedPolicy?.map(
                                                (item: any) => {
                                                  return (
                                                    <option
                                                      key={item.Id}
                                                      value={item.Id}
                                                      id={item.Name}
                                                    >
                                                      {item.Name}
                                                    </option>
                                                  );
                                                }
                                              )}
                                            </select>
                                          ) : (
                                            <>
                                              <p>No policy available</p>
                                            </>
                                          );
                                        })()}
                                      </td>
                                      <td>
                                        <button
                                          className="btn btn-outline-dark btn-dark"
                                          data-testid="addClient"
                                          onClick={(event) =>
                                            handleClientAddClick(index, event)
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
                                          data-testid="deleteIssuer"
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
                          })
                        );
                      })()}
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
