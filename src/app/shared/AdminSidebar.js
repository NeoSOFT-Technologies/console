import React from "react";
import { Link, useLocation } from "react-router-dom";
import withRouter from "../WithRouter";
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
              isPathActive("/masterdashboard") ? "nav-item active" : "nav-item"
            }
          >
            <Link className="nav-link" to="/masterdashboard">
              <span className="menu-title">
                <>Master</>
              </span>
              <i className="mdi mdi-account-star menu-icon"></i>
            </Link>
          </li>
          <li
            className={
              isPathActive("/tenantlist") ? "nav-item active" : "nav-item"
            }
          >
            <Link className="nav-link" to="/tenantlist">
              <span className="menu-title">
                <>List</>
              </span>
              <i className="mdi mdi-format-list-bulleted menu-icon"></i>
            </Link>
          </li>
          <li
            className={
              isPathActive("/registertenant") ? "nav-item active" : "nav-item"
            }
          >
            <Link className="nav-link" to="/registertenant">
              <span className="menu-title">
                <>Add User</>
              </span>
              <i className="mdi mdi-account-plus menu-icon"></i>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
export default withRouter(AdminSidebar);
