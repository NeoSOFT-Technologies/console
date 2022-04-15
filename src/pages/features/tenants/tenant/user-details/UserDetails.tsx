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
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../../../../../components/loader/Loader";
import { ToastAlert } from "../../../../../components/toast-alert/toast-alert";
import { regexForUser, regexForEmail } from "../../../../../resources/constants";
import { RootState } from "../../../../../store";
import { getTenantRoles } from "../../../../../store/features/admin/tenant-roles/slice";
import {
  deleteUser,
  IDeleteUserState,
} from "../../../../../store/features/tenant/delete-user/slice";
import {
  updateUser,
  IUpdateUserState,
} from "../../../../../store/features/user/update-user/slice";
import {
  getUserDetails,
  IUserDetailsState,
  resetgetUserDetails,
} from "../../../../../store/features/user/user-details/slice";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import {
  IUserDetailsData,
  ITenantRolesState,
  IUserDataState,
} from "../../../../../types/index";

interface Ierror {
  username: string;
  email: string;
  tenantName: string;
  createdTimestamp?: string;
}

export default function UserDetails() {
  const params = useParams();
  const navigate = useNavigate();
  // @ts-ignore
  const dispatch = useAppDispatch();
  const user: IUserDataState = useAppSelector(
    (state: RootState) => state.userData
  );
  const userDetails: IUserDetailsState = useAppSelector(
    (state: RootState) => state.userDetails
  );
  const rolesList: ITenantRolesState = useAppSelector(
    (state: RootState) => state.rolesList
  );
  const deleteUserState: IDeleteUserState = useAppSelector(
    (state: RootState) => state.deleteUserState
  );
  const updateUserDataState: IUpdateUserState = useAppSelector(
    (state: RootState) => state.updateUserDataState
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

  const [errordata, setErrordata] = useState<Ierror>({
    username: "",
    email: "",
    tenantName: "",
  });
  const [editUser, setEditUser] = useState(false);

  useEffect(() => {
    if (params.userName && user.data?.tenantName) {
      dispatch(
        getUserDetails({
          tenantName: user.data.tenantName,
          userName: params.userName,
        })
      );
      dispatch(getTenantRoles());
    }
    return () => {
      dispatch(resetgetUserDetails());
    };
  }, []);
  useEffect(() => {
    if (!deleteUserState.loading && deleteUserState.error) {
      navigate("/error", { state: deleteUserState.error });
    }
    if (!updateUserDataState.loading && updateUserDataState.error) {
      navigate("/error", { state: updateUserDataState.error });
    }
    if (
      !deleteUserState.loading &&
      !deleteUserState.error &&
      deleteUserState?.isDeleted
    ) {
      navigate("/tenantlist");
    }
  }, [deleteUserState.loading, updateUserDataState.loading]);

  useEffect(() => {
    if (user.error) {
      navigate("/error", { state: rolesList.error });
    }
    if (userDetails.data) {
      setUserdata({ ...userDetails.data });
    } else if (userDetails.error) {
      navigate("/error", { state: userDetails.error });
    }
    if (rolesList.error) {
      navigate("/error", { state: rolesList.error });
    }
  }, [userDetails.loading, rolesList.loading, user.loading]);

  const removeRole = (role: string) => {
    const temp = userdata.roles.filter(function (value: string) {
      return value !== role;
    });
    setUserdata({ ...userdata, roles: [...temp] });
  };

  const handleRemove = async () => {
    await dispatch(deleteUser(userdata.username));
    navigate("/userlist");
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

  return (
    <>
      {user.loading ||
      userDetails.loading ||
      rolesList.loading ||
      deleteUserState.loading ||
      updateUserDataState.loading ? (
        <Spinner />
      ) : (
        user.data &&
        userDetails.data &&
        rolesList.data && (
          <Container>
            <Row className="text-right">
              <Col>
                <Card>
                  <Card.Header className="">
                    <Button
                      variant="dark"
                      onClick={() => setEditUser(true)}
                      data-testid="edit"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={handleRemove}
                      data-testid="remove"
                    >
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
                  <Card.Header className="text-center">
                    User Details
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      <Form.Group>
                        <Form.Label>User Name :</Form.Label>
                        <Form.Control
                          data-testid="userName-input"
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
                          data-testid="email-input"
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
                          data-testid="tenantName-input"
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
                              <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                                data-testid="dropdown-toggler"
                              >
                                Select Roles for the user
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                {rolesList?.data?.map((role, index) => (
                                  <Dropdown.Item
                                    key={index}
                                    as={Form.Label}
                                    htmlFor={role}
                                    data-testid="role-item"
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
                                    data-testid="remove-role-btn"
                                  ></i>
                                </span>
                              ))}
                          </Col>
                        </Row>
                      </div>
                      {editUser && (
                        <div className="py-2">
                          <Button
                            variant="success"
                            onClick={handleEditSave}
                            data-testid="save"
                          >
                            Save
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => setEditUser(false)}
                            data-testid="cancel"
                          >
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
        )
      )}
    </>
  );
}
