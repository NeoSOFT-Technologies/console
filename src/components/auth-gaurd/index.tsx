import React, { useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { RootState } from "../../store";
import { useAppSelector } from "../../store/hooks";

type component = {
  children: any;
};

export const AdminGuard = ({ children }: component) => {
  const authenticationState = useAppSelector(
    (state: RootState) => state.loginType
  );

  return authenticationState.data && authenticationState.data === "admin" ? (
    children
  ) : (
    <Navigate to="/error-pages/error-401" />
  );
};

export const TenantGuard = ({ children }: component) => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  const authenticationState = useAppSelector(
    (state: RootState) => state.loginType
  );
  const userData = useAppSelector((state: RootState) => state.userData);

  useEffect(() => {
    if (userData.data?.tenantName) {
      const currentURL = window.location.pathname.split("/");
      if (currentURL[1] === "tenant") {
        setSearchParams({ tenant: userData.data.tenantName });
      }
    }
  }, [location.pathname, userData]);
  return authenticationState.data && authenticationState.data === "tenant" ? (
    children
  ) : (
    <Navigate to="/error-pages/error-401" />
  );
};

export const UserGuard = ({ children }: component) => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  const authenticationState = useAppSelector(
    (state: RootState) => state.loginType
  );
  const userData = useAppSelector((state: RootState) => state.userData);

  useEffect(() => {
    if (userData.data?.tenantName) {
      const currentURL = window.location.pathname.split("/");
      if (currentURL[1] === "tenant") {
        setSearchParams({ tenant: userData.data.tenantName });
      }
    }
  }, [location.pathname, userData]);
  return authenticationState.data && authenticationState.data === "user" ? (
    children
  ) : (
    <Navigate to="/error-pages/error-401" />
  );
};
