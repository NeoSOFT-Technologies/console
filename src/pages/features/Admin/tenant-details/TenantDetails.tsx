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
import { useNavigate, useParams } from "react-router";
import Spinner from "../../../../components/loader/Loader";
// import Spinner from "../../../../components/loader/Loader";
import { ToastAlert } from "../../../../components/toast-alert/toast-alert";
import {
  regexForName,
  // regexForUser,
  // regexForEmail,
} from "../../../../resources/constants";
import { RootState } from "../../../../store";
// import { RootState } from "../../../../store";
import { deleteTenant } from "../../../../store/features/admin/delete-tenant/slice";
import { tenantDetails } from "../../../../store/features/tenant/tenant-details/slice";
import { updateTenant } from "../../../../store/features/tenant/update-tenant/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { IErrorTenantDetail } from "../../../../types/index";

interface IDATA {
  createdDateTime: string;
  description: string;
  host: string;
  id: number;
  policy: string;
  port: number;
  tenantDbName: string;
  tenantId: number;
  tenantName: string;
}

export default function TenantDetails() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const tenantDetailsState = useAppSelector(
    (state: RootState) => state.tenantDetails
  );

  const tenantDeleted = useAppSelector(
    (state: RootState) => state.deleteTenant
  );

  const [deleteshow, setDeleteshow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [tenant, setTenant] = useState<IDATA>({
    createdDateTime: "",
    description: "",
    host: "",
    id: 0,
    policy: "",
    port: 0,
    tenantDbName: "",
    tenantId: 0,
    tenantName: "",
  });
  console.log(tenant);
  const [error, setError] = useState<IErrorTenantDetail>({
    description: "",
  });

  useEffect(() => {
    const { tenantName } = params;
    (async () => {
      if (tenantName) {
        await dispatch(tenantDetails(tenantName));
        setTenant({ ...tenantDetailsState.data });
      }
    })();
  }, []);

  const deleteTenantFunction = async () => {
    const { tenantName } = params;
    if (tenantName) {
      await dispatch(deleteTenant(tenantName));
      ToastAlert("Tenant Removed", "success");
      navigate("/tenantlist");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      default:
        break;
    }
    setTenant({ ...tenant, [name]: value });
  };

  const handleValidate = () => {
    const validate = !!(error.description === "");
    return validate;
  };

  const handleUpdateTenant = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // console.log(error);
    if (handleValidate()) {
      if (tenant.tenantName !== "" && tenant.tenantDbName !== "") {
        if (tenant.tenantName !== undefined) {
          dispatch(updateTenant({ ...tenant }));
          setEdit(false);
          ToastAlert("Tenant Details Update", "success");
        }
      } else {
        ToastAlert("Please Fill All Fields", "warning");
      }
    }
  };

  return tenantDeleted.loading || tenantDetailsState.loading ? (
    <Spinner />
  ) : (
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
          {/* <Dropdown.Item onClick={() => navigate("/manageroles")}>
            Manage Roles
          </Dropdown.Item>
          <Dropdown.Item onClick={() => navigate("/tenantpermission")}>
            Manage Permission
          </Dropdown.Item> */}
          <Dropdown.Item>Set Tenant Url</Dropdown.Item>
          {/* <Dropdown.Item>Set InActive</Dropdown.Item> */}
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
                    name="tenantName"
                    onChange={handleInputChange}
                    value={tenant.tenantName}
                    disabled
                    // isInvalid={!!error.tenantName}
                  />
                  {tenant.tenantName &&
                    !regexForName.test(tenant.tenantName) && (
                      <span className="text-danger">
                        Name Should Not Cantain Any Special Character or Number
                      </span>
                    )}
                </Form.Group>
              </Col>
              {/* <Col md="6">
                <Form.Group className="mb-3">
                  <Form.Label>email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="email"
                    value={tenant.email}
                    name="email"
                    onChange={handleInputChange}
                    disabled={!edit}
                    isInvalid={!!error.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {error.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col> */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>databaseName :</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={handleInputChange}
                    name="tenantDbName"
                    // disabled={!edit}
                    disabled
                    placeholder="Enter database name"
                    value={tenant.tenantDbName}
                    // isInvalid={!!error.tenantDbName}
                  />
                  {tenant.tenantDbName &&
                    !regexForName.test(tenant.tenantDbName) && (
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
                    value={tenant.host}
                    name="host"
                    onChange={handleInputChange}
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Port :</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="port"
                    value={tenant.port}
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
                  // controlId="exampleForm.ControlTextarea1"
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
                    isInvalid={!!error.description}
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
