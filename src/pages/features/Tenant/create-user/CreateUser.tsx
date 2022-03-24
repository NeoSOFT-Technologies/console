import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { ToastAlert } from "../../../../components/toast-alert/toast-alert";
import {
  regexForEmail,
  regexForUser,
  regForPassword,
} from "../../../../resources/constants";
import { addNewUser } from "../../../../store/features/tenant/add-user/slice";
import { useAppDispatch } from "../../../../store/hooks";
interface Ierrors {
  userName: string;
  email: string;
  password: string;
  roles: string;
}
export default function Createuser() {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    roles: ["user"],
  });
  const [errors, setErrors] = useState<Ierrors>({
    userName: "",
    email: "",
    password: "",
    roles: "",
  });
  // const [checked, setChecked] = useState<string[]>([]);
  // const checkList = ["A", "B", "C", "D"];

  // const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.checked) {
  //     setChecked([...checked, event.target.value]);
  //   } else {
  //     checked.splice(checked.indexOf(event.target.value), 1);
  //     setChecked(checked);
  //   }
  // };
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
          // checked,
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
  return (
    <div>
      <Container className="mt-3 w-75 bg-white p-4">
        <h1 className="text-center text-dark pb-3">Create User</h1>
        {/* UserName Email Password Tenant Name */}
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
              type="text"
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
          <div className="my-2">
            <Button type="submit" variant="success" data-testid="submit-button">
              Submit
            </Button>
            <Button type="reset" variant="danger" data-testid="cancel-button">
              Cancel
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}
