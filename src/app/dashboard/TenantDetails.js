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
import { updateTenantData, deleteTenantData } from "../config/Myservices";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  regexForName,
  regexForUser,
  regexForEmail,
} from "../constants/constantVariables";
toast.configure();

export default function TenantDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [deleteshow, setDeleteshow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [tenant, setTenant] = useState({
    name: null,
    description: null,
    userid: null,
    email: null,
    databasename: null,
    port: null,
    host: null,
    type: "tenant",
  });
  const [err, setErr] = useState({
    name: "",
    description: "",
    userid: "",
    email: "",
    databasename: "",
    port: "",
    host: "",
  });

  useEffect(() => {
    setTenant(state.tenantDetails);
  }, []);

  const deleteTenant = () => {
    deleteTenantData(state.tenantDetails.id).then(() => {});
    toast.error("Tenant Removed", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
    });

    navigate("/tenant");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setErr({
          ...err,
          [name]: regexForName.test(value) ? "" : "Enter a valid name",
        });
        break;
      case "description":
        // setErr({
        //   ...err,
        //   [name]: regexForUser.test(value) ? "" : "Enter a valid Username ",
        // });
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
      case "databasename":
        // setErr({
        //   ...err,
        //   [name]: regexForUser.test(value) ? "" : "Enter a valid Username ",
        // });
        break;
      case "port":
        // setErr({
        //   ...err,
        //   [name]: regForPassword.test(value)
        //     ? ""
        //     : "Enter a Valid Password (must include 8 character)",
        // });
        break;
      case "host":
        // setErr({
        //   ...err,
        //   [name]: regexForName.test(value) ? "" : "Enter a valid tenant name ",
        // });
        break;
      default:
        break;
    }
    setTenant({ ...tenant, [name]: value });
  };
  const handleValidate = (err) => {
    let validate =
      err.name === "" &&
      err.description === "" &&
      err.userid === "" &&
      err.email === "" &&
      err.port === "" &&
      err.host === "" &&
      err.databasename === ""
        ? true
        : false;
    return validate;
  };
  const handleUpdateTenant = (event) => {
    event.preventDefault();
    console.log(err);
    if (handleValidate(err)) {
      console.log("update");
      if (
        tenant.name !== "" &&
        tenant.description !== "" &&
        tenant.userid !== "" &&
        tenant.email !== "" &&
        tenant.port !== "" &&
        tenant.host !== "" &&
        tenant.databasename !== ""
      ) {
        // dispatch(update(tenant));
        // let updated = tenant;
        const updated = { ...tenant };
        updateTenantData(tenant.id, updated).then(() => {});
        setEdit(false);
        toast.success("Tenant Details Update", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
        });
        // toast_alert("Tenant Upated", "success");
        // navigate("/login");
      } else {
        // toast_alert("Please Fill All Fields", "warning");
      }
    } else {
      // toast_alert("Please Enter Valid Details", "warning");
    }
  };
  return (
    <>
      <Dropdown className="d-inline-block">
        <Dropdown.Toggle className="   btn-success " id="dropdown-basic">
          Action
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setDeleteshow(true)}>
            Delete Tenant
          </Dropdown.Item>
          <Dropdown.Item onClick={() => navigate("/userlist")}>
            Show users
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
          <Button className="btn-danger" onClick={() => deleteTenant()}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
      <div className=" bg-white">
        <Container className="m-1">
          {/* <Card style={{ width: "500px", height: "400px" }} className="m-1 p-4"> */}
          <h2 className="text-center pt-3 p-3">Tenant Details </h2>
          <Form onSubmit={handleUpdateTenant}>
            <Row>
              <Col md="6">
                <Form.Group md="6">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="name"
                    value={tenant.name}
                    name="name"
                    onChange={handleInputChange}
                    disabled={!edit}
                    isInvalid={err.name}
                    isValid={!err.name && tenant.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {err.name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group md="6">
                  <Form.Label>Userid</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="userid"
                    value={tenant.userid}
                    name="userid"
                    onChange={handleInputChange}
                    disabled={!edit}
                    isInvalid={err.userid}
                    isValid={!err.userid && tenant.userid}
                  />
                  <Form.Control.Feedback type="invalid">
                    {err.userid}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group md="6">
                  <Form.Label>email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="email"
                    value={tenant.email}
                    name="email"
                    onChange={handleInputChange}
                    disabled
                    isInvalid={err.email}
                    isValid={!err.email && tenant.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {err.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group md="6">
                  <Form.Label>databasename</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="databasename"
                    value={tenant.databasename}
                    name="databasename"
                    onChange={handleInputChange}
                    disabled={!edit}
                    isInvalid={err.databasename}
                    isValid={!err.databasename && tenant.databasename}
                  />
                  <Form.Control.Feedback type="invalid">
                    {err.databasename}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group md="6">
                  <Form.Label>host</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="host"
                    // value={tenant.host}
                    // defaultValue="193.168.0.1"
                    value="193.168.0.1"
                    name="host"
                    onChange={handleInputChange}
                    disabled={!edit}
                    isInvalid={err.host}
                    isValid={!err.host && tenant.host}
                  />
                  <Form.Control.Feedback type="invalid">
                    {err.host}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group md="6">
                  <Form.Label>port</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="port"
                    // value={tenant.port}
                    // defaultValue="8989"
                    value="8989"
                    name="port"
                    onChange={handleInputChange}
                    disabled={!edit}
                    isInvalid={err.port}
                    isValid={!err.port && tenant.port}
                  />
                  <Form.Control.Feedback type="invalid">
                    {err.port}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md="12">
                <Form.Group md="6">
                  <Form.Label>description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="description"
                    value={tenant.description}
                    name="description"
                    onChange={handleInputChange}
                    disabled={!edit}
                    isInvalid={err.description}
                    isValid={!err.description && tenant.description}
                  />
                  <Form.Control.Feedback type="invalid">
                    {err.description}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            {edit && (
              <>
                <Button type="submit" className="mb-3 info ml-4">
                  Update
                </Button>
                <Button
                  className="btn btn-light mb-3"
                  type="reset"
                  onClick={() => navigate("/tenant")}
                >
                  Cancel
                </Button>
              </>
            )}
          </Form>
          {!edit && (
            <Button onClick={() => setEdit(true)} className="mb-3 info ml-4">
              Edit
            </Button>
          )}
          {/* <span className="text-danger">
            Name Should Not Cantain Any Special Character or Number
          </span>
          <span className="text-danger">
            Id Should Contain alphabet, number.(i.e. : paras123, p_A_r_A_s_1)
          </span>
          <span className="text-danger">
            DatabaseName Should Not Cantain Any Special Character or Number
          </span> */}
          {/* </Card> */}
        </Container>
      </div>
    </>
  );
}
