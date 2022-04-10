import React, { useState, useEffect } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../../components/loader/Loader";
import { RootState } from "../../../../store";
import { getTenantRoles } from "../../../../store/features/admin/tenant-roles/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { ITenantRolesState } from "../../../../types";

export default function TenantRoles() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [tenantRoles, settenantRoles] = useState<string[]>([]);

  const rolesList: ITenantRolesState = useAppSelector(
    (state: RootState) => state.rolesList
  );

  useEffect(() => {
    dispatch(getTenantRoles());
  }, []);

  useEffect(() => {
    if (!rolesList.loading && rolesList.error)
      navigate("error", { state: rolesList.error });
  }, [rolesList.loading]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    switch (name) {
      case "role":
        if (checked) {
          settenantRoles([...tenantRoles, value]);
        } else {
          tenantRoles.splice(tenantRoles.indexOf(value), 1);
          settenantRoles([...tenantRoles]);
        }
        break;

      default:
        break;
    }
  };

  return (
    <>
      {rolesList.loading && <Spinner />}
      {!rolesList.loading && rolesList.data && (
        <Container>
          <Card>
            <Card.Header>
              <h5>Manage Roles</h5>
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
                      {/* {tenant.name && !regexForName.test(tenant.name) && (
                      <span className="text-danger">
                        Name Should Not Cantain Any Special Character or Number
                      </span>
                    )} */}
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
                      {/* {tenant.userid && !regexForUser.test(tenant.userid) && (
                      <span className="text-danger">
                        Id Should Contain alphabet, number.(i.e. : paras123,
                        p_A_r_A_s_1)
                      </span>
                    )} */}
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label>Roles:</Form.Label>
                      {/* <Row></Row> */}
                      <br />
                      {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
                      <Form.Check
                        className="mx-4"
                        key={`Demo_Role_${id}`}
                        id={`Demo_Role_${id}`}
                        label={`Demo_Role_${id}`}
                        name={`Demo_Role_${id}`}
                        // checked={tenantRole}
                        type="checkbox"
                        onChange={handleInputChange}
                        inline
                      />
                    ))} */}
                      {rolesList?.data?.map((role) => (
                        <Form.Check
                          className="mx-4"
                          key={`${role}`}
                          id={`${role}`}
                          label={role}
                          name="role"
                          value={`${role}`}
                          checked={tenantRoles.includes(role)}
                          type="checkbox"
                          onChange={handleInputChange}
                          inline
                        />
                      ))}
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      )}
    </>
  );
}
