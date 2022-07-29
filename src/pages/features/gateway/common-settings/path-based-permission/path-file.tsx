import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { Button, Form, Row, Col, Table } from "react-bootstrap";
import { IPropsHelper } from "../global-limit/rate-limit-helper";
interface IProps {
  r: IPropsHelper;
}
export default function Ipathpermission(props: IProps) {
  const [InputData, setInputData] = useState<any>({
    path: "",
    method: ["GET"],
  });
  const [spanError, setspanError] = useState("");

  const length = props.r.formProp.length;

  const HandleAddclick = () => {
    const value = props.r.index || 0;
    const filtercheck = "false";
    const apisList = [...(props.r.formProp || [])];
    const allowedList = [...(apisList[value].AllowedUrls || [])];

    if (InputData.path !== "" && filtercheck === "false") {
      setspanError(" ");

      const list = {
        Url: InputData.path,
        Methods: InputData.method,
      };
      allowedList.push(list);
      apisList[value] = {
        ...apisList[value],
        AllowedUrls: [...allowedList],
      };

      props.r.dispatch(
        (props.r.setForm as ActionCreatorWithPayload<any, string>)({
          ...props.r.form,
          [props.r.propName || ""]: apisList,
        })
      );
      setInputData({ path: "", method: ["GET"] });
    } else {
      setspanError("Input cannot be empty or already exist");
    }
  };

  const deleteTableRows = (event: any, index: any) => {
    event.preventDefault();
    const value = props.r.index || 0;
    const apisList = [...(props.r.formProp || [])];
    const allowedList = [...(apisList[value].AllowedUrls || [])];
    allowedList.splice(index, 1);
    apisList[value] = {
      ...apisList[value],
      AllowedUrls: [...allowedList],
    };
    props.r.dispatch(
      (props.r.setForm as ActionCreatorWithPayload<any, string>)({
        ...props.r.form,
        [props.r.propName || ""]: apisList,
      })
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
                  (
                    props.r.formProp[props.r.index || 0].AllowedUrls as any[]
                  ).map((data1: any, index1: any) => {
                    return (
                      <tr key={index1}>
                        <td>{data1.Url}</td>
                        <td>{data1.Methods}</td>
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
