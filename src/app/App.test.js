import React from "../../node_modules/react";
import ReactDOM from "../../node_modules/react-dom";
import Dashboard from "./dashboard/Dashboard";
import Footer from "./shared/Footer";
import Login from "./user-pages/Login";
import { BrowserRouter } from "react-router-dom";
import Register from "./user-pages/Register";
import LockScreen from "./user-pages/Lockscreen";
import Error404 from "./error-pages/Error404";
import Error500 from "./error-pages/Error500";
import { div } from "./constants/constantVariables";
import { Provider } from "react-redux";
import store from './redux/store/store'

it("renders without crashing", () => {
  ReactDOM.render(<Provider store={store}>
    <Dashboard />
  </Provider>, div);
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
