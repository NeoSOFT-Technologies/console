import React from "react";
import ReactDOM from "react-dom";
import Dashboard from "../app/dashboard/Dashboard";
import Footer from "../app/shared/Footer";
import Login from "../app/user-pages/Login";
import { BrowserRouter } from "react-router-dom";
import Register from "../app/user-pages/Register";
import LockScreen from "../app/user-pages/Lockscreen";
import Error404 from "../app/error-pages/Error404";
import Error500 from "../app/error-pages/Error500";
import { div } from "../app/constants/constantVariables";
import { Provider } from "react-redux";
import store from "../app/redux/store/store";

it("renders without crashing", () => {
  ReactDOM.render(
    <Provider store={store}>
      <Dashboard />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
it("renders without crashing", () => {
  ReactDOM.render(<Footer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it("renders without crashing", () => {
  ReactDOM.render(
    <BrowserRouter>
      <Error404 />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
it("renders without crashing", () => {
  ReactDOM.render(
    <BrowserRouter>
      <Error500 />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
it("renders without crashing", () => {
  ReactDOM.render(<Footer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it("renders without crashing", () => {
  ReactDOM.render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
it("renders without crashing", () => {
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <Login />
      </Provider>
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
it("renders without crashing", () => {
  ReactDOM.render(
    <BrowserRouter>
      <LockScreen />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
