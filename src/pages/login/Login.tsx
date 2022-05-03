import React, { useEffect, useState, ChangeEvent } from "react";
import { Form, Button, Alert, InputGroup } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "../../components/loader/Loader";
import PasswordButtons from "../../components/password-field/Password";
import { ToastAlert } from "../../components/toast-alert/toast-alert";
import { logo } from "../../resources/tenant/images";
import { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { checkLoginType, ILoginTypeState } from "../../store/login-type/slice";
import { commonLogin, ITokenState } from "../../store/login/slice";
import { getUserData } from "../../store/user-data/slice";
import { IUserDataState, ILogin } from "../../types";

export default function Login() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginType: ILoginTypeState = useAppSelector(
    (state: RootState) => state.loginType
  );
  const user: IUserDataState = useAppSelector(
    (state: RootState) => state.userData
  );
  const loginVerification: ITokenState = useAppSelector(
    (state: RootState) => state.loginAccessToken
  );
  const [formdata, setFormData] = useState<ILogin>({
    userName: "",
    password: "",
    tenantName: "",
  });

  const [error, setError] = useState<ILogin>({
    userName: "",
    password: "",
    tenantName: "",
  });

  const [showPassword, setShowpassword] = useState(false);

  const handle = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "userName":
        setFormData({ ...formdata, userName: value });
        setError({
          ...error,
          userName: value.length > 4 ? "" : "Username is not valid",
        });
        break;
      case "password":
        setFormData({ ...formdata, password: value });
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
    const useQuery = () => new URLSearchParams(location.search);
    const query = useQuery();
    const name = query.get("tenant");
    if (name !== null) {
      setFormData({ ...formdata, tenantName: name });
      dispatch(checkLoginType("tenant"));
    } else {
      setFormData({ ...formdata, tenantName: "" });
      dispatch(checkLoginType("admin"));
    }
  }, [location]);

  useEffect(() => {
    if (
      loginVerification.loginVerified &&
      !loginVerification.error &&
      !loginVerification.loading
    ) {
      dispatch(
        getUserData({
          userName: formdata.userName,
          tenantName: formdata.tenantName,
          type: loginType.data,
        })
      );
    } else if (
      !loginVerification.loginVerified &&
      loginVerification.error &&
      !loginVerification.loading
    ) {
      ToastAlert("Incorrect Credentials!", "warning");
    }
  }, [loginVerification.loginVerified, loginVerification.error]);

  const validate = () => {
    let valid = false;
    switch (loginType.data) {
      case "admin":
        valid = !(
          formdata.userName.length === 0 || formdata.password.length === 0
        );
        break;
      case "tenant":
      case "user":
        valid = !(
          formdata.userName.length === 0 ||
          formdata.password.length === 0 ||
          formdata.tenantName.length === 0
        );
        break;
    }
    return valid;
  };

  useEffect(() => {
    if (!user.loading && validate() && user.data && loginType.data) {
      ToastAlert("Logged In", "success");
      navigate("/tenant");
    }
    if (!user.loading && user.error && loginType.data) {
      ToastAlert(`Could not login , error ${user.error}`, "warning");
    }
  }, [user.data, user.error]);

  const handleSubmit = async () => {
    if (validate()) {
      await dispatch(commonLogin({ ...formdata }));
    } else {
      ToastAlert("Please fill all the fields", "error");
    }
  };

  return user.loading ? (
    <Spinner />
  ) : (
    <div className="d-flex align-items-center auth px-0">
      <div className="row w-100 mx-0">
        <div className="col-lg-6 col-md-8 col-sm-10 mx-auto">
          <div className="auth-form-light text-left py-5 px-4 px-sm-5">
            <div className="brand-logo">
              <img src={logo} alt="logo" />
            </div>
            <h4>Hello ! let&apos;s get started</h4>
            <h6 className="font-weight-light">Sign in to continue.</h6>
            <Form className="pt-3">
              <Form.Group className="mb-3">
                <Form.Control
                  data-testid="userName-input"
                  type="text"
                  name="userName"
                  value={formdata.userName}
                  placeholder="Enter Username"
                  onChange={handle}
                  required
                />
                {error.userName.length > 0 && (
                  <Alert variant="danger" className="mt-2">
                    {error.userName}
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
                      value={formdata.password}
                      placeholder="Enter password"
                      onChange={handle}
                    />
                    <InputGroup.Text>
                      <PasswordButtons
                        viewPassword={showPassword}
                        setViewPassword={setShowpassword}
                      />
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                {error.password.length > 0 && (
                  <Alert variant="danger" className="mt-2">
                    {error.password}
                  </Alert>
                )}
              </div>
              <div className="mt-3">
                <Button
                  data-testid="signin-button"
                  className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  SIGN IN
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
