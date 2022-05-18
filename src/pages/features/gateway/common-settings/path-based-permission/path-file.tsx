import React, { useState } from "react";
import { Button, Form, Row, Col, Table } from "react-bootstrap";
import { IKeyCreateState } from "../../../../../store/features/gateway/key/create";
import { setForms } from "../../../../../store/features/gateway/key/create/slice";
import { IPolicyCreateState } from "../../../../../store/features/gateway/policy/create";
import { setForm } from "../../../../../store/features/gateway/policy/create/slice";
import { useAppSelector, useAppDispatch } from "../../../../../store/hooks";
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
  const [spanError, setspanError] = useState("");

  const length =
    props.current === "policy"
      ? state.data.form.APIs.length
      : keysstate.data.form.AccessRights.length;

  const handleAddclick = () => {
    const value = props.indexdata!;
    let filtercheck = "false";
    const apisList =
      props.current === "policy"
        ? [...props.policystate?.data.form.APIs!]
        : [...props.state?.data.form.AccessRights!];
    const allowedList = [...apisList[value].AllowedUrls!];

    // validation function to check two array of method
    function arrayEquals(a: any, b: any) {
      return (
        Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index])
      );
    }
    const filteredlist = allowedList.filter((a) => {
      console.log("aurl", a.url, a.methods);
      console.log("old", inputData.path, inputData.method);
      if (a.url === inputData.path) {
        filtercheck = arrayEquals(a.methods, inputData.method)
          ? "true"
          : "false";
      } else {
        filtercheck = "false";
      }
      return filtercheck;
    });
    // end of validation from data
    if (inputData.path !== "" && filtercheck === "false") {
      setspanError(" ");
      console.log("filtered", filteredlist);
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
        ? dispatch(setForm({ ...state.data.form, APIs: apisList }))
        : dispatch(
            setForms({ ...keysstate.data.form, AccessRights: apisList })
          );
      setInputData({ path: "", method: ["GET"] });
    } else {
      setspanError("Input cannot be empty or already exist");
    }
  };

  const deleteTableRows = (event: any, index: any) => {
    event.preventDefault();
    const value = props.indexdata!;
    const apisList =
      props.current === "policy"
        ? [...props.policystate?.data.form.APIs!]
        : [...props.state?.data.form.AccessRights!];
    const allowedList = [...apisList[value].AllowedUrls!];
    allowedList.splice(index, 1);
    apisList[value] = {
      ...apisList[value],
      AllowedUrls: [...allowedList],
    };
    props.current === "policy"
      ? dispatch(setForm({ ...state.data.form, APIs: apisList }))
      : dispatch(setForms({ ...keysstate.data.form, AccessRights: apisList }));
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
        if (fieldValue === "AllMethod") {
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
          console.log("else", fieldValue);
          newFormData[fieldName] = [fieldValue];
          setInputData(newFormData);
        }
        break;
    }
  };
  console.log("state", inputData);
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
            />
            {spanError !== "" ? (
              <span style={{ color: "red" }}>{spanError}</span>
            ) : (
              ""
            )}
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
              <option>AllMethod</option>
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
              <option>PATCH</option>
              <option>OPTIONS</option>
              <option>HEAD</option>
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
                    ? (state.data.form.APIs[props.indexdata!]
                        .AllowedUrls as any[])
                    : (keysstate.data.form.AccessRights[props.indexdata!]
                        .AllowedUrls as any[])
                  ).map((data1: any, index1: any) => {
                    return (
                      <tr key={index1}>
                        <td>
                          {props.current === "policy" ? data1.url : data1.Url}
                        </td>
                        <td>
                          {props.current === "policy"
                            ? data1.methods
                            : data1.Methods}
                        </td>
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
