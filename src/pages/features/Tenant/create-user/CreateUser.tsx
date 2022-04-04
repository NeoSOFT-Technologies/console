import React, { useState, useEffect } from "react";
import { Container, Form, Button, Dropdown, Row, Col } from "react-bootstrap";
import "./createuser.scss";
import { ToastAlert } from "../../../../components/toast-alert/toast-alert";
import {
  regexForEmail,
  regexForUser,
  regForPassword,
} from "../../../../resources/constants";
import { RootState } from "../../../../store";
import { getTenantRoles } from "../../../../store/features/admin/tenant-roles/slice";
import { addNewUser } from "../../../../store/features/tenant/add-user/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { ICreateNewUser, ITenantRolesState } from "../../../../types/index";

interface Ierrors {
  userName: string;
  email: string;
  password: string;
  roles: string;
}

export default function Createuser() {
  const dispatch = useAppDispatch();
  const rolesList: ITenantRolesState = useAppSelector(
    (state: RootState) => state.rolesList
  );
  console.log(rolesList);
  const [formData, setFormData] = useState<ICreateNewUser>({
    userName: "",
    email: "",
    password: "",
    roles: [],
  });

  const [errors, setErrors] = useState<Ierrors>({
    userName: "",
    email: "",
    password: "",
    roles: "",
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
      errors.roles === ""
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
        formData.roles.length > 0
      ) {
        const newUser = {
          ...formData,
        };
        console.log(newUser);
        dispatch(addNewUser(newUser));
        ToastAlert("User Registered", "success");
        // navigate("/login");
      } else {
        ToastAlert("Please Fill All Fields", "warning");
      }
    } else {
      ToastAlert("Please Enter Valid Details", "warning");
    }
  };

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const removeRole = (role: string) => {
    const temp = formData.roles.filter(function (value) {
      return value !== role;
    });
    console.log(temp);
    setFormData({ ...formData, roles: [...temp] });
  };

  return (
    <div>
      <Container className="mt-3 w-75 bg-white p-4">
        <h1 className="text-center text-dark pb-3">Create User</h1>
        <Form onSubmit={handleFormSubmit}>
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
            <Form.Control
              type="text"
              placeholder="password"
              data-testid="password-input"
              value={formData.password}
              name="password"
              onChange={handleInputChange}
              isInvalid={!!errors.password}
              isValid={!!(!errors.password && formData.password)}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="title">Roles:</div>
          <Row>
            <Col xs={12} sm={6} md={4} lg={4}>
              {" "}
              <Dropdown autoClose="outside" className="w-100">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Select Roles for the user
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {rolesList?.data?.map((items, index) => (
                    <Dropdown.Item key={index} as={Form.Label} htmlFor={items}>
                      <Form.Check
                        type="checkbox"
                        label={items}
                        id={items}
                        value={items}
                        checked={formData.roles.includes(items)}
                        onChange={handleCheck}
                      />
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
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
                  data-testid="cancel-button"
                >
                  Cancel
                </Button>
              </div>
            </Col>
            <Col xs={12} sm={6} md={8} lg={8}>
              {formData.roles.length > 0 &&
                formData.roles.map((val, i) => (
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
        </Form>
      </Container>
    </div>
  );
}
