import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../store";

type component = {
  children: any;
};

export const AdminGuard = ({ children }: component) => {
  const authenticationState = useSelector(
    (state: RootState) => state.loginType
  );

  return authenticationState.data && authenticationState.data === "admin" ? (
    children
  ) : (
    <Navigate to="/error-pages/error-401" />
  );
};

export const TenantGuard = ({ children }: component) => {
  const authenticationState = useSelector(
    (state: RootState) => state.loginType
  );
  return authenticationState.data && authenticationState.data === "tenant" ? (
    children
  ) : (
    <Navigate to="/error-pages/error-401" />
  );
};

export const UserGuard = ({ children }: component) => {
  const authenticationState = useSelector(
    (state: RootState) => state.loginType
  );
  return authenticationState.data && authenticationState.data === "user" ? (
    children
  ) : (
    <Navigate to="/error-pages/error-401" />
  );
};
