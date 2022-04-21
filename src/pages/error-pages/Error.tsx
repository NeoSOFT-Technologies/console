import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { errorMsg } from "../../resources/constants";
import { RootState } from "../../store";
import { useAppSelector } from "../../store/hooks";
import "./error.scss";
export default function Error() {
  const location = useLocation();
  const code: string = location.state as string;
  const loginType = useAppSelector((state: RootState) => state.loginType);
  const navigate = useNavigate();
  const backToHome = () => {
    switch (loginType.data) {
      case "admin":
        navigate("/admin/dashboard");
        break;
      case "tenant":
        navigate("/tenant/dashboard");
        break;
      case "user":
        navigate("/user/dashboard");
        break;
      default:
        navigate("/login-page");
    }
  };
  return (
    <div>
      <div className="d-flex align-items-center text-center error-page bg-primary pt-5 pb-4 h-100">
        <div className="row flex-grow">
          <div className="col-lg-8 mx-auto text-white">
            <div className="row align-items-center d-flex flex-row">
              <div className="col-lg-6 text-lg-right pr-lg-4">
                <h1 className="display-1 mb-0">{code}</h1>
              </div>
              <div className="col-lg-6 error-page-divider text-lg-left pl-lg-4">
                <h2>SORRY!</h2>
                {/* @ts-ignore */}
                <h3 className="font-weight-light">{errorMsg[code]}</h3>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-12 text-center mt-xl-2">
                <span
                  className="text-white font-weight-medium pointer"
                  data-testid="error-input"
                  onClick={() => backToHome()}
                >
                  Back to home
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
