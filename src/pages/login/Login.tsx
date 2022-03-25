import React, { useEffect, useState, ChangeEvent } from "react";
import { Form, Button, Alert, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PasswordButtons from "../../components/password-field/Password";
import { ToastAlert } from "../../components/toast-alert/toast-alert";
import { regexForEmail } from "../../resources/constants";
import { logo } from "../../resources/images";
import { RootState } from "../../store";
import { commonLogin } from "../../store/login/slice";
import { IUserDataState } from "../../types";
export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowpassword] = useState(false);
  const user: IUserDataState = useSelector(
    (state: RootState) => state.userData
  );
  const handle = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
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

  useEffect(() => {
    if (email !== "" && password !== "") {
      // console.log(user);
      if (user.data && user.data.type === "tenant") {
        ToastAlert("Logged In", "success");
        navigate("/tenantdashboard");
      } else if (user.data && user.data.type === "admin") {
        ToastAlert("Logged In", "success");
        navigate("/admindashboard");
      } else if (user.data && user.data.type === "user") {
        ToastAlert("Logged In", "success");
        navigate("/userdashboard");
      } else {
        ToastAlert("Incorrect Credentials!", "warning");
        throw new Error("Incorrect Credentials ");
      }
    }
  }, [user.data]);
  const validate = () => {
    let valid = false;

    valid = !(email.length === 0 || password.length === 0);

    return valid;
  };
  const handleSubmit = async () => {
    if (validate()) {
      dispatch(commonLogin({ email, password }));
    } else {
      ToastAlert("Please fill all the fields", "error");
      throw new Error("Please fill all the fields ");
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-6 col-md-8 col-sm-10 mx-auto">
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
                <img src={logo} alt="logo" />
              </div>
              <h4>Hello! let&apos;s get started</h4>
              <h6 className="font-weight-light">Sign in to continue.</h6>
              <Form className="pt-3">
                <Form.Group className="mb-3">
                  <Form.Control
                    data-testid="email-input"
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
                        data-testid="password-input"
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
                    data-testid="submit-button"
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
                    data-testid="link"
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
