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
  const [searchParamsTenant, setSearchParamsTenant] = useSearchParams();
  console.log(searchParamsTenant);
  const authenticationState = useAppSelector(
    (state: RootState) => state.loginType
  );
  const userData = useAppSelector((state: RootState) => state.userData);

  useEffect(() => {
    if (userData.data?.tenantName) {
      const currentURL = window.location.pathname.split("/");
      if (currentURL[1] === "tenant") {
        setSearchParamsTenant({ tenant: userData.data.tenantName });
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
  const [searchParamsUser, setSearchParamsUser] = useSearchParams();
  console.log(searchParamsUser);
  const authenticationState = useAppSelector(
    (state: RootState) => state.loginType
  );
  const userData = useAppSelector((state: RootState) => state.userData);

  useEffect(() => {
    if (userData.data?.tenantName) {
      const currentURL = window.location.pathname.split("/");
      if (currentURL[1] === "tenant") {
        setSearchParamsUser({ tenant: userData.data.tenantName });
      }
    }
  }, [location.pathname, userData]);
  return authenticationState.data && authenticationState.data === "user" ? (
    children
  ) : (
    <Navigate to="/error-pages/error-401" />
  );
};
