import React, { useState } from "react";
// import { Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import withRouter from "../../WithRouter";
import adminRoutes from "../../routes/features/admin";
import tenantRoutes from "../../routes/features/tenants";
import userRoutes from "../../routes/features/user-routes";
import { RootState } from "../../store";
import { useAppSelector } from "../../store/hooks";
import { IUserDataState } from "../../types";

interface IConditions {
  data: string;
  loading: boolean;
  error?: string | null;
}

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isPathActive = (path: string) => {
    return location.pathname.startsWith(path);
  };
  const user: IUserDataState = useAppSelector(
    (state: RootState) => state.userData
  );
  const loginType: IConditions = useAppSelector(
    (state: RootState) => state.loginType
  );
  const [routes, setRoutes] = useState([{ path: "", title: "", icon: "" }]);
  const [switchRoutes, setSwitchRoutes] = useState(false);
  // useEffect(() => {
  //   if (user.data && loginType.data === "admin") {
  //     setRoutes(adminRoutes);
  //   } else if (user.data && loginType.data === "tenant") {
  //     setRoutes(tenantRoutes);
  //   } else if (user.data && loginType.data === "user") {
  //     setRoutes(userRoutes);
  //   }
  // }, [user.data]);
  const setSubRoutes = (type: string) => {
    switch (type) {
      case "route": {
        if (user.data && loginType.data === "admin") {
          setRoutes(adminRoutes);
          navigate("/admindashboard");
        } else if (user.data && loginType.data === "tenant") {
          setRoutes(tenantRoutes);
          navigate("/tenantdashboard");
        } else if (user.data && loginType.data === "user") {
          setRoutes(userRoutes);
          navigate("/userdashboard");
        }

        break;
      }
      case "gateway": {
        if (user.data && loginType.data === "admin") {
          setRoutes(adminRoutes);
          navigate("/admindashboard");
        } else if (user.data && loginType.data === "tenant") {
          setRoutes(tenantRoutes);
          navigate("/tenantdashboard");
        } else if (user.data && loginType.data === "user") {
          setRoutes(userRoutes);
          navigate("/userdashboard");
        }

        break;
      }
      case "saas": {
        if (user.data && loginType.data === "admin") {
          setRoutes(adminRoutes);
          navigate("/admindashboard");
        } else if (user.data && loginType.data === "tenant") {
          setRoutes(tenantRoutes);
          navigate("/tenantdashboard");
        } else if (user.data && loginType.data === "user") {
          setRoutes(userRoutes);
          navigate("/userdashboard");
        }

        break;
      }
      default: {
        navigate("/error-pages/error-404");
      }
    }
    setSwitchRoutes(true);
  };
  return (
    <>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item nav-profile">
            <a
              href="!#"
              className="nav-link"
              onClick={(event_) => event_.preventDefault()}
              data-testid="nav-link-button"
            >
              <div className="nav-profile-image">
                <img
                  src={`${process.env.REACT_APP_HOST}/global/images/faces/face1.jpg`}
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
              <i className="bi bi-bookmark-star-fill text-success nav-profile-badge"></i>
            </a>
          </li>
          {switchRoutes ? (
            <>
              {routes.map((route, index) => (
                <li
                  key={`route${index}`}
                  className={
                    isPathActive(route.path) ? "nav-item active" : "nav-item"
                  }
                >
                  <Link className="nav-link" to={route.path}>
                    <span className="menu-title">
                      <>{route.title}</>
                    </span>
                    <i className={route.title}></i>
                  </Link>
                </li>
              ))}
            </>
          ) : (
            <>
              <ul className="nav">
                <li
                  className="nav-item"
                  onClick={() => setSubRoutes("route")}
                  data-testid="logintype"
                >
                  <span className="nav-link">
                    <span className="menu-title ">{loginType.data}</span>
                  </span>
                </li>

                <li
                  className="nav-item"
                  data-testid="gateway-item"
                  onClick={() => setSubRoutes("gateway")}
                >
                  <span className="nav-link">
                    <span className="menu-title">Gateway</span>
                  </span>
                </li>
                <li
                  className="nav-item"
                  onClick={() => setSubRoutes("saas")}
                  data-testid="sass"
                >
                  <span className="nav-link">
                    <span className="menu-title ">SaaS</span>
                  </span>
                </li>
              </ul>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};
export default withRouter(Sidebar);
