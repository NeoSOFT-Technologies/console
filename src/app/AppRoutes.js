import React, { Component, Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Spinner from "../app/shared/Spinner";
import UserList from "./dashboard/UserList";
const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const Error404 = lazy(() => import("./error-pages/Error404"));
const Error500 = lazy(() => import("./error-pages/Error500"));
const Login = lazy(() => import("./user-pages/Login"));
const Register = lazy(() => import("./user-pages/Register"));
const Lockscreen = lazy(() => import("./user-pages/Lockscreen"));
const CreateUser = lazy(() => import("./dashboard/CreateUser"));
const RegisterUser = lazy(() => import("./dashboard/RegisterUser"));
const TenantList = lazy(() => import("./dashboard/TenantList"));

const AdminDashboard = lazy(() => import("./dashboard/AdminDashboard"));
const TenantDetails = lazy(() => import("./dashboard/TenantDetails"));
const TenantDatabaseForm = lazy(() => import("./dashboard/TenantDatabaseForm"));
class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/tenant/:id" element={<TenantDetails />} />
          <Route path="/createuser" element={<CreateUser />} />
          <Route path="/tenantdatabase" element={<TenantDatabaseForm />} />
          <Route path="/registertenant" element={<RegisterUser />} />
          <Route path="/tenant" element={<TenantList />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/login-page" element={<Login />} />

          <Route path="/registration-page" element={<Register />} />
          <Route path="/user-pages/lockscreen" element={<Lockscreen />} />
          <Route path="/error-pages/error-404" element={<Error404 />} />
          <Route path="/error-pages/error-500" element={<Error500 />} />
          <Route path="*" element={<Navigate to="/login-page" />} />
        </Routes>
      </Suspense>
    );
  }
}

export default AppRoutes;
