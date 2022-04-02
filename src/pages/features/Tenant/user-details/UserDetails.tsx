import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Dropdown,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useParams } from "react-router";
import Spinner from "../../../../components/loader/Loader";
import { ToastAlert } from "../../../../components/toast-alert/toast-alert";
import { regexForUser, regexForEmail } from "../../../../resources/constants";
import { RootState } from "../../../../store";
import { getTenantRoles } from "../../../../store/features/admin/tenant-roles/slice";
import { deleteUser } from "../../../../store/features/tenant/delete-user/slice";
import { updateUser } from "../../../../store/features/user/update-user/slice";
import {
  getUserDetails,
  IUserDetailsData,
  IUserDetailsState,
} from "../../../../store/features/user/user-details/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { ITenantRolesState } from "../../../../types/index";

interface Ierror {
  username: string;
  email: string;
  tenantName: string;
  createdTimestamp?: string;
}
export default function UserDetails() {
  const params = useParams();
  // @ts-ignore
  const dispatch = useAppDispatch();
  const userDetails: IUserDetailsState = useAppSelector(
    (state: RootState) => state.userDetails
  );
  const rolesList: ITenantRolesState = useAppSelector(
    (state: RootState) => state.rolesList
  );
  const [userdata, setUserdata] = useState<IUserDetailsData>({
    id: "",
    createdTimestamp: "",
    username: "",
    enabled: false,
    emailVerified: false,
    email: "",
    access: {
      manageGroupMembership: false,
      view: false,
      mapRoles: false,
      impersonate: false,
      manage: false,
    },
    tenantName: "",
    roles: [],
    permissions: [],
  });
  console.log(userdata.roles);
  const [errordata, setErrordata] = useState<Ierror>({
    username: "",
    email: "",
    tenantName: "",
  });
  const [editUser, setEditUser] = useState(false);

  useEffect(() => {
    if (params.userName) {
      dispatch(
        getUserDetails({ tenantName: "Arpan", userName: params.userName })
      );
      dispatch(getTenantRoles());
    }
    setUserdata({ ...userDetails.data });
  }, []);

  const removeRole = (role: string) => {
    const temp = userdata.roles.filter(function (value: string) {
      return value !== role;
    });
    console.log(temp);
    setUserdata({ ...userdata, roles: [...temp] });
  };

  const handleRemove = async () => {
    await dispatch(deleteUser(userdata.username));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "username":
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
    const validate = !!(errors.username === "" && errors.email === "");
    return validate;
  };
  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setUserdata({
        ...userdata,
        roles: [...userdata.roles, value],
      });
    } else {
      userdata.roles.splice(userdata.roles.indexOf(value), 1);
      setUserdata({ ...userdata, roles: [...userdata.roles] });
    }
  };
  const handleEditSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (handleValidate(errordata)) {
      if (userdata.username !== "" && userdata.email !== "") {
        dispatch(
          updateUser({
            username: userdata.username,
            email: userdata.email,
            roles: userdata.roles,
          })
        );
        ToastAlert("User Saved", "success");
        setEditUser(false);
      } else {
        ToastAlert("Please Fill All Fields", "warning");
      }
    } else {
      ToastAlert("Please Enter Valid Details", "warning");
    }
  };

  return userDetails.loading ? (
    <Spinner />
  ) : (
    <Container>
      <Row className="text-right">
        <Col>
          <Card>
            <Card.Header className="">
              <Button variant="dark" onClick={() => setEditUser(true)}>
                Edit
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
                    name="username"
                    placeholder="Enter user name"
                    value={userdata.username}
                    onChange={handleInputChange}
                    className="p-1"
                    disabled
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
                    className="p-1"
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
                    className="p-1"
                    disabled
                  />
                </Form.Group>
                <div className="list-container  ">
                  <h5>Roles :</h5>
                  <Row>
                    <Col xs={12} sm={6} md={4} lg={4}>
                      {" "}
                      <Dropdown autoClose="outside" className="w-100">
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Select Roles for the user
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {rolesList?.data?.map((role, index) => (
                            <Dropdown.Item
                              key={index}
                              as={Form.Label}
                              htmlFor={role}
                            >
                              <Form.Check
                                className="mx-4"
                                key={`${role}`}
                                id={`${role}`}
                                label={role}
                                name="role"
                                value={`${role}`}
                                checked={userdata.roles.includes(role)}
                                type="checkbox"
                                onChange={handleCheck}
                                inline
                                // name="role"
                                // type="checkbox"
                                // label={items}
                                // id={items}
                                // value={items}
                                // checked={userdata.roles.includes(items)}
                                // onChange={handleCheck}
                                // defaultChecked={}
                              />
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                    <Col xs={12} sm={6} md={8} lg={8}>
                      {userdata.roles.length > 0 &&
                        userdata.roles.map((val, i) => (
                          <span className="roles" key={i}>
                            {val}{" "}
                            <i
                              className="bi bi-x-circle"
                              onClick={() => removeRole(val)}
                            ></i>
                          </span>
                        ))}
                    </Col>
                  </Row>
                </div>
                {editUser && (
                  <div className="py-2">
                    <Button variant="success" onClick={handleEditSave}>
                      Save
                    </Button>
                    <Button variant="danger" onClick={() => setEditUser(false)}>
                      Cancel
                    </Button>
                  </div>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
