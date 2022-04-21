import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AdminGuard, TenantGuard, UserGuard } from "./components/auth-gaurd";
import Spinner from "./components/loader/Loader";
const RoleAndPermissions = lazy(
  () =>
    import(
      "./pages/features/tenants/user/role-and-permissions/RoleAndPermissions"
    )
);
const StatisticsDashboard = lazy(
  () => import("./components/statistics-dashborad/StatisticsDashboard")
);
const UserDetails = lazy(
  () => import("./pages/features/tenants/tenant/user-details/UserDetails")
);
const Error = lazy(() => import("./pages/error-pages/Error"));
const UserList = lazy(
  () => import("./pages/features/tenants/tenant/user-list/UserList")
);
const TenantDashboard = lazy(
  () =>
    import("./pages/features/tenants/tenant/tenant-dashboard/TenantDashboard")
);
const UserDashboard = lazy(
  () => import("./pages/features/tenants/user/user-dashboard/UserDashboard")
);
const Error404 = lazy(() => import("./pages/error-pages/Error404"));
const Error401 = lazy(() => import("./pages/error-pages/Error401"));
const Error500 = lazy(() => import("./pages/error-pages/Error500"));
const Login = lazy(() => import("./pages/login/Login"));
const CreateUser = lazy(
  () => import("./pages/features/tenants/tenant/create-user/CreateUser")
);
const RegisterTenant = lazy(
  () => import("./pages/features/tenants/admin/register-tenant/RegisterTenant")
);
const TenantList = lazy(
  () => import("./pages/features/tenants/admin/tenant-list/TenantList")
);
const AdminDashboard = lazy(
  () => import("./pages/features/tenants/admin/admin-dashboard/AdminDashboard")
);
const TenantDetails = lazy(
  () => import("./pages/features/tenants/admin/tenant-details/TenantDetails")
);
const TenantProfile = lazy(
  () => import("./pages/features/tenants/tenant/tenant-profile/TenantProfile")
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
        <Route path="/statistics" element={<StatisticsDashboard />} />
        {/** **********************ADMIN ROUTES***********************/}
        <Route path="/admin">
          <Route path="" element={<StatisticsDashboard />} />

          <Route
            path="dashboard"
            element={
              <AdminGuard>
                <AdminDashboard />
              </AdminGuard>
            }
          />
          <Route
            path="tenants"
            element={
              <AdminGuard>
                <TenantList />
              </AdminGuard>
            }
          />
          <Route
            path="tenants/:tenantName"
            element={
              <AdminGuard>
                <TenantDetails />
              </AdminGuard>
            }
          />
          <Route
            path="register-tenant"
            element={
              <AdminGuard>
                <RegisterTenant />
              </AdminGuard>
            }
          />
        </Route>
        {/**********************************************************/}
        {/** ********************TENANT ROUTES*************************/}
        <Route path="/tenant">
          <Route path="" element={<StatisticsDashboard />} />
          <Route
            path="dashboard"
            element={
              <TenantGuard>
                <TenantDashboard />
              </TenantGuard>
            }
          />

          <Route
            path="create-user"
            element={
              <TenantGuard>
                <CreateUser />
              </TenantGuard>
            }
          />
          <Route
            path="users"
            element={
              <TenantGuard>
                <UserList />
              </TenantGuard>
            }
          />
          <Route
            path="users/:userName"
            element={
              <TenantGuard>
                <UserDetails />
              </TenantGuard>
            }
          />
          <Route
            path="profile"
            element={
              <TenantGuard>
                <TenantProfile />
              </TenantGuard>
            }
          />
        </Route>
        {/**********************************************************/}
        {/** ***********************USER ROUTES*********************/}
        <Route path="/user">
          <Route path="" element={<StatisticsDashboard />} />
          <Route
            path="dashboard"
            element={
              <UserGuard>
                <UserDashboard />
              </UserGuard>
            }
          />
          <Route
            path="roles-and-permissions"
            element={
              <UserGuard>
                <RoleAndPermissions />
              </UserGuard>
            }
          />
        </Route>
        {/**********************************************************/}
        <Route path="*" element={<Navigate to="/login-page" />} />{" "}
        {/* redirect if not match any path */}
      </Routes>
    </Suspense>
  );
}
export default AppRoutes;
