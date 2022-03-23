import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../store";

type component = {
  children: any;
};

export const AdminGuard = ({ children }: component) => {
  const authenticationState = useSelector((state: RootState) => state.userData);
  return authenticationState.data &&
    authenticationState.data.type === "admin" ? (
    children
  ) : (
    <Navigate to="/error-pages/error-401" />
  );
};

export const TenantGuard = ({ children }: component) => {
  const authenticationState = useSelector((state: RootState) => state.userData);
  return authenticationState.data &&
    authenticationState.data.type === "tenant" ? (
    children
  ) : (
    <Navigate to="/error-pages/error-401" />
  );
};

export const UserGuard = ({ children }: component) => {
  const authenticationState = useSelector((state: RootState) => state.userData);
  return authenticationState.data &&
    authenticationState.data.type === "user" ? (
    children
  ) : (
    <Navigate to="/error-pages/error-401" />
  );
};
