import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useLocation } from "react-router";
import { ToastAlert } from "../../../../components/ToasterAlert/ToastAlert";
import { regexForUser, regexForEmail } from "../../../../resources/constants";
import { ITenantUserData } from "../../../../types";
interface LocationState {
  user: ITenantUserData;
}
interface Ierror {
  userName: string;
  email: string;
  tenantName: string;
}
export default function UserDetails() {
  const location = useLocation();
  const user = location.state as LocationState;
  console.log(user);
  // @ts-ignore
  const [userdata, setUserdata] = useState<ITenantUserData>(user);
  const [errordata, setErrordata] = useState<Ierror>({
    userName: "",
    email: "",
    tenantName: "",
  });
  const [editUser, setEditUser] = useState(false);

  const handleRemove = () => {};
  const handleSetStatus = () => {};
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "userName":
        setErrordata({
          ...errordata,
          [name]: regexForUser.test(value) ? "" : "Enter a valid Username ",
        });
        break;
      case "email":
        setErrordata({
          ...errordata,
          [name]: regexForEmail.test(value) ? "" : "Enter a Valid Email",
        });
        break;
      case "tenantName":
        setErrordata({
          ...errordata,
          [name]: regexForUser.test(value) ? "" : "Enter a Valid Tenant name",
        });
        break;
      default:
        break;
    }
    setUserdata({ ...userdata, [name]: value });
  };
  const handleValidate = (errors: Ierror) => {
    const validate = !!(
      errors.userName === "" &&
      errors.email === "" &&
      errors.tenantName === ""
    );
    return validate;
  };
  const handleEditSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (handleValidate(errordata)) {
      if (
        userdata.userName !== "" &&
        userdata.email !== "" &&
        userdata.tenantName !== ""
      ) {
        ToastAlert("User Saved", "success");
        setEditUser(false);
      } else {
        ToastAlert("Please Fill All Fields", "warning");
      }
    } else {
      ToastAlert("Please Enter Valid Details", "warning");
    }
  };
  return (
    <Container>
      <Row className="text-right">
        <Col>
          <Card>
            <Card.Header className="">
              <Button variant="dark" onClick={() => setEditUser(true)}>
                Edit
              </Button>
              <Button variant="dark" onClick={handleSetStatus}>
                Set Inactive
              </Button>
              <Button variant="danger" onClick={handleRemove}>
                Remove
              </Button>
            </Card.Header>
            {/* <Card.Body>This is some text within a card body.</Card.Body> */}
          </Card>
        </Col>
      </Row>
      <Row className="">
        <Col>
          <Card>
            <Card.Header className="text-center">User Details</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group>
                  <Form.Label>User Name :</Form.Label>
                  <Form.Control
                    type="text"
                    name="userName"
                    placeholder="Enter user name"
                    value={userdata.userName}
                    onChange={handleInputChange}
                    disabled={!editUser}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email :</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    placeholder="Enter email"
                    value={userdata.email}
                    onChange={handleInputChange}
                    disabled={!editUser}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Tenant Name :</Form.Label>
                  <Form.Control
                    type="text"
                    name="tenantName"
                    placeholder="Enter tenant Name"
                    value={userdata.tenantName}
                    onChange={handleInputChange}
                    disabled={!editUser}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Status :</Form.Label>
                  <Form.Control
                    type="text"
                    name="isDeleted"
                    value={userdata.isDeleted ? "deleted" : "active"}
                    onChange={handleInputChange}
                    disabled
                  />
                </Form.Group>
                {editUser && (
                  <>
                    <Button variant="success" onClick={handleEditSave}>
                      Save
                    </Button>
                    <Button variant="danger" onClick={() => setEditUser(false)}>
                      Cancel
                    </Button>
                  </>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
