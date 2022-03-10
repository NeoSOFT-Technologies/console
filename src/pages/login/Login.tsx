import React, { useEffect, useState, ChangeEvent } from "react";
import { Form, Button, Alert, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { regexForEmail } from "../../resources/constants";
import { useDispatch, useSelector } from "react-redux";
import PasswordButtons from "../../components/password-field/Password";
import { RootState } from "../../store";
import { IUserDataState } from "../../types";
import { userData } from "../../store/user-data/slice";

toast.configure();

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
  const success = (data: string) =>
    toast.success(data, { position: toast.POSITION.BOTTOM_RIGHT });
  const failure = (data: string) =>
    toast.error(data, { position: toast.POSITION.BOTTOM_RIGHT });
  const warning = (data: string) =>
    toast.warn(data, { position: toast.POSITION.BOTTOM_RIGHT });

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
      console.log(user);
      if (user.data) {
        success("Logged In");
        navigate("/dashboard");
      } else {
        console.log(user);
        warning("Incorrect Credentials!");
      }
    }
  }, [user.data]);
  const validate = () => {
    let valid = false;

    valid = !(email.length < 1 || password.length < 1);

    return valid;
  };
  const handleSubmit = async () => {
    if (validate()) {
      dispatch(userData({ email, password }));
    } else {
      failure("Please fill all the fields");
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-6 col-md-8 col-sm-10 mx-auto">
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
                <img
                  src={`${process.env.REACT_APP_HOST}/global/images/logo.svg`}
                  alt="logo"
                />
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
