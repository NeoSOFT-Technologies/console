import React, { useState } from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Spinner from "../../../../components/loader/Loader";
import { ToastAlert } from "../../../../components/toast-alert/toast-alert";
import {
  regexForEmail,
  regexForName,
  // regexForUser,
  regForPassword,
} from "../../../../resources/constants";
import { RootState } from "../../../../store";
import { addNewTenant } from "../../../../store/features/admin/add-tenant/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  IErrorTenantInput,
  ITenantRegisterData,
} from "../../../../types/index";

export default function RegisterTenant() {
  const tenantAdded = useAppSelector((state: RootState) => state.addNewTenant);
  const dispatch = useAppDispatch();
  const [tenant, setTenant] = useState<ITenantRegisterData>({
    tenantName: "",
    description: "",
    email: "",
    password: "",
    databaseName: "",
    databaseDescription: "",
  });
  const [error, setError] = useState<IErrorTenantInput>({
    tenantName: "",
    email: "",
    password: "",
    description: "",
    databaseName: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);
    const { name, value } = event.target;
    switch (name) {
      case "description":
        setError({
          ...error,
          [name]: regexForName.test(value)
            ? ""
            : "description should only consist Alphabets",
        });
        break;

      case "tenantName":
        setError({
          ...error,
          [name]: regexForName.test(value)
            ? ""
            : "Name should only consist Alphabets",
        });
        break;
      case "password":
        setError({
          ...error,
          [name]: regForPassword.test(value)
            ? ""
            : "Password should contains Alphabet,special Charater,Number",
        });
        break;
      case "email":
        setError({
          ...error,
          [name]: regexForEmail.test(value)
            ? ""
            : "Email should contains atlast @,.com",
        });
        break;
      case "databaseName":
        setError({
          ...error,
          [name]: regexForEmail.test(value)
            ? ""
            : "database Name should not be empty",
        });
        break;
      default:
        break;
    }
    setTenant({ ...tenant, [name]: value });
  };
  const handleValidate = () => {
    const validate = !!(
      (
        error.tenantName === "" &&
        error.email === "" &&
        error.description === "" &&
        error.password === "" &&
        error.databaseName
      )
      // error.roles === ""
    );
    return validate;
  };
  const handleSubmitTenant = async (event: React.FormEvent) => {
    event.preventDefault();

    if (handleValidate()) {
      if (
        tenant.tenantName !== "" &&
        tenant.email !== "" &&
        tenant.description !== "" &&
        tenant.password !== ""
        // tenant.roles.length > 0
      ) {
        const newUser = {
          ...tenant,
        };
        // console.log(newUser);
        await dispatch(addNewTenant(newUser));

        ToastAlert("Tenant Registered", "success");

        setTenant({
          tenantName: "",
          description: "",
          email: "",
          password: "",
          databaseName: "",
          databaseDescription: "",
        });
      } else {
        ToastAlert("Please Fill All Fields", "warning");
      }
    } else {
      setError({
        tenantName: "",
        email: "",
        password: "",
        description: "",
        databaseName: "",
      });
    }
  };
  const clearData = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setTenant({
      tenantName: "",
      description: "",
      email: "",
      password: "",
      databaseName: "",
      databaseDescription: "",
    });
  };
  return (
    <>
      {tenantAdded.loading && <Spinner />}
      {!tenantAdded.loading && tenantAdded.error && (
        <Navigate to={`/error`} state={tenantAdded.error} />
      )}
      {!tenantAdded.loading && !tenantAdded.error && (
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
                      id="tenantName"
                      placeholder="Enter tenantName"
                      name="tenantName"
                      data-testid="tenantName-input"
                      value={tenant.tenantName}
                      isInvalid={!!error.tenantName}
                      isValid={!error.tenantName && !!tenant.tenantName}
                      onChange={handleInputChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {error.tenantName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group className="mb-3">
                    <Form.Label>Email :</Form.Label>
                    <Form.Control
                      data-testid="email-input"
                      type="email"
                      placeholder="Enter Email"
                      name="email"
                      // id="email"
                      value={tenant.email}
                      isValid={!error.email && !!tenant.email}
                      isInvalid={!!error.email}
                      onChange={handleInputChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {error.email}
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
                      // id="password"
                      isValid={!error.password && !!tenant.password}
                      isInvalid={!!error.password}
                      onChange={handleInputChange}
                      required
                    />{" "}
                    <Form.Control.Feedback type="invalid">
                      {error.password}
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
                      data-testid="tenantDescription-input"
                      name="description"
                      placeholder="Here...."
                      rows={3}
                      value={tenant.description}
                      className="form-control rounded-0"
                      // id="description"
                      onChange={handleInputChange}
                      isInvalid={!!error.description}
                      isValid={!error.description && !!tenant.description}
                      required
                    />
                  </Form.Group>
                  <Form.Control.Feedback type="invalid">
                    {error.description}
                  </Form.Control.Feedback>
                </Col>
                <Col md="6">
                  <Form.Group className="mb-3">
                    <Form.Label> Database Name :</Form.Label>
                    <Form.Control
                      data-testid="databaseName-input"
                      type="text"
                      placeholder="Enter Name"
                      name="databaseName"
                      // id="databaseName"
                      value={tenant.databaseName}
                      onChange={handleInputChange}
                    />
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
                      // id="description"
                      placeholder="Here...."
                      value={tenant.databaseDescription}
                      onChange={handleInputChange}
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
      )}
      {!tenantAdded.loading &&
        !tenantAdded.error &&
        tenantAdded?.tenantAdded && <Navigate to="/tenantlist" />}
    </>
  );
}
