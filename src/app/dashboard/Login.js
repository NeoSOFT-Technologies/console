import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { regexForEmail } from "../constants/constantVariables";
toast.configure();

export default function Login1() {
  let [email, setEmail] = useState("");
  let [password, setpassword] = useState("");
  let [error, setError] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  // const success = (data) =>
  //   toast.success(data, { position: toast.POSITION.BOTTOM_RIGHT });
  const failure = (data) =>
    toast.error(data, { position: toast.POSITION.BOTTOM_RIGHT });
  const warning = (data) =>
    toast.warn(data, { position: toast.POSITION.BOTTOM_RIGHT });

  const handle = (event) => {
    let { name, value } = event.target;
    switch (name) {
      case "email":
        setEmail(value);
        setError({
          ...error,
          email: regexForEmail.test(value) ? "" : "Email is not valid",
        });
        break;
      case "password":
        setpassword(value);
        setError({
          ...error,
          password: value.length < 8 ? "password is not valid" : "",
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    if (validate(error)) {
      const res = await axios.get(
        `http://localhost:3001/Registration?email=${email}&password=${password}`
      );
      console.log(res);
      let data = res.data[0];
      console.log(data);
      if (data.type == "tenant") {
        navigate("/dashboard");
      } else if (data.type == "admin") {
        navigate("/error-pages/error-404");
      } else {
        console.log(data);
        warning("Incorrect Credntials!");
      }
    } else {
      failure("Please fill all the fields");
    }
  };

  const validate = () => {
    let valid = false;

    valid = !(email.length < 1 || password.length < 1);

    return valid;
  };
  return (
    <Container>
      <h2 className="p-4 bg-primary">Login form</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label column sm="3">
            Email
          </Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handle}
            required
          />
          {error.email.length > 0 && (
            <Alert variant="danger" className="mt-2">
              {error.email}
            </Alert>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label column sm="3">
            password
          </Form.Label>

          <Form.Control
            type="number"
            name="password"
            placeholder="Enter password"
            onChange={handle}
          />
          {error.password.length > 0 && (
            <Alert variant="danger" className="mt-2">
              {error.password}
            </Alert>
          )}
        </Form.Group>
        <Button
          onClick={() => {
            handleSubmit();
          }}
          variant="primary"
          style={{ marginLeft: 150 }}
        >
          Login
        </Button>
      </Form>
    </Container>
  );
}
