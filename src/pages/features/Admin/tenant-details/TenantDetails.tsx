import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Dropdown,
  Modal,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import { IErrorTenantDetail, ITenantData } from "../../../../types/index";
import {
  regexForName,
  regexForUser,
  regexForEmail,
} from "../../../../resources/constants";
import { useAppDispatch } from "../../../../store/hooks";
import { deleteTenant } from "../../../../store/features/admin/delete-tenant/slice";
import { updateTenant } from "../../../../store/features/tenant/update-tenant/slice";
import { ToastAlert } from "../../../../components/ToasterAlert/ToastAlert";

interface LocationState {
  val: ITenantData;
}
export default function TenantDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  console.log(location);
  const [deleteshow, setDeleteshow] = useState(false);
  const [edit, setEdit] = useState(false);
  // console.log(setEdit);
  const [tenant, setTenant] = useState<ITenantData>({
    name: "",
    description: "",
    userid: "",
    email: "",
    databaseName: "",
    databaseDescription: "",
    type: "tenant",
  });
  const [err, setErr] = useState<IErrorTenantDetail>({
    name: "",
    userid: "",
    email: "",
    databaseName: "",
  });
  useEffect(() => {
    const { val } = location.state as LocationState;
    console.log(val);
    setTenant(val);
  }, []);
  console.log(tenant);
  // const renderTenant = () => {

  // };
  const deleteTenantFunction = () => {
    const { val } = location.state as LocationState;
    if (val.id !== undefined) {
      dispatch(deleteTenant(val.id));
      ToastAlert("Tenant Removed", "success");
      navigate("/tenantlist");
    }
  };

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
          ToastAlert("Tenant Details Update", "success");
        }
      } else {
        ToastAlert("Please Fill All Fields", "warning");
      }
    }
  };

  return (
    <>
      <Dropdown className="d-inline-block">
        <Dropdown.Toggle className="btn-success " id="dropdown-basic">
          Action
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setDeleteshow(true)}>
            Delete Tenant
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown className="d-inline-block">
        <Dropdown.Toggle className=" btn-danger " id="dropdown-basic">
          Utilis
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>Test</Dropdown.Item>
          <Dropdown.Item>Set Tenant Url</Dropdown.Item>
          <Dropdown.Item>Set InActive</Dropdown.Item>
          <Dropdown.Item>Upload</Dropdown.Item>
          <Dropdown.Item>Create tenant tables & data</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Modal show={deleteshow} onHide={() => setDeleteshow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Tenant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do You want To delete the tenant,Then whole database will be delete
          under tenant
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-danger" onClick={() => deleteTenantFunction()}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
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
                    id="description"
                    placeholder="Here...."
                    value={tenant.description}
                    disabled={!edit}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              {edit ? (
                <Button
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                    handleUpdateTenant(event)
                  }
                  className="mt-3 info ml-4"
                >
                  Update
                </Button>
              ) : (
                <Button
                  onClick={() => setEdit(true)}
                  className="mt-3 info ml-4"
                >
                  Edit
                </Button>
              )}

              <Button
                className="btn btn-light mt-3"
                type="reset"
                onClick={() => navigate("/tenantlist")}
              >
                Cancel
              </Button>
            </Row>
          </Form>
        </Container>
      </div>
    </>
  );
}
