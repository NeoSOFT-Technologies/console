import React, { useEffect, useState, ChangeEvent } from "react";
import { Form, Button, Alert, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastAlert } from "../../components/toaster-alert/ToastAlert";
import { useDispatch, useSelector } from "react-redux";
import PasswordButtons from "../../components/password-field/Password";
import { RootState } from "../../store";
import { IUserDataState } from "../../types";
import { logo } from "../../resources/images";
import { commonLogin } from "../../store/login/slice";
export default function Login() {
  const [type, setType] = useState<string>("admin");
  const [username, setUsername] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [tenantName, setTenantName] = useState<string>("");
  const [error, setError] = useState({
    username: "",
    password: "",
    tenantName: "",
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
      case "username":
        setUsername(value);
        setError({
          ...error,
          username: value.length > 4 ? "" : "Username is not valid",
        });
        break;
      case "password":
        setpassword(value);
        setError({
          ...error,
          password: value.length < 8 ? "password is not valid" : "",
        });
        break;
      case "tenantName":
        setTenantName(value);
        setError({
          ...error,
          tenantName: value.length < 4 ? "tenantName is not valid" : "",
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (username !== "" && password !== "") {
      // console.log(user);
      if (user.data && user.data.type === "tenant") {
        ToastAlert("Logged In", "success");
        navigate("/tenantdashboard");
      } else if (user.data && user.data.type === "admin") {
        ToastAlert("Logged In", "success");
        navigate("/admindashboard");
        // remove the line below before pushing.
        // navigate("/tenantpermission");
      } else {
        ToastAlert("Incorrect Credentials!", "warning");
      }
    }
  }, [user.data]);
  const validate = () => {
    let valid = false;
    switch (type) {
      case "admin":
        valid = !(username.length === 0 || password.length === 0);
        break;
      case "tenant":
        valid = !(tenantName.length === 0 || password.length === 0);
        break;
      case "user":
        valid = !(
          username.length === 0 ||
          password.length === 0 ||
          tenantName.length === 0
        );
        break;
    }
    return valid;
  };
  const handleSubmit = async () => {
    console.log("OK", username, password, tenantName, type);
    if (validate()) {
      dispatch(commonLogin({ username, password, tenantName }));
    } else {
      // failure("Please fill all the fields");
      ToastAlert("Please fill all the fields", "error");
    }
  };

  const setLoginType = (logintype: string) => {
    setType(logintype);
    setUsername("");
    setpassword("");
    setTenantName("");
    setError({
      username: "",
      password: "",
      tenantName: "",
    });
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
              <h4>Hello {type} ! let&apos;s get started</h4>
              <h6 className="font-weight-light">Sign in to continue.</h6>
              <Form className="pt-3">
                {(type === "admin" || type === "user") && (
                  <Form.Group className="mb-3">
                    <Form.Control
                      data-testid="email-input"
                      type="text"
                      name="username"
                      placeholder="Enter Username"
                      onChange={handle}
                      required
                    />
                    {error.username.length > 0 && (
                      <Alert variant="danger" className="mt-2">
                        {error.username}
                      </Alert>
                    )}
                  </Form.Group>
                )}
                {(type === "tenant" || type === "user") && (
                  <div>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        name="tenantName"
                        placeholder="Enter TenantName"
                        onChange={handle}
                        required
                      />
                      {error.tenantName.length > 0 && (
                        <Alert variant="danger" className="mt-2">
                          {error.tenantName}
                        </Alert>
                      )}
                    </Form.Group>
                  </div>
                )}
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
                    onClick={(event) => event.preventDefault()}
                    className="auth-link text-black"
                  >
                    Forgot password?
                  </a>
                </div>
                <div>
                  {type !== "admin" && (
                    <p>
                      <span onClick={() => setLoginType("admin")}>
                        Login as admin
                      </span>
                    </p>
                  )}
                  {type !== "tenant" && (
                    <p>
                      <span onClick={() => setLoginType("tenant")}>
                        Login as tenant
                      </span>
                    </p>
                  )}
                  {type !== "user" && (
                    <p>
                      <span onClick={() => setLoginType("user")}>
                        Login as user
                      </span>
                    </p>
                  )}
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
