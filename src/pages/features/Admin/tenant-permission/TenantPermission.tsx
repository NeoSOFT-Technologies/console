import React, { useEffect, useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";

export default function TenantPermission() {
  const [tenantPermissionList, setTenantPermissionList] = useState<string[]>(
    []
  );
  const [tenantPermission, settenantPermission] = useState<string[]>([]);

  //   get the permissions that were allowed before and all the permissions that are for tenants from API.
  useEffect(() => {
    //   list of permissions that were allowed before to the selected tenant.
    settenantPermission(["demo_P1", "demo_P2"]);
    // list of permissions that are available for tenants.
    setTenantPermissionList([
      "demo_P1",
      "demo_P2",
      "demo_P3",
      "demo_P4",
      "demo_P5",
      "demo_P6",
      "demo_P7",
      "demo_P8",
    ]);
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
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>UserId :</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter User ID"
                      name="userid"
                      disabled
                      //   value={tenant.userid}
                      //   isInvalid={!!err.userid}
                      //   onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Permissions :</Form.Label>
                    <br />
                    {tenantPermissionList.map((permission) => (
                      <Form.Check
                        className="mx-4"
                        key={`${permission}`}
                        id={`${permission}`}
                        label={permission}
                        name="permission"
                        value={permission}
                        defaultChecked={tenantPermission.includes(permission)}
                        type="checkbox"
                        onChange={handleInputChange}
                        inline
                      />
                    ))}
                  </Form.Group>
                </Col>
              </Row>
            </Form>
            {/* test of data */}
            <ul>
              {tenantPermission.map((ele, index) => (
                <li key={index}>{ele}</li>
              ))}
            </ul>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
