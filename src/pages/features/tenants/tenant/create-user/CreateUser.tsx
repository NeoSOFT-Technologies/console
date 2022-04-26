import React, { useState, useEffect } from "react";
import { Container, Form, Button, InputGroup } from "react-bootstrap";
import "./createuser.scss";
import Spinner from "../../../../../components/loader/Loader";
import MultiSelectDropdown from "../../../../../components/mutli-select-dropdown/MultiSelectDropdown";
import PasswordButtons from "../../../../../components/password-field/Password";
import { ToastAlert } from "../../../../../components/toast-alert/toast-alert";
import {
  regexForEmail,
  regexForUser,
  regForPassword,
} from "../../../../../resources/tenant/constants";
import { RootState } from "../../../../../store";
import { getTenantRoles } from "../../../../../store/features/admin/tenant-roles/slice";
import {
  addNewUser,
  IAddUserState,
} from "../../../../../store/features/tenant/add-user/slice";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { ICreateNewUser, ITenantRolesState } from "../../../../../types/index";
const tempPermissions = ["view", "edit", "write", "delete"];
interface Ierrors {
  userName: string;
  email: string;
  password: string;
  roles: string;
  permissions: string;
}

export default function Createuser() {
  const dispatch = useAppDispatch();
  const [showPassword, setShowpassword] = useState(false);
  const rolesList: ITenantRolesState = useAppSelector(
    (state: RootState) => state.rolesList
  );
  const addNewUserState: IAddUserState = useAppSelector(
    (state: RootState) => state.addNewUserState
  );
  const [formData, setFormData] = useState<ICreateNewUser>({
    userName: "",
    email: "",
    password: "",
    roles: [],
    permissions: [],
  });

  const [errors, setErrors] = useState<Ierrors>({
    userName: "",
    email: "",
    password: "",
    roles: "",
    permissions: "",
  });

  useEffect(() => {
    dispatch(getTenantRoles());
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "userName":
        setErrors({
          ...errors,
          [name]: regexForUser.test(value) ? "" : "Enter a valid Username ",
        });
        break;

      case "email":
        setErrors({
          ...errors,
          [name]: regexForEmail.test(value) ? "" : "Enter a Valid Email",
        });
        break;
      case "password":
        setErrors({
          ...errors,
          [name]: regForPassword.test(value)
            ? ""
            : "Enter a Valid Password (must include 8 character)",
        });
        break;
      default:
        break;
    }
    setFormData({ ...formData, [name]: value });
  };
  const handleValidate = () => {
    const validate = !!(
      errors.userName === "" &&
      errors.email === "" &&
      errors.password === "" &&
      errors.roles === "" &&
      errors.permissions === ""
    );
    return validate;
  };
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (handleValidate()) {
      if (
        formData.userName !== "" &&
        formData.email !== "" &&
        formData.password !== "" &&
        formData.roles.length > 0 &&
        formData.permissions.length > 0
      ) {
        const newUser = {
          ...formData,
        };
        dispatch(addNewUser(newUser));
      } else {
        ToastAlert("Please Fill All Fields", "warning");
      }
    } else {
      ToastAlert("Please Enter Valid Details", "warning");
    }
  };

  const handleCheckRoles = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setFormData({
        ...formData,
        roles: [...formData.roles, event.target.value],
      });
    } else {
      formData.roles.splice(formData.roles.indexOf(event.target.value), 1);
      setFormData({ ...formData, roles: [...formData.roles] });
    }
  };
  const handleCheckPermissions = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      setFormData({
        ...formData,
        permissions: [...formData.permissions, event.target.value],
      });
    } else {
      formData.permissions.splice(
        formData.permissions.indexOf(event.target.value),
        1
      );
      setFormData({ ...formData, permissions: [...formData.permissions] });
    }
  };
  const removeRole = (role: string) => {
    const temp = formData.roles.filter(function (value) {
      return value !== role;
    });
    setFormData({ ...formData, roles: [...temp] });
  };
  const removePermissions = (permissions: string) => {
    const temp = formData.permissions.filter(function (value) {
      return value !== permissions;
    });
    setFormData({ ...formData, permissions: [...temp] });
  };

  const clearState = () => {
    setFormData({
      userName: "",
      email: "",
      password: "",
      roles: [],
      permissions: [],
    });
    setErrors({
      userName: "",
      email: "",
      password: "",
      roles: "",
      permissions: "",
    });
  };
  useEffect(() => {
    if (
      !addNewUserState.loading &&
      formData.userName !== "" &&
      formData.email !== "" &&
      formData.password !== "" &&
      formData.roles.length > 0
    ) {
      if (addNewUserState.isAdded) {
        ToastAlert("User Registered", "success");
        clearState();
      } else if (addNewUserState.error) {
        ToastAlert("Unable to Register User", "error");
      }
    }
  }, [addNewUserState]);

  return (
    <div>
      {rolesList.loading || addNewUserState.loading ? (
        <Spinner />
      ) : (
        rolesList.data && (
          <Container className="mt-3 w-75 bg-white p-4">
            <h1 className="text-center text-dark pb-3">Create User</h1>
            <Form onSubmit={handleFormSubmit} data-testid="onsubmit">
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  data-testid="username-input"
                  placeholder="username"
                  value={formData.userName}
                  name="userName"
                  onChange={handleInputChange}
                  isInvalid={!!errors.userName}
                  isValid={!!(!errors.userName && formData.userName)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.userName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="email"
                  data-testid="email-input"
                  value={formData.email}
                  name="email"
                  onChange={handleInputChange}
                  isInvalid={!!errors.email}
                  isValid={!!(!errors.email && formData.email)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    data-testid="password-input"
                    value={formData.password}
                    name="password"
                    onChange={handleInputChange}
                  />
                  <PasswordButtons
                    viewPassword={showPassword}
                    setViewPassword={setShowpassword}
                  />
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="title">Roles : </div>

              <MultiSelectDropdown
                data-testid="multidrop"
                list={rolesList?.data}
                formData={formData.roles}
                title="roles"
                handleCheck={handleCheckRoles}
                removeRole={removeRole}
              />
              <div className="title">Permissions : </div>
              <MultiSelectDropdown
                list={tempPermissions}
                formData={formData.permissions}
                title="permissions"
                handleCheck={handleCheckPermissions}
                removeRole={removePermissions}
              />
              <div className="my-2">
                <Button
                  type="submit"
                  variant="success"
                  data-testid="submit-button"
                >
                  Submit
                </Button>
                <Button
                  type="reset"
                  variant="danger"
                  onClick={() => clearState()}
                  data-testid="cancel-button"
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Container>
        )
      )}
    </div>
  );
}
