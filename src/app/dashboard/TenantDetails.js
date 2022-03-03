import React, { useState, useRef, useEffect } from "react";
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

import { regexForName, regexForUser } from "../constants/constantVariables";

toast.configure();
export default function TenantDetails() {
  const name = useRef(null);
  const databasename = useRef(null);
  const userid = useRef(null);
  const navigate = useNavigate();
  const { state } = useLocation();

  const [deleteshow, setDeleteshow] = useState(false);
  const [edit, setEdit] = useState(false);
  console.log(setEdit);
  const [tenant, setTenant] = useState({
    name: null,
    description: null,
    userid: null,
    email: null,
    databasename: null,
    type: "tenant",
  });
  const [err, setErr] = useState({
    name: null,
    userid: null,
    email: null,
    databasename: null,
    no: null,
  });
  useEffect(() => {
    setTenant(state.tenantDetails);
  }, []);
  //const renderTenant = () => {

  //};
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
  const updateTenant = async () => {
    setErr({
      ...err,
      no: false,
    });
    if (!regexForName.test(tenant.name)) {
      setErr({
        ...err,
        name: true,
      });
      name.current.focus();
    } else if (!regexForUser.test(tenant.userid)) {
      setErr({
        ...err,
        userid: true,
        name: false,
      });
      userid.current.focus();
    } else if (!regexForName.test(tenant.databasename)) {
      setErr({
        ...err,
        databasename: true,
        userid: false,
        name: false,
      });
      databasename.current.focus();
    } else {
      setErr({
        databasename: false,
        userid: false,
        name: false,
        no: true,
      });
      let updated = {
        ...tenant,
      };
      updateTenantData(tenant.id, updated).then(() => {});
      //setModalShow(false);
      toast.success("Tenant Details Update", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
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
          <Form className="p-4">
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Name :</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    ref={name}
                    value={tenant.name}
                    isInvalid={err.name}
                    isValid={err.no}
                    disabled={!edit}
                    onChange={(e) => {
                      setTenant({ ...tenant, name: e.target.value });
                    }}
                    required
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
                    ref={userid}
                    isValid={err.no}
                    value={tenant.userid}
                    isInvalid={err.userid}
                    disabled={!edit}
                    onChange={(e) => {
                      setTenant({ ...tenant, userid: e.target.value });
                    }}
                    required
                  />
                  {tenant.userid && !regexForUser.test(tenant.userid) && (
                    <span className="text-danger">
                      Id Should Contain alphabet, number.(i.e. : paras123,
                      p_A_r_A_s_1)
                    </span>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>EmailId :</Form.Label>

                  <Form.Control type="text" disabled value={tenant.email} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>DatabaseName :</Form.Label>

                  <Form.Control
                    type="text"
                    ref={databasename}
                    placeholder="Enter database name"
                    value={tenant.databasename}
                    isValid={err.no}
                    isInvalid={err.databasename}
                    disabled={!edit}
                    onChange={(e) => {
                      setTenant({ ...tenant, databasename: e.target.value });
                    }}
                    required
                  />
                  {tenant.databasename &&
                    !regexForName.test(tenant.databasename) && (
                      <span className="text-danger">
                        DatabaseName Should Not Cantain Any Special Character or
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
                    disabled={!edit}
                    placeholder="Enter host of db server"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Port :</Form.Label>

                  <Form.Control
                    type="text"
                    disabled={!edit}
                    placeholder="Enter Port of db server"
                    required
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
                    rows={3}
                    className="form-control rounded-0"
                    id="description"
                    placeholder="Here...."
                    value={tenant.description}
                    disabled={!edit}
                    onChange={(e) => {
                      setTenant({ ...tenant, description: e.target.value });
                    }}
                    required
                  />
                </Form.Group>
              </Col>
              {edit ? (
                <Button
                  onClick={() => updateTenant()}
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
                onClick={() => navigate("/tenant")}
              >
                Cancel
              </Button>
            </Row>
          </Form>

          {/* </Card> */}
        </Container>
      </div>
    </>
  );
}
