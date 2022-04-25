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
import Spinner from "../../../../../components/loader/Loader";
import { ToastAlert } from "../../../../../components/toast-alert/toast-alert";
import {
  regexForName,
  regexForDatabaseName,
  regexForDescription,
} from "../../../../../resources/constants";
import { RootState } from "../../../../../store";
import { deleteTenant } from "../../../../../store/features/admin/delete-tenant/slice";
import {
  tenantDetails,
  resetTenantDetails,
} from "../../../../../store/features/tenant/tenant-details/slice";
import { updateTenant } from "../../../../../store/features/tenant/update-tenant/slice";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { IErrorTenantDetail, ITenantDetail } from "../../../../../types/index";

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
  const updateTenantState = useAppSelector(
    (state: RootState) => state.updateTenantState
  );

  const [deleteshow, setDeleteshow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [tenant, setTenant] = useState<ITenantDetail>({
    createdDateTime: "",
    description: "",
    host: "",
    id: 0,
    policy: "",
    port: 0,
    databaseName: "",
    tenantId: 0,
    tenantName: "",
  });
  const [error, setError] = useState<IErrorTenantDetail>({
    description: "",
  });

  useEffect(() => {
    const { tenantName } = params;
    if (tenantName) dispatch(tenantDetails(tenantName));
    else {
      navigate("/error", { state: "404" });
    }
    return () => {
      dispatch(resetTenantDetails());
    };
  }, []);

  useEffect(() => {
    const data = tenantDetailsState.data;
    if (data) setTenant({ ...data });
  }, [tenantDetailsState.data]);

  const deleteTenantFunction = async () => {
    const { tenantName } = params;
    if (tenantName) {
      await dispatch(deleteTenant(tenantName));
      if (tenantDeleted.isDeleted) {
        ToastAlert("Tenant Removed", "success");
        navigate("/tenant/admin/tenants");
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "description":
        setError({
          ...error,
          [name]: regexForDescription.test(value)
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
    if (
      handleValidate() &&
      tenant.tenantName !== "" &&
      tenant.databaseName !== ""
    ) {
      if (tenant.tenantName !== undefined) {
        dispatch(updateTenant({ ...tenant }));
        setEdit(false);
      } else {
        ToastAlert("Please Fill All Fields", "warning");
      }
    }
  };

  useEffect(() => {
    if (
      !updateTenantState.loading &&
      tenant.createdDateTime !== "" &&
      tenant.description !== "" &&
      tenant.host !== "" &&
      tenant.id > 0 &&
      tenant.policy !== "" &&
      tenant.port > 0 &&
      tenant.databaseName !== "" &&
      tenant.tenantId > 0 &&
      tenant.tenantName
    ) {
      if (updateTenantState.isUpdated) {
        ToastAlert("Tenant Details Update", "success");
      } else {
        ToastAlert("Could not Update Tenant Details", "error");
      }
    }
  }, [updateTenantState]);

  useEffect(() => {
    if (!tenantDeleted.loading && tenantDeleted.error) {
      navigate("/error", { state: tenantDeleted.error });
    }
    if (!tenantDetailsState.loading && tenantDetailsState.error) {
      navigate("/error", { state: tenantDetailsState.error });
    }
    if (!updateTenantState.loading && updateTenantState.error) {
      navigate("/error", { state: updateTenantState.error });
    }
    if (
      !tenantDeleted.loading &&
      !tenantDeleted.error &&
      tenantDeleted?.isDeleted
    ) {
      navigate("/tenant/admin/tenants");
    }
  }, [
    tenantDeleted.loading,
    tenantDetailsState.loading,
    updateTenantState.loading,
  ]);

  return (
    <>
      {tenantDeleted.loading ||
      tenantDetailsState.loading ||
      updateTenantState.loading ? (
        <Spinner />
      ) : (
        tenantDetailsState.data && (
          <>
            <Dropdown className="d-inline-block">
              <Dropdown.Toggle
                className="btn-success "
                id="dropdown-basic"
                data-testid="dropdown-action"
              >
                Action
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => setDeleteshow(true)}
                  data-testid="dropdown-items"
                >
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
                <Dropdown.Item>Upload</Dropdown.Item>
                <Dropdown.Item>Create tenant tables & data</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Modal
              show={deleteshow}
              onHide={() => setDeleteshow(false)}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Delete Tenant</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Do You want To delete the tenant,Then whole database will be
                delete under tenant
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className="btn-danger"
                  data-testid="role-items"
                  onClick={() => deleteTenantFunction()}
                >
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
                        <Form.Label>Tenant Name :</Form.Label>
                        <Form.Control
                          data-testid="tenantName-input"
                          type="text"
                          placeholder="Enter Name"
                          name="tenantName"
                          onChange={handleInputChange}
                          value={tenant.tenantName}
                          disabled
                        />
                        {tenant.tenantName &&
                          !regexForName.test(tenant.tenantName) && (
                            <span className="text-danger">
                              Name Should Not Cantain Any Special Character or
                              Number
                            </span>
                          )}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>databaseName :</Form.Label>
                        <Form.Control
                          type="text"
                          data-testid="databaseName-input"
                          onChange={handleInputChange}
                          name="databaseName"
                          disabled
                          placeholder="Enter database name"
                          value={tenant.databaseName}
                        />
                        {tenant.databaseName &&
                          !regexForDatabaseName.test(tenant.databaseName) && (
                            <span className="text-danger">
                              databaseName Should Not Cantain Any Special
                              Character or Number
                            </span>
                          )}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Host :</Form.Label>
                        <Form.Control
                          type="text"
                          data-testid="host-input"
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
                          data-testid="port-input"
                          placeholder="port"
                          value={tenant.port}
                          name="port"
                          onChange={handleInputChange}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                          as="textarea"
                          type="textarea"
                          name="description"
                          data-testid="description-input"
                          rows={3}
                          className="form-control rounded-0"
                          placeholder="Here...."
                          value={tenant.description}
                          disabled={!edit}
                          onChange={handleInputChange}
                          isInvalid={
                            !regexForDescription.test(tenant.description)
                          }
                        />
                        {tenant.description &&
                          !regexForDescription.test(tenant.description) && (
                            <span className="text-danger">
                              description should be characters only no Special
                              Character or Number allowed.
                            </span>
                          )}
                      </Form.Group>
                    </Col>
                    {edit ? (
                      <>
                        <Button
                          data-testid="update-button"
                          onClick={(
                            event: React.MouseEvent<HTMLButtonElement>
                          ) => handleUpdateTenant(event)}
                          className="mt-3 info ml-4"
                        >
                          Update
                        </Button>
                        <Button
                          data-testid="update-button"
                          onClick={() => setEdit(false)}
                          className="mt-3 ml-4"
                          variant="danger"
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          data-testid="edit-button"
                          onClick={() => setEdit(true)}
                          className="mt-3 info ml-4"
                        >
                          Edit
                        </Button>
                        <Button
                          data-testid="cancel-button"
                          className="btn btn-light mt-3"
                          type="reset"
                          onClick={() => navigate("/tenant/admin/tenants")}
                        >
                          Back
                        </Button>
                      </>
                    )}
                  </Row>
                </Form>
              </Container>
            </div>
          </>
        )
      )}
    </>
  );
}
