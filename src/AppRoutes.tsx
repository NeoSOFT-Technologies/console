import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Spinner from "./components/loader/Loader";
const UserDetails = lazy(
  () => import("./pages/features/Tenant/user-details/UserDetails")
);
const UserList = lazy(
  () => import("./pages/features/Tenant/user-list/UserList")
);
const TenantDashboard = lazy(
  () => import("./pages/features/Tenant/tenant-dashboard/TenantDashboard")
);
const Error404 = lazy(() => import("./pages/error-pages/Error404"));
const Error500 = lazy(() => import("./pages/error-pages/Error500"));
const Login = lazy(() => import("./pages/login/Login"));
const CreateUser = lazy(
  () => import("./pages/features/Tenant/create-user/CreateUser")
);
const RegisterTenant = lazy(
  () => import("./pages/features/Admin/register-tenant/RegisterTenant")
);
const TenantList = lazy(
  () => import("./pages/features/Admin/tenant-list/TenantList")
);
const AdminDashboard = lazy(
  () => import("./pages/features/Admin/admin-dashboard/AdminDashboard")
);
const TenantDetails = lazy(
  () => import("./pages/features/Admin/tenant-details/TenantDetails")
);
function AppRoutes() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/tenantdashboard" element={<TenantDashboard />} />
        {/* <Route path="/tenant/:id" element={<TenantDetails />} /> */}
        <Route path="/createuser" element={<CreateUser />} />
        <Route path="/userlist" element={<UserList />} />
        {/*  */}
        <Route path="/login-page" element={<Login />} />
        <Route path="/error-pages/error-404" element={<Error404 />} />
        <Route path="/error-pages/error-500" element={<Error500 />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/tenantdetails" element={<TenantDetails />} />
        <Route path="/registertenant" element={<RegisterTenant />} />
        <Route path="/tenantlist" element={<TenantList />} />
        <Route path="/userdetails/:id" element={<UserDetails />} />
        <Route path="*" element={<Navigate to="/login-page" />} />
      </Routes>
    </Suspense>
  );
}
export default AppRoutes;
