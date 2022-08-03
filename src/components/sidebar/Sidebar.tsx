import React, { useState, useEffect, useRef } from "react";
import { Collapse } from "react-bootstrap";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import withRouter from "../../WithRouter";
import adminGatewayRoutes from "../../routes/gateway/admin-gateway-routes";
import saasRoutes from "../../routes/saas/saas-routes";
import adminRoutes from "../../routes/tenants/admin";
import tenantRoutes from "../../routes/tenants/tenants";
import userRoutes from "../../routes/tenants/user-routes";
import { RootState } from "../../store";
import { useAppSelector } from "../../store/hooks";
import { IUserDataState } from "../../types";
import "./Sidebar.scss";
import "bootstrap/dist/css/bootstrap.min.css";

interface IConditions {
  data: string;
  loading: boolean;
  error?: string | null;
}

export const Sidebar = () => {
  const elsa_host = process.env.REACT_APP_ELSA_HOST;
  const location = useLocation();
  const navigate = useNavigate();
  const myContainer = useRef(document.createElement("iframe"));
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
  const [gatewayroutes, setGatewayRoutes] = useState([
    { path: "", title: "", icon: "" },
  ]);
  const [saasroutes, setSaasRoutes] = useState([
    { path: "", title: "", icon: "" },
  ]);

  useEffect(() => {
    if (user.data && loginType.data === "admin") {
      setRoutes(adminRoutes);
      setGatewayRoutes(adminGatewayRoutes);
      setSaasRoutes(saasRoutes);
    } else if (user.data && loginType.data === "tenant") {
      setRoutes(tenantRoutes);
      setGatewayRoutes(adminGatewayRoutes);
      setSaasRoutes(saasRoutes);
    } else if (user.data && loginType.data === "user") {
      setRoutes(userRoutes);
      setGatewayRoutes(adminGatewayRoutes);
    }
  }, [user.data]);

  const [subMenu, setSubMenu] = useState({
    tenant: false,
    gateway: false,
    saas: false,
  });
  function postCrossDomainMessage(msg: any) {
    const win = myContainer.current.contentWindow;
    win!.postMessage(msg, `${elsa_host}`);
  }
  const AccessToken: any = JSON.parse(localStorage.getItem("user")!);
  const postMsg = { login: AccessToken.accessToken }; // this is just example
  return (
    <>
      {" "}
      {localStorage.getItem("user_info") ? (
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
                    src={`${process.env.REACT_APP_HOST}global/images/faces/face1.jpg`}
                    alt="profile"
                  />
                  <span className="login-status online"></span>{" "}
                </div>
                <div className="nav-profile-text">
                  <span className="font-weight-bold mb-2">
                    {
                      JSON.parse(
                        localStorage.getItem("user_info") || "undefined"
                      )?.username
                    }
                  </span>
                  <span className="text-secondary text-small">
                    <>
                      Role -
                      {
                        JSON.parse(
                          localStorage.getItem("user_info") || "undefined"
                        )?.roles[0]
                      }
                    </>
                  </span>
                </div>
                {/* <i className="bi bi-bookmark-star-fill text-success nav-profile-badge"></i> */}
              </a>
            </li>
            <li className="nav-item">
              <div
                className="nav-link"
                onClick={() => navigate("/tenant")}
                data-testid="home"
              >
                <div className="d-flex justify-content-between w-100">
                  <span className="menu-title lh-2">Home</span>
                  <i className="bi bi-house-door-fill"></i>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link" data-testid="tenant">
                <div className="d-flex justify-content-between w-100 ">
                  <span
                    className="menu-title lh-2"
                    onClick={() =>
                      setSubMenu({ ...subMenu, tenant: !subMenu.tenant })
                    }
                  >
                    Tenant
                  </span>
                  <i
                    className={` ${
                      subMenu.tenant
                        ? "bi bi-chevron-double-left r-90"
                        : " bi bi-chevron-left r90"
                    }`}
                  ></i>
                </div>
              </div>
              <Collapse in={subMenu.tenant}>
                <ul className="nav flex-column  list-unstyled p-0">
                  {routes.map((route, index) => (
                    <li
                      key={`route${index}`}
                      className={
                        isPathActive(route.path)
                          ? "nav-item active px-3"
                          : "nav-item px-3"
                      }
                    >
                      <Link className="nav-link pt-0" to={route.path}>
                        <div className="d-flex justify-content-between w-100 ">
                          <span className="menu-title lh-2">
                            <>{route.title}</>
                          </span>
                          <i className={route.icon}></i>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Collapse>
            </li>
            <li className="nav-item">
              <div className="nav-link" data-testid="gateway">
                <div className="d-flex justify-content-between w-100 ">
                  <span
                    className="menu-title lh-2"
                    onClick={() =>
                      setSubMenu({ ...subMenu, gateway: !subMenu.gateway })
                    }
                  >
                    Gateway
                  </span>
                  <i
                    className={` ${
                      subMenu.gateway
                        ? "bi bi-chevron-double-left r-90"
                        : " bi bi-chevron-left r90"
                    }`}
                  ></i>
                </div>
              </div>
              <Collapse in={subMenu.gateway}>
                <ul className="nav flex-column  list-unstyled p-0">
                  {gatewayroutes.map((route, index) => (
                    <li
                      key={`route${index}`}
                      className={
                        isPathActive(route.path)
                          ? "nav-item active px-3"
                          : "nav-item px-3"
                      }
                    >
                      <Link className="nav-link pt-0" to={route.path}>
                        <div className="d-flex justify-content-between w-100 ">
                          <span className="menu-title lh-2">
                            <>{route.title}</>
                          </span>
                          <i className={route.icon}></i>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Collapse>
            </li>
            <li className="nav-item">
              <div className="nav-link" data-testid="saas">
                <div className="d-flex justify-content-between w-100 ">
                  <span
                    className="menu-title lh-2"
                    onClick={() =>
                      setSubMenu({ ...subMenu, saas: !subMenu.saas })
                    }
                  >
                    Search as a Service
                  </span>
                  <i
                    className={` ${
                      subMenu.saas
                        ? "bi bi-chevron-double-left r-90"
                        : " bi bi-chevron-left r90"
                    }`}
                  ></i>
                </div>
              </div>
              <Collapse in={subMenu.saas}>
                <ul className="nav flex-column  list-unstyled p-0">
                  {saasroutes.map((route, index) => (
                    <li
                      key={`route${index}`}
                      className={
                        isPathActive(route.path)
                          ? "nav-item active px-3"
                          : "nav-item px-3"
                      }
                    >
                      <Link className="nav-link pt-0" to={route.path}>
                        <div className="d-flex justify-content-between w-100  ">
                          <span className="menu-title lh-2">
                            <>{route.title}</>
                          </span>
                          <i className={route.icon}></i>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Collapse>
            </li>
            <li className="nav-item">
              <div className="nav-link">
                <div className="d-flex justify-content-between w-100 ">
                  <span className="menu-title lh-2">
                    <a
                      href={elsa_host}
                      target="_blank"
                      className="text-dark text-decoration-none"
                      onClick={() => postCrossDomainMessage(postMsg)}
                      rel="noreferrer"
                    >
                      Elsa Workflow
                      <iframe
                        style={{ display: "none" }}
                        src={`${elsa_host}/getlocalstorage`}
                        id="ifr"
                        ref={myContainer}
                      ></iframe>
                    </a>
                  </span>
                  <i className="bi bi-house-door-fill "></i>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      ) : (
        <Navigate to="/login-page"></Navigate>
      )}
    </>
  );
};
export default withRouter(Sidebar);
