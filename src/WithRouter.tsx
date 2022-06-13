import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "./store/hooks";
import { checkLoginType } from "./store/login-type/slice";
import { setLocalStorageData } from "./store/user-data/slice";

function withRouter(Component: any) {
  function ComponentWithRouterProperty(properties: any) {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const parameters = useParams();
    useEffect(() => {
      if (localStorage.getItem("user_info")) {
        dispatch(checkLoginType());
        dispatch(setLocalStorageData());
      } else if (location.pathname !== "/login-page") {
        navigate("/login-page");
      }
    }, []);

    return (
      <Component
        {...properties}
        router={{ location, navigate, params: parameters }}
      />
    );
  }

  return ComponentWithRouterProperty;
}

export default withRouter;
