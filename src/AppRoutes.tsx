import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AdminGuard, TenantGuard, UserGuard } from "./components/auth-gaurd";
import Spinner from "./components/loader/Loader";
const RoleAndPermissions = lazy(
  () => import("./pages/features/User/role-and-permissions/RoleAndPermissions")
);
const UserDetails = lazy(
  () => import("./pages/features/Tenant/user-details/UserDetails")
);
const Error = lazy(() => import("./pages/error-pages/Error"));
const UserList = lazy(
  () => import("./pages/features/Tenant/user-list/UserList")
);
const TenantDashboard = lazy(
  () => import("./pages/features/Tenant/tenant-dashboard/TenantDashboard")
);
const UserDashboard = lazy(
  () => import("./pages/features/User/user-dashboard/UserDashboard")
);
const Error404 = lazy(() => import("./pages/error-pages/Error404"));
const Error401 = lazy(() => import("./pages/error-pages/Error401"));
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
const TenantProfile = lazy(
  () => import("./pages/features/Tenant/tenant-profile/TenantProfile")
);
const TenantPermission = lazy(
  () => import("./pages/features/Admin/tenant-permission/TenantPermission")
);
const TenantRoles = lazy(
  () => import("./pages/features/Admin/tenant-roles/TenantRoles")
);

function AppRoutes() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/login-page" element={<Login />} />
        <Route path="/error-pages/error-404" element={<Error404 />} />
        <Route path="/error-pages/error-500" element={<Error500 />} />
        <Route path="/error-pages/error-401" element={<Error401 />} />
        <Route path="/error" element={<Error />} />
        {/** **********************ADMIN ROUTES***********************/}
        <Route
          path="/admindashboard"
          element={
            <AdminGuard>
              <AdminDashboard />
            </AdminGuard>
          }
        />
        <Route
          path="/tenantdetails/:tenantName"
          element={
            <AdminGuard>
              <TenantDetails />
            </AdminGuard>
          }
        />
        <Route
          path="/registertenant"
          element={
            <AdminGuard>
              <RegisterTenant />
            </AdminGuard>
          }
        />
        <Route
          path="/tenantlist"
          element={
            <AdminGuard>
              <TenantList />
            </AdminGuard>
          }
        />
        <Route
          path="/manageroles"
          element={
            <AdminGuard>
              <TenantRoles />
            </AdminGuard>
          }
        />
        <Route
          path="/tenantpermission"
          element={
            <AdminGuard>
              <TenantPermission />
            </AdminGuard>
          }
        />
        {/**********************************************************/}
        {/** ********************TENANT ROUTES*************************/}
        <Route
          path="/tenantdashboard"
          element={
            <TenantGuard>
              <TenantDashboard />
            </TenantGuard>
          }
        />
        <Route
          path="/createuser"
          element={
            <TenantGuard>
              <CreateUser />
            </TenantGuard>
          }
        />
        <Route
          path="/userlist"
          element={
            <TenantGuard>
              <UserList />
            </TenantGuard>
          }
        />
        <Route
          path="/userdetails/:userName"
          element={
            <TenantGuard>
              <UserDetails />
            </TenantGuard>
          }
        />
        <Route
          path="/tenantprofile"
          element={
            <TenantGuard>
              <TenantProfile />
            </TenantGuard>
          }
        />
        {/**********************************************************/}
        {/** ************************USER ROUTES*********************/}
        <Route
          path="/userdashboard"
          element={
            <UserGuard>
              <UserDashboard />
            </UserGuard>
          }
        />
        <Route
          path="/userrolesandpermissions"
          element={
            <UserGuard>
              <RoleAndPermissions />
            </UserGuard>
          }
        />
        {/**********************************************************/}
        <Route path="*" element={<Navigate to="/login-page" />} />{" "}
        {/* redirect if not match any path */}
      </Routes>
    </Suspense>
  );
}
export default AppRoutes;
