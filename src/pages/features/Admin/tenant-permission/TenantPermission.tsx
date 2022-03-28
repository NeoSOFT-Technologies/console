import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { getTenantPermissions } from "../../../../store/features/admin/tenant-permissions/slice";
import { useAppDispatch } from "../../../../store/hooks";
import { ITenantPermissionsState } from "../../../../types";

export default function TenantPermission() {
  const [tenantPermissionList, setTenantPermissionList] =
    useState<ITenantPermissionsState>();
  const [tenantPermission, settenantPermission] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const permissionList: ITenantPermissionsState = useSelector(
    (state: RootState) => state.tenantPermissionsList
  );
  //   get the permissions that were allowed before and all the permissions that are for tenants from API.
  useEffect(() => {
    //   list of permissions that were allowed before to the selected tenant.
    settenantPermission(["Default Permission"]);
    // list of permissions that are available for tenants.
    setTenantPermissionList(permissionList);
    dispatch(getTenantPermissions("Paras"));
    console.log(permissionList);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    switch (name) {
      case "permission":
        if (checked) {
          settenantPermission([...tenantPermission, value]);
        } else {
          tenantPermission.splice(tenantPermission.indexOf(value), 1);
          settenantPermission([...tenantPermission]);
        }
        break;

      default:
        break;
    }
  };
  return (
    <>
      <Container>
        <Card>
          <Card.Header>
            <h5>Manage Permissions</h5>
          </Card.Header>
          <Card.Body>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name :</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      name="name"
                      //   onChange={handleInputChange}
                      //   value={tenant.name}
                      disabled
                      //   isInvalid={!!err.name}
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Permissions :</Form.Label>
                    <br />
                    {tenantPermissionList?.data?.map((permission) => (
                      <Form.Check
                        className="mx-4"
                        key={`${permission.name}`}
                        // id={`${permission.id}`}
                        label={permission.name}
                        name="permission"
                        value={`${permission.name}`}
                        defaultChecked={tenantPermission.includes(
                          permission.name
                        )}
                        type="checkbox"
                        onChange={handleInputChange}
                        inline
                      />
                    ))}
                  </Form.Group>
                </Col>
              </Row>
              <Button type="submit">Update</Button>
              <Button variant="danger">Cancel</Button>
            </Form>
            {/* test of data */}
            {/* <ul>
              {tenantPermission.map((ele, index) => (
                <li key={index}>{ele}</li>
              ))}
            </ul> */}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
