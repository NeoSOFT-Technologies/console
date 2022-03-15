import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function withRouter(Component: any) {
  function ComponentWithRouterProperty(properties: any) {
    const location = useLocation();
    const navigate = useNavigate();
    const parameters = useParams();
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
