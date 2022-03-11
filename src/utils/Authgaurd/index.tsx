import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../store";

type component = {
  children: any;
};

export const AdminGuard = ({ children }: component) => {
  const authenticationState = useSelector((state: RootState) => state.userData);
  if (authenticationState.data && authenticationState.data.type === "admin") {
    return children;
  } else {
    return <Navigate to="/error-pages/error-401" />;
  }
};

export const TenantGuard = ({ children }: component) => {
  const authenticationState = useSelector((state: RootState) => state.userData);
  if (authenticationState.data && authenticationState.data.type === "tenant") {
    return children;
  } else {
    return <Navigate to="/error-pages/error-401" />;
  }
};

export const UserGuard = ({ children }: component) => {
  const authenticationState = useSelector((state: RootState) => state.userData);
  if (authenticationState.data && authenticationState.data.type === "user") {
    return children;
  } else {
    return <Navigate to="/error-pages/error-401" />;
  }
};
