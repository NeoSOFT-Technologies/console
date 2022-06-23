import React, { useState } from "react";
import { Button, Form, Row, Col, Table } from "react-bootstrap";
// import { IKeyCreateState } from "../../../../../store/features/gateway/key/create";
// import { IPolicyCreateState } from "../../../../../store/features/gateway/policy/create";
// import { setForm } from "../../../../../store/features/gateway/policy/create/slice";
// import { useAppSelector, useAppDispatch } from "../../../../../store/hooks";
import { IPropsHelper } from "../global-limit/rate-limit-helper";
interface IProps {
  r: IPropsHelper;
}
export default function Ipathpermission(props: IProps) {
  console.log("hey msiter i am here", props);
  const [InputData, setInputData] = useState<any>({
    path: "",
    method: ["GET"],
  });
  const [spanError, setspanError] = useState("");

  const length = props.r.formProp.length;

  const HandleAddclick = () => {
    const value = props.r.index!;
    let filtercheck = "false";
    const apisList = [...props.r.formProp!];
    const allowedList = [...apisList[value].AllowedUrls!];

    // validation function to check two array of method
    function ArrayEquals(a: any, b: any) {
      return (
        Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index])
      );
    }
    const filteredlist = allowedList.filter((a) => {
      if (a.url === InputData.path) {
        filtercheck = ArrayEquals(a.methods, InputData.method)
          ? "true"
          : "false";
      } else {
        filtercheck = "false";
      }
      return filtercheck;
    });
    // end of validation from data
    if (InputData.path !== "" && filtercheck === "false") {
      setspanError(" ");
      console.log("filtered", filteredlist);
      const list = {
        url: InputData.path,
        methods: InputData.method,
      };
      allowedList.push(list);
      apisList[value] = {
        ...apisList[value],
        AllowedUrls: [...allowedList],
      };

      props.r.dispatch(
        props.r.setForm!({ ...props.r.form, [props.r.propName!]: apisList })
      );
      setInputData({ path: "", method: ["GET"] });
    } else {
      setspanError("Input cannot be empty or already exist");
    }
  };

  const deleteTableRows = (event: any, index: any) => {
    event.preventDefault();
    const value = props.r.index!;
    const apisList = [...props.r.formProp!];
    const allowedList = [...apisList[value].AllowedUrls!];
    allowedList.splice(index, 1);
    apisList[value] = {
      ...apisList[value],
      AllowedUrls: [...allowedList],
    };
    props.r.dispatch(
      props.r.setForm!({ ...props.r.form, [props.r.propName!]: apisList })
    );
  };

  const HandleAddFormChange = (event: any) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData: any = { ...InputData };
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
              data-testid="path-input"
              placeholder="Enter custom regex"
              name="path"
              onChange={HandleAddFormChange}
              value={InputData.path}
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
              data-testid="method-input"
              onChange={HandleAddFormChange}
              value={InputData.method[0]}
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
            <Button variant="dark" onClick={HandleAddclick}>
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
                  (props.r.formProp[props.r.index!].AllowedUrls as any[]).map(
                    (data1: any, index1: any) => {
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
                    }
                  )
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
