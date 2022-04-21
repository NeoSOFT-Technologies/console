import { Form, Col, Row, Button } from "react-bootstrap";
import React, { useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../store/hooks";
import { setForm } from "../../../../../../../store/features/api/update/slice";

export default function BasicAuthentication() {
  const state = useAppSelector((RootState) => RootState.updateApiState);
  const dispatch = useAppDispatch();
  console.log("state", state);
  console.log("provider : ", state.data.form.OpenidOptions.Providers);

  const [addFormData, setAddFormData] = useState({
    issuer: "",
    client_ids: [
      {
        clientId: "",
        policy: "",
      },
    ],
  });

  const [addClientFormData, setClientAddFormData] = useState({
    clientId: "",
    policy: "",
  });

  const handleIssuerInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    const newFormData: any = { ...addFormData };
    newFormData[name] = value;
    setAddFormData(newFormData);
  };
  console.log("addFormData : ", addFormData);

  const handleClientInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    const newFormData: any = { ...addClientFormData };
    newFormData[name] = value;
    setClientAddFormData(newFormData);
  };
  console.log("addClientFormData : ", addClientFormData);

  const handleIssuerAddClick = () => {
    const providerList = [...state.data.form.OpenidOptions.Providers];
    // const clientList = [...providerList[0].client_ids!];

    // const clientDetails = {
    //   clientId: addFormData.client_ids[0].clientId,
    //   policy: addFormData.client_ids[0].policy,
    // };
    // clientList.push(clientDetails);
    // console.log("clientList", clientList);

    const list = {
      issuer: addFormData.issuer,
      client_ids: [
        {
          clientId: "",
          policy: "",
        },
      ],
    };

    providerList.push(list);

    const OpenidOptionsData = {
      Providers: providerList,
    };
    dispatch(setForm({ ...state.data.form, OpenidOptions: OpenidOptionsData }));
    // setInputData({ path: "", method: "" });
  };
  console.log("form", state.data.form);

  const handleClientAddClick = () => {
    const providerList = [...state.data.form.OpenidOptions.Providers];

    const clientList = [
      ...state.data.form.OpenidOptions.Providers[0].client_ids,
    ];

    const list = {
      clientId: addClientFormData.clientId,
      policy: addClientFormData.policy,
    };

    clientList.push(list);

    const OpenidOptionsData = {
      // Providers: providerList,
      Providers: [
        {
          issuer: providerList[0].issuer,
          client_ids: clientList,
        },
      ],
    };
    dispatch(setForm({ ...state.data.form, OpenidOptions: OpenidOptionsData }));
    // setInputData({ path: "", method: "" });

    // const clientList = [...providerList[0].client_ids!];

    // const clientDetails = {
    //   clientId: addFormData.client_ids[0].clientId,
    //   policy: addFormData.client_ids[0].policy,
    // };
    // clientList.push(clientDetails);
    // console.log("clientList", clientList);
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
          consequences for your users.
        </Col>

        {/* <Col md="12">
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              name="stripAuthenticationData"
              label="Strip Authentication Data"
            />
          </Form.Group>
        </Col> */}

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
            to be validated.
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
              <Form.Group className="mb-3 mt-2">
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
                  <table className="table">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Issuer</th>
                        <th>ClientID:</th>
                        <th>Policy:</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.data.form.OpenidOptions.Providers.map(
                        (data: any, index: any) => {
                          const { issuer, client_ids } = data;
                          console.log("data", data);
                          console.log("issuer", issuer);
                          console.log("client_ids", client_ids);
                          return (
                            <tr key={index}>
                              <td>
                                <button className="btn bi bi-trash-fill"></button>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="issuer"
                                  name="issuer"
                                  value={issuer}
                                  // onChange={(evnt) =>
                                  //   handleTableRowsInputChange(index, evnt)
                                  // }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Your-client-id"
                                  id="clientId"
                                  name="clientId"
                                  value={addClientFormData.clientId}
                                  onChange={handleClientInputChange}
                                />{" "}
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="policy"
                                  id="policy"
                                  name="policy"
                                  value={addClientFormData.policy}
                                  onChange={handleClientInputChange}
                                />{" "}
                              </td>
                              <td>
                                <button
                                  className="btn btn-outline-dark btn-dark"
                                  onClick={handleClientAddClick}
                                >
                                  ADD
                                </button>
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
        </Col>

        <Col md={3} className="ml-3">
          <div className="border rounded p-3 bg-primary bg-opacity-10">
            API Gateway can transparently handle OpenID connect JWT ID Token, in
            order to make these works, register the issue(iss) , client(aud) to
            a policy ID for the API in order for dynamic per-token access limits
            to beapplied.
          </div>
        </Col>
      </Row>
    </div>
  );
}
