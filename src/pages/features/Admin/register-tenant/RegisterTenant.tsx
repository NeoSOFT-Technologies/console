import React, { useState } from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap";

import {
  regexForEmail,
  regexForName,
  regexForUser,
  regForPassword,
} from "../../../../resources/constants";
import { addNewTenant } from "../../../../store/features/admin/add-tenant/slice";
import { useAppDispatch } from "../../../../store/hooks";
import { IErrorTenantInput, ITenantData } from "../../../../types/index";
import { ToastAlert } from "../../../../components/ToasterAlert/ToastAlert";

export default function RegisterTenant() {
  const dispatch = useAppDispatch();
  const [tenant, setTenant] = useState<ITenantData>({
    name: "",
    description: "",
    userid: "",
    email: "",
    password: "",
    databaseName: "",
    databaseDescription: "",
    type: "tenant",
  });
  const [err, setErr] = useState<IErrorTenantInput>({
    name: "",
    userid: "",
    email: "",
    password: "",
    databaseName: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);
    const { name, value } = event.target;
    switch (name) {
      case "databaseName":
        setErr({
          ...err,
          [name]: regexForName.test(value)
            ? ""
            : "databaseName should only consist Alphabets",
        });
        break;

      case "name":
        setErr({
          ...err,
          [name]: regexForName.test(value)
            ? ""
            : "Name should only consist Alphabets",
        });
        break;
      case "password":
        setErr({
          ...err,
          [name]: regForPassword.test(value)
            ? ""
            : "Password should contains Alphabet,special Charater,Number",
        });
        break;

      case "userid":
        setErr({
          ...err,
          [name]: regexForUser.test(value)
            ? ""
            : "Username should contains alteast 1number and Alphabets ",
        });
        break;
      case "email":
        setErr({
          ...err,
          [name]: regexForEmail.test(value)
            ? ""
            : "Email should contains atlast @,.com",
        });
        break;

      default:
        break;
    }
    setTenant({ ...tenant, [name]: value });
  };
  const handleValidate = () => {
    const validate = !!(
      err.name === "" &&
      err.userid === "" &&
      err.email === "" &&
      err.databaseName === "" &&
      err.password === ""
    );
    return validate;
  };
  const handleSubmitTenant = (event: React.FormEvent) => {
    event.preventDefault();

    if (handleValidate()) {
      if (
        tenant.name !== "" &&
        tenant.userid !== "" &&
        tenant.email !== "" &&
        tenant.databaseName !== "" &&
        tenant.password !== ""
      ) {
        const newUser = {
          ...tenant,

          lastlogin: "Mar 01 2022 11:51:39",
        };

        dispatch(addNewTenant(newUser));
        ToastAlert("Tenant Registered", "success");

        setTenant({
          name: "",
          description: "",
          userid: "",
          email: "",
          password: "",
          databaseName: "",
          databaseDescription: "",
          type: "tenant",
        });
      } else {
        ToastAlert("Please Fill All Fields", "warning");
      }
    } else {
      setErr({
        name: "",

        userid: "",
        email: "",
        password: "",
        databaseName: "",
      });
    }
  };
  const clearData = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setTenant({
      name: "",
      description: "",
      userid: "",
      email: "",
      password: "",
      databaseName: "",
      databaseDescription: "",
      type: "tenant",
    });
  };
  return (
    <>
      <div className=" bg-white">
        <Container className="m-1">
          <h1 className="text-center text-dark pb-2 pt-3">
            Register New Tenant
          </h1>
          <Form
            onSubmit={handleSubmitTenant}
            data-testid="form-input"
            className="p-4"
          >
            <Row>
              <Col md="6">
                <Form.Group className="mb-3">
                  <Form.Label> Tenant Name :</Form.Label>
                  <Form.Control
                    type="text"
                    id="name"
                    placeholder="Enter Name"
                    name="name"
                    data-testid="name-input"
                    value={tenant.name}
                    isInvalid={!!err.name}
                    isValid={!err.name && !!tenant.name}
                    onChange={handleInputChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {err.name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group className="mb-3">
                  <Form.Label>UserID :</Form.Label>
                  <Form.Control
                    type="text"
                    name="userid"
                    id="userid"
                    data-testid="userid-input"
                    placeholder="Enter User ID"
                    isValid={!err.userid && !!tenant.userid}
                    value={tenant.userid}
                    isInvalid={!!err.userid}
                    onChange={handleInputChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {err.userid}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group className="mb-3">
                  <Form.Label>Email :</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    name="email"
                    id="email"
                    value={tenant.email}
                    isValid={!err.email && !!tenant.email}
                    data-testid="email-input"
                    isInvalid={!!err.email}
                    onChange={handleInputChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {err.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group className="mb-3">
                  <Form.Label>Password :</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    data-testid="password-input"
                    value={tenant.password}
                    name="password"
                    id="password"
                    isValid={!err.password && !!tenant.password}
                    isInvalid={!!err.password}
                    onChange={handleInputChange}
                    required
                  />{" "}
                  <Form.Control.Feedback type="invalid">
                    {err.password}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md="12">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label> Tenant Description :</Form.Label>
                  <Form.Control
                    as="textarea"
                    type="textarea"
                    data-testid="databaseDescription-input"
                    name="description"
                    placeholder="Here...."
                    rows={3}
                    value={tenant.description}
                    className="form-control rounded-0"
                    id="description"
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group className="mb-3">
                  <Form.Label> Database Name :</Form.Label>
                  <Form.Control
                    data-testid="databaseName-input"
                    type="text"
                    placeholder="Enter Name"
                    name="databaseName"
                    id="databaseName"
                    value={tenant.databaseName}
                    isInvalid={!!err.databaseName}
                    isValid={!err.databaseName && !!tenant.databaseName}
                    onChange={handleInputChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {err.databaseName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md="12">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Database Description:</Form.Label>
                  <Form.Control
                    as="textarea"
                    type="textarea"
                    name="databaseDescription"
                    data-testid="databaseDescription-input"
                    rows={3}
                    className="form-control rounded-0"
                    id="description"
                    placeholder="Here...."
                    value={tenant.databaseDescription}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button className="info" type="submit" data-testid="submit-input">
              Submit
            </Button>
            <Button
              className="btn btn-light"
              type="reset"
              data-testid="cancel-input"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                clearData(event)
              }
            >
              Cancel
            </Button>
          </Form>
        </Container>
      </div>
    </>
  );
}
