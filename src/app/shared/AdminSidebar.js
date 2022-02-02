import React from "react";
import { Link, useLocation } from "react-router-dom";
import withRouter from "../WithRouter";
const tenant = ["tenant1", "tenant2"];
function AdminSidebar() {
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
                <img
                  src={require("../../assets/images/faces/face1.jpg")}
                  alt="profile"
                />
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
              isPathActive("/registertenant") ? "nav-item active" : "nav-item"
            }
          >
            <Link className="nav-link" to="/registertenant">
              <span className="menu-title">
                <>Master</>
              </span>
              <i className="mdi mdi-account-star menu-icon"></i>
            </Link>
          </li>
          {tenant.map((val, i) => (
            <li
              key={i}
              className={
                isPathActive(`/${val}`) ? "nav-item active" : "nav-item"
              }
            >
              <Link className="nav-link" to={`#`}>
                <span className="menu-title">
                  <>{val}</>
                </span>
                <i className="mdi mdi-account-check menu-icon"></i>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
export default withRouter(AdminSidebar);
