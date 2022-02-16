import React, { useState } from "react";
import { Form, Button, Alert, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { registerationGet } from "../../config/Myservices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { regexForEmail } from "../constants/constantVariables";
import { host } from "../../config/URL";
import PasswordButtons from "../shared/Password";

toast.configure();

export default function Login() {
  let [email, setEmail] = useState("");
  let [password, setpassword] = useState("");
  let [error, setError] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowpassword] = useState(false);
  const success = (data) =>
    toast.success(data, { position: toast.POSITION.BOTTOM_RIGHT });
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
      const res = await registerationGet(
        `?email=${email}&password=${password}`
      );
      console.log(res);
      let data = res.data[0];
      console.log(data);
      if (data.type == "tenant") {
        success("Logged In");
        localStorage.removeItem("user", email);
        sessionStorage.setItem("user", email);
        navigate("/dashboard");
      } else if (data.type == "admin") {
        success("Logged In");
        localStorage.setItem("user", email);
        navigate("/dashboard");
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
    <div>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-6 mx-auto">
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
                <img src={`${host}/images/logo.svg`} alt="logo" />
              </div>
              <h4>Hello! let&apos;s get started</h4>
              <h6 className="font-weight-light">Sign in to continue.</h6>
              <Form className="pt-3">
                <Form.Group className="mb-3">
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
                <div>
                  <Form.Group className="mb-3">
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter password"
                        onChange={handle}
                      />
                      <PasswordButtons
                        viewPassword={showPassword}
                        setViewPassword={setShowpassword}
                      />
                    </InputGroup>
                    {error.password.length > 0 && (
                      <Alert variant="danger" className="mt-2">
                        {error.password}
                      </Alert>
                    )}
                  </Form.Group>
                </div>
                <div className="mt-3">
                  <Button
                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    SIGN IN
                  </Button>
                </div>
                <div className="my-2 d-flex justify-content-between align-items-center">
                  <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input type="checkbox" className="form-check-input" />
                      <i className="input-helper"></i>
                      Keep me signed in
                    </label>
                  </div>
                  <a
                    href="!#"
                    onClick={(event) => event.preventDefault()}
                    className="auth-link text-black"
                  >
                    Forgot password?
                  </a>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
