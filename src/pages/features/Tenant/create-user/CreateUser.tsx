import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { ToastAlert } from "../../../../components/toast-alert/toast-alert";
import {
  regexForEmail,
  regexForName,
  regexForUser,
  regForPassword,
} from "../../../../resources/constants";
import { addNewUser } from "../../../../store/features/tenant/add-user/slice";
import { useAppDispatch } from "../../../../store/hooks";
interface Ierrors {
  username: string;
  email: string;
  password: string;
  tenantname: string;
}
export default function Createuser() {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    tenantname: "",
  });
  const [errors, setErrors] = useState<Ierrors>({
    username: "",
    email: "",
    password: "",
    tenantname: "",
  });
  const [checked, setChecked] = useState<string[]>([]);
  const checkList = ["A", "B", "C", "D"];

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setChecked([...checked, event.target.value]);
    } else {
      checked.splice(checked.indexOf(event.target.value), 1);
      setChecked(checked);
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "username":
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
      case "tenantname":
        setErrors({
          ...errors,
          [name]: regexForName.test(value) ? "" : "Enter a valid tenant name ",
        });
        break;
      default:
        break;
    }
    setFormData({ ...formData, [name]: value });
  };
  const handleValidate = () => {
    const validate = !!(
      errors.username === "" &&
      errors.email === "" &&
      errors.password === "" &&
      errors.tenantname === ""
    );
    return validate;
  };
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (handleValidate()) {
      if (
        formData.username !== "" &&
        formData.email !== "" &&
        formData.password !== "" &&
        formData.tenantname !== ""
      ) {
        const newUser = {
          ...formData,
          checked,
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
              value={formData.username}
              name="username"
              onChange={handleInputChange}
              isInvalid={!!errors.username}
              isValid={!!(!errors.username && formData.username)}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
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
          <Form.Group>
            <Form.Label>Tenant Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="tenantname"
              data-testid="tenantname-input"
              value={formData.tenantname}
              name="tenantname"
              onChange={handleInputChange}
              isInvalid={!!errors.tenantname}
              isValid={!!(!errors.tenantname && formData.tenantname)}
            />
            <Form.Control.Feedback type="invalid">
              {errors.tenantname}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="title">Tenant Roles:</div>
          <div className="list-container  ">
            {checkList.map((item, index) => (
              <span key={index} className="m-4">
                <input value={item} type="checkbox" onChange={handleCheck} />
                <span>{item}</span>
              </span>
            ))}
          </div>
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
