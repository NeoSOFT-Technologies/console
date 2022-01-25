import React from "../../node_modules/react";
import ReactDOM from "../../node_modules/react-dom";
import App from "./App";
import AppRoutes from "./AppRoutes";
import Dashboard from "./dashboard/Dashboard";
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar";
import Login from "./user-pages/Login";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./shared/Sidebar";
import Register from "./user-pages/Register";
import LockScreen from "./user-pages/Lockscreen";
import Error404 from "./error-pages/Error404";
import Error500 from "./error-pages/Error500";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Dashboard />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Footer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BrowserRouter><Error404 /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BrowserRouter><Error500 /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Footer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BrowserRouter><Register /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BrowserRouter><Login /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BrowserRouter><LockScreen /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});