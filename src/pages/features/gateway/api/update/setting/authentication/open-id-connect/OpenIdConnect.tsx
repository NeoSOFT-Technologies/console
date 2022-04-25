import React, { useEffect, useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { setForm } from "../../../../../../../../store/features/gateway/api/update/slice";
import { IPolicyListState } from "../../../../../../../../store/features/gateway/policy/list";
import { getPolicyList } from "../../../../../../../../store/features/gateway/policy/list/slice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../../store/hooks";

export default function OpenIdConnectAuthentication() {
  const state = useAppSelector((RootState) => RootState.updateApiState);
  console.log("state", state);

  const policyList: IPolicyListState = useAppSelector(
    (RootState) => RootState.policyListState
  );
  console.log("policyList", policyList);
  const dispatch = useAppDispatch();

  const mainCall = async (currentPage: number) => {
    dispatch(getPolicyList({ currentPage }));
  };
  useEffect(() => {
    mainCall(1);
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
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
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
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
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

  console.log("form", state.data.form);

  return (
    <div className="ml-3 mr-3">
      <Row>
        <Col
          md={12}
          className="border rounded mb-3 bg-warning bg-opacity-10 p-2"
        >
          Changing the Authentication mode on an Active API can have severe
          consequences for your users. Please be aware that this will stop the
          current keys working for this API.
        </Col>

        <Col md={8} className="border rounded">
          <div>
            <h6 className="mt-2">OpenID Connect</h6>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="stripAuthenticationData"
                label="Enable rate limiting on a per-user / per-client basis"
              />
            </Form.Group>
          </div>

          <div>
            Enabling this option will cause a user to be rate limited
            differently depending on which client they are using.{" "}
          </div>
          <br />
          <b>Add Issuers, clients and policies</b>
          <br />
          <div>
            OpenID connect only allows valid issuers and registered client IDs
            to be validated. Add your issuer below, and for each Client that is
            managed by an issuer, add a matching policy that will be applied to
            tokens registered to that client.
          </div>
          <br />
          <Row>
            <Form.Label>
              <b> Add Issuers, clients and policies:</b>
            </Form.Label>
            <Col md={10}>
              <Form.Group className="mb-3 mt-2">
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
              <Form.Group className="mb-2">
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
                  {(state.data.form.OpenidOptions.Providers as any[]).map(
                    (data: any, index: any) => {
                      console.log("data", data);
                      const { Issuer, Client_ids } = data;
                      console.log(
                        "Issuer:",
                        Issuer + " ClientIds: ",
                        Client_ids
                      );
                      return Client_ids?.length > 0 ? (
                        state.data.form.OpenidOptions.Providers[
                          index
                        ].Client_ids.map((objData: any, objIndex: any) => {
                          console.log(objData, objIndex);
                          return (
                            <div key={index}>
                              {objIndex === 0 ? (
                                <table key={index} className="table">
                                  <thead>
                                    <tr>
                                      <th></th>
                                      <th>Issuer:</th>
                                      <th>ClientID:</th>
                                      <th>Policy:</th>
                                      <th></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr key={index}>
                                      <td>
                                        <button
                                          className="btn bi bi-trash-fill"
                                          onClick={(e) =>
                                            deleteIssuerTableRows(e, index)
                                          }
                                        ></button>
                                      </td>
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
                                            (item) => {
                                              return (
                                                <option
                                                  key={item.Name}
                                                  value={item.Name}
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
                                            !addClientFormData[index]?.clientId
                                          }
                                        >
                                          Add
                                        </button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              ) : (
                                <></>
                              )}

                              <table key={objIndex}>
                                <tbody>
                                  <tr key={objIndex}>
                                    <td className="pr-3">
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="clientId"
                                        name="clientId"
                                        value={
                                          state.data.form.OpenidOptions
                                            .Providers[index].Client_ids[
                                            objIndex
                                          ].ClientId
                                        }
                                        readOnly
                                      />{" "}
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="policy"
                                        name="policy"
                                        value={
                                          state.data.form.OpenidOptions
                                            .Providers[index].Client_ids[
                                            objIndex
                                          ].Policy
                                        }
                                        readOnly
                                      />{" "}
                                    </td>
                                    <td>
                                      <button
                                        className="btn bi bi-trash-fill"
                                        onClick={(e) =>
                                          deleteClientTableRows(
                                            index,
                                            objIndex,
                                            e
                                          )
                                        }
                                      ></button>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <hr />
                            </div>
                          );
                        })
                      ) : (
                        <div key={index}>
                          <table key={index} className="table">
                            <thead>
                              <tr>
                                <th></th>
                                <th>Issuer:</th>
                                <th>ClientID:</th>
                                <th>Policy:</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr key={index}>
                                <td>
                                  <button
                                    className="btn bi bi-trash-fill"
                                    onClick={(e) =>
                                      deleteIssuerTableRows(e, index)
                                    }
                                  ></button>
                                </td>
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
                                    value={addClientFormData[index]?.clientId}
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
                                    {policyList.data?.Policies.map((item) => {
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
                                  </select>
                                </td>
                                <td>
                                  <button
                                    className="btn btn-outline-dark btn-dark"
                                    onClick={() => handleClientAddClick(index)}
                                    disabled={
                                      !addClientFormData[index]?.clientId
                                    }
                                  >
                                    Add
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      );
                    }
                  )}
                </div>
                <div className="col-sm-4"></div>
              </div>
            </div>
          </Row>
        </Col>

        <Col md={3} className="ml-3">
          <div className="border rounded p-3 bg-primary bg-opacity-10">
            API Gateway can transparently handle OpenID connect JWT ID Token, in
            order to make these works, register the issue(iss) , client(aud) to
            a policy ID for the API in order for dynamic per-token access limits
            to be applied.
          </div>
        </Col>
      </Row>
    </div>
  );
}
