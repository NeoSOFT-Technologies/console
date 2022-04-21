import React, { useState } from "react";
import { Button, Form, Row, Col, Table } from "react-bootstrap";
import { IKeyCreateState } from "../../../../store/features/key/create";
import { IPolicyCreateState } from "../../../../store/features/policy/create";
import { setForm } from "../../../../store/features/policy/create/slice";
import { setForms } from "../../../../store/features/key/create/slice";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
interface IProps {
  state?: IKeyCreateState;
  policystate?: IPolicyCreateState;
  apidata?: any;
  indexdata?: number;
  current: string;
}
export default function Ipathpermission(props: IProps) {
  const dispatch = useAppDispatch();
  const state: IPolicyCreateState = useAppSelector(
    (RootState) => RootState.createPolicyState
  );
  const keysstate: IKeyCreateState = useAppSelector(
    (RootState) => RootState.createKeyState
  );
  // const [rowsData, setRowsData] = useState<any>();
  const [inputData, setInputData] = useState<any>({
    path: "",
    method: ["GET"],
  });

  const length =
    props.current === "policy"
      ? state.data.form.ApIs.length
      : keysstate.data.form.AccessRights.length;

  const handleAddclick = () => {
    const states = props.policystate;
    const keystate = props.state;
    const value = props.indexdata!;
    const apisList =
      props.current === "policy"
        ? [...states?.data.form.ApIs!]
        : [...keystate?.data.form.AccessRights!];
    const allowedList = [...apisList[value].AllowedUrls!];
    const list = {
      url: inputData.path,
      methods: inputData.method,
    };
    allowedList.push(list);
    apisList[value] = {
      ...apisList[value],
      AllowedUrls: [...allowedList],
    };
    props.current === "policy"
      ? dispatch(setForm({ ...state.data.form, ApIs: apisList }))
      : dispatch(setForms({ ...state.data.form, AccessRights: apisList }));
    setInputData({ path: "", method: ["GET"] });
  };

  const deleteTableRows = (event: any, index: any) => {
    event.preventDefault();
    const states = props.policystate;
    const keystate = props.state;
    const value = props.indexdata!;
    const apisList =
      props.current === "policy"
        ? [...states?.data.form.ApIs!]
        : [...keystate?.data.form.AccessRights!];
    const allowedList = [...apisList[value].AllowedUrls!];
    allowedList.splice(index, 1);
    apisList[value] = {
      ...apisList[value],
      AllowedUrls: [...allowedList],
    };
    props.current === "policy"
      ? dispatch(setForm({ ...state.data.form, ApIs: apisList }))
      : dispatch(setForms({ ...state.data.form, AccessRights: apisList }));
  };

  const handleAddFormChange = (event: any) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData: any = { ...inputData };
    switch (fieldName) {
      case "path":
        newFormData[fieldName] = fieldValue;
        setInputData(newFormData);
        break;
      case "method":
        if (fieldValue === "All Method") {
          newFormData[fieldName] = [
            "GET ",
            "POST ",
            "PUT ",
            "DELETE ",
            "PATCH ",
            "OPTIONS ",
            "HEAD",
          ];
          setInputData(newFormData);
        } else {
          newFormData[fieldName] = [fieldValue];
          setInputData(newFormData);
        }
        break;
    }
  };

  return (
    <div>
      <Row>
        <Col md={5}>
          <Form.Group className="mb-3">
            <Form.Label>
              <b>Paths :</b>
            </Form.Label>
            <Form.Control
              type="text"
              id="path"
              placeholder="Enter custom regex"
              name="path"
              onChange={handleAddFormChange}
              value={inputData.path}
              // data-testid="name-input"
              required
            />
            <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={5}>
          <Form.Group className="mb-3">
            <Form.Label>
              <b> Allowed Methods :</b>
            </Form.Label>
            <Form.Select
              style={{ height: 45 }}
              name="method"
              onChange={handleAddFormChange}
              value={inputData.method[0]}
            >
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
              <option>PATCH</option>
              <option>OPTIONS</option>
              <option>HEAD</option>
              <option>AllMethod</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={2} className="pt-2">
          <Form.Label></Form.Label>
          <Form.Group className="mb-3">
            <Button variant="dark" onClick={handleAddclick}>
              Add
            </Button>{" "}
          </Form.Group>
        </Col>
      </Row>
      {
        <Row>
          <Col md={12}>
            <Table striped bordered hover size="lg">
              <thead>
                <tr>
                  <th>Paths</th>
                  <th>Methods</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {length > 0 ? (
                  (props.current === "policy"
                    ? (state.data.form.ApIs[props.indexdata!]
                        .AllowedUrls as any[])
                    : keysstate.data.form.AccessRights[props.indexdata!]
                        .AllowedUrls
                  ).map((data1: any, index1: any) => {
                    return (
                      <tr key={index1}>
                        <td>{data1.url}</td>
                        <td>{data1.methods}</td>
                        <td style={{ textAlign: "center" }}>
                          <i
                            className="bi bi-trash"
                            onClick={(e: any) => deleteTableRows(e, index1)}
                          ></i>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <></>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      }
    </div>
  );
}
