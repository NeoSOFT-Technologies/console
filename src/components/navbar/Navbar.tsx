import React from "react";
import { logo, logo_mini } from "../../resources/tenant/images";
import { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { commonLogout } from "../../store/logout/slice";
import { IUserDataState } from "../../types";

interface IConditions {
  data: string;
  loading: boolean;
  error?: string | null;
}

export default function Navbar() {
  const dispatch = useAppDispatch();
  const user: IUserDataState = useAppSelector(
    (state: RootState) => state.userData
  );
  const loginType: IConditions = useAppSelector(
    (state: RootState) => state.loginType
  );
  const toggleOffcanvas = () => {
    document?.querySelector(".sidebar-offcanvas")?.classList.toggle("active");
  };

  const logout = async () => {
    await dispatch(commonLogout());
    window.location.href =
      loginType.data === "admin"
        ? "/login-page"
        : `/login-page?tenant=${user?.data?.tenantName}`;
  };

  return (
    <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <p className="navbar-brand brand-logo">
          <img src={logo} alt="logo" />
        </p>
        <p className="navbar-brand brand-logo-mini">
          <img src={logo_mini} alt="logo" />
        </p>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-stretch">
        <button
          data-testid="toggle-button"
          className="navbar-toggler navbar-toggler align-self-center"
          type="button"
          onClick={() => document.body.classList.toggle("sidebar-icon-only")}
        >
          <span className="bi bi-list"></span>
        </button>
        <div className="search-field d-none d-md-block">
          <form className="d-flex align-items-center h-100" action="#">
            <div className="input-group">
              <div className="input-group-prepend bg-parent">
                <i className="input-group-text border-0 bi bi-search"></i>
              </div>
              <input
                type="text"
                className="form-control bg-parent border-0"
                placeholder="Search projects"
              />
            </div>
          </form>
        </div>
        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item nav-settings d-lg-block">
            <button
              data-testid="navigate-button"
              type="button"
              className="nav-link border-0 mx-auto"
              onClick={() => logout()}
            >
              <i className="bi bi-power"></i>
            </button>
          </li>
        </ul>
        <button
          data-testid="toggleOff-button"
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          onClick={toggleOffcanvas}
        >
          <span className="bi bi-list-ul"></span>
        </button>
      </div>
    </nav>
  );
}
