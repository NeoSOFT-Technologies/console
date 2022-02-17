import React from "react";
import { Link, useLocation } from "react-router-dom";
import { host } from "../config/URL";
import withRouter from "../WithRouter";
function TenantSidebar() {
  const location = useLocation();
  const isPathActive = (path) => {
    return location.pathname.startsWith(path);
  };
  return (
    <>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item nav-profile">
            <a
              href="!#"
              className="nav-link"
              onClick={(evt) => evt.preventDefault()}
            >
              <div className="nav-profile-image">
                <img src={`${host}/images/faces/face1.jpg`} alt="profile" />
                <span className="login-status online"></span>{" "}
                {/* change to offline or busy as needed */}
              </div>
              <div className="nav-profile-text">
                <span className="font-weight-bold mb-2">
                  <>Santosh Shinde</>
                </span>
                <span className="text-secondary text-small">
                  <>Project Manager</>
                </span>
              </div>
              <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
            </a>
          </li>
          <li
            className={
              isPathActive("/dashboard") ? "nav-item active" : "nav-item"
            }
          >
            <Link className="nav-link" to="/dashboard">
              <span className="menu-title">
                <>Dashboard</>
              </span>
              <i className="mdi mdi-home menu-icon"></i>
            </Link>
          </li>
          <li
            className={
              isPathActive("/createuser") ? "nav-item active" : "nav-item"
            }
          >
            <Link className="nav-link" to="/createuser">
              <span className="menu-title">
                <>New User</>
              </span>
              <i className="mdi mdi-account-plus menu-icon"></i>
            </Link>
          </li>
          <li className={isPathActive("#") ? "nav-item active" : "nav-item"}>
            <Link className="nav-link" to="/dashboard">
              <span className="menu-title">
                <>Config</>
              </span>
              <i className="mdi mdi-settings menu-icon"></i>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
export default withRouter(TenantSidebar);
