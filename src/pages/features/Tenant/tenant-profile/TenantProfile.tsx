import React, { useEffect, useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

import { IUserDataState } from "../../../../types";
import {
  regexForName,
  regexForUser,
  regexForEmail,
} from "../../../../resources/constants";
import { useAppDispatch } from "../../../../store/hooks";
import { ToastAlert } from "../../../../components/toaster-alert/ToastAlert";
import { updateTenant } from "../../../../store/features/tenant/update-tenant/slice";
import { IErrorTenantDetail, ITenantData } from "../../../../types/index";
const TenantProfile = () => {
  const user: IUserDataState = useSelector(
    (state: RootState) => state.userData
  );
  const [edit, setEdit] = useState(false);
  const dispatch = useAppDispatch();
  const [tenant, setTenant] = useState<ITenantData>({
    name: "",
    description: "",
    userid: "",
    email: "",
    databaseName: "",
    databaseDescription: "",
    // roles: [],
    type: "tenant",
  });
  const [err, setErr] = useState<IErrorTenantDetail>({
    name: "",
    userid: "",
    email: "",
    databaseName: "",
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setErr({
          ...err,
          [name]: regexForName.test(value) ? "" : "Enter a valid name",
        });
        break;

      case "userid":
        setErr({
          ...err,
          [name]: regexForUser.test(value) ? "" : "Enter a valid Username ",
        });
        break;
      case "email":
        setErr({
          ...err,
          [name]: regexForEmail.test(value) ? "" : "Enter a Valid Email",
        });
        break;
      case "databaseName":
        setErr({
          ...err,
          [name]: regexForName.test(value)
            ? ""
            : "databaseName should only consist Alphabets",
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
      err.databaseName === ""
    );
    return validate;
  };
  const handleUpdateTenant = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(err);
    if (handleValidate()) {
      console.log("update");
      if (
        tenant.name !== "" &&
        tenant.userid !== "" &&
        tenant.email !== "" &&
        tenant.databaseName !== ""
      ) {
        // const updated = { ...tenant };
        if (tenant.id !== undefined) {
          dispatch(updateTenant({ id: tenant.id, data: tenant }));
          setEdit(false);
          console.log(tenant.id);
          // console.log(dispatch(updateTenant({ id: tenant.id, data: tenant })));
          ToastAlert("Tenant Details Update", "success");
        }
      } else {
        ToastAlert("Please Fill All Fields", "warning");
      }
    }
  };
  useEffect(() => {
    // console.log(user.data);
    if (user.data) {
      setTenant(user.data);
    }
  }, [user.data]);
  return (
    <>
      <div className=" bg-white">
        <Container className="m-1">
          <h2 className="text-center pt-3 p-3">Tenant Details </h2>
          <Form className="p-4">
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Name :</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    data-testid="name-input"
                    name="name"
                    onChange={handleInputChange}
                    value={tenant.name}
                    disabled={!edit}
                    isInvalid={!!err.name}
                  />
                  {tenant.name && !regexForName.test(tenant.name) && (
                    <span className="text-danger">
                      Name Should Not Cantain Any Special Character or Number
                    </span>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>UserId :</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Enter User ID"
                    data-testid="userid-input"
                    name="userid"
                    disabled={!edit}
                    value={tenant.userid}
                    isInvalid={!!err.userid}
                    onChange={handleInputChange}
                  />
                  {tenant.userid && !regexForUser.test(tenant.userid) && (
                    <span className="text-danger">
                      Id Should Contain alphabet, number.(i.e. : paras123,
                      p_A_r_A_s_1)
                    </span>
                  )}
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group className="mb-3">
                  <Form.Label>email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="email"
                    data-testid="email-input"
                    value={tenant.email}
                    name="email"
                    onChange={handleInputChange}
                    disabled={!edit}
                    isInvalid={!!err.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {err.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>databaseName :</Form.Label>

                  <Form.Control
                    type="text"
                    onChange={handleInputChange}
                    name="databaseName"
                    data-testid="databaseName-input"
                    disabled={!edit}
                    placeholder="Enter database name"
                    value={tenant.databaseName}
                    isInvalid={!!err.databaseName}
                  />
                  {tenant.databaseName &&
                    !regexForName.test(tenant.databaseName) && (
                      <span className="text-danger">
                        databaseName Should Not Cantain Any Special Character or
                        Number
                      </span>
                    )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Host :</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="host"
                    // value={tenant.host}
                    // defaultValue="193.168.0.1"
                    data-testid="host-input"
                    value="193.168.0.1"
                    name="host"
                    onChange={handleInputChange}
                    disabled
                    // isInvalid={!!err.host}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Port :</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="port"
                    // value={tenant.port}
                    // defaultValue="8989"
                    data-testid="port-input"
                    value="8989"
                    name="port"
                    onChange={handleInputChange}
                    disabled
                    // isInvalid={!!err.port}
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Description:</Form.Label>

                  <Form.Control
                    as="textarea"
                    name="description"
                    rows={3}
                    className="form-control rounded-0"
                    data-testid="description-input"
                    id="description"
                    placeholder="Here...."
                    value={tenant.description}
                    disabled={!edit}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              {/* <Col md={6}>
                <h6>Roles</h6>

                <ul>
                  <li>Tenant roles cannot edit</li>
                  <li>Tenant roles cannot edit</li>
                  <li>Tenant roles cannot edit</li>
                </ul>
              </Col>
              <Col md={6}> */}
              {/* <h6>Permissions</h6>
                <ListGroup as="ul">
                  <ListGroup.Item as="li" className="bb">
                    Tenant roles cannot edit
                  </ListGroup.Item>
                  <ListGroup.Item as="li">
                    Tenant roles cannot edit
                  </ListGroup.Item>
                  <ListGroup.Item as="li">
                    Tenant roles cannot edit
                  </ListGroup.Item>
                </ListGroup>
              </Col> */}
              {edit ? (
                <Button
                  data-testid="update-button"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                    handleUpdateTenant(event)
                  }
                  className="mt-3 info ml-4"
                >
                  Update
                </Button>
              ) : (
                <Button
                  data-testid="edit-button"
                  onClick={() => setEdit(true)}
                  className="mt-3 info ml-4"
                >
                  Edit
                </Button>
              )}
            </Row>
          </Form>
        </Container>
      </div>
    </>
  );
};
export default TenantProfile;
