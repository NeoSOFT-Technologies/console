import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Login from "./Login";

const mockStore = configureStore([thunk]);
const storeStates = {
  loginType: { loading: false, data: "admin" },
  userData: {
    loading: false,
    data: { name: "rohit" },
  },
  loginAccessToken: { loading: false, loginVerified: true },
  forgotPasswordState: {
    loading: false,
    data: {
      redirectUrl:
        "http://localhost:8080/auth/realms/Tenant1/login-actions/reset-credentials?client_id=security-admin-console",
    },
  },
};

it("render without crashing Login", () => {
  const store = mockStore(storeStates);

  render(
    <BrowserRouter>
      <Provider store={store}>
        <Login />
      </Provider>
    </BrowserRouter>
  );
});

it("should show an error when logicAccessToken error is true", () => {
  const store = mockStore({
    ...storeStates,
    loginAccessToken: { loading: false, loginVerified: false, error: true },
  });
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Login />
      </Provider>
    </BrowserRouter>
  );
});

it("test if input box is present and takes inputs as a admin", () => {
  const store = mockStore(storeStates);

  render(
    <BrowserRouter>
      <Provider store={store}>
        <Login />
      </Provider>
    </BrowserRouter>
  );
  const emailBox = screen.getByTestId("userName-input");
  expect(emailBox).toBeInTheDocument();
  expect(emailBox).toHaveAttribute("type", "text");
  fireEvent.change(emailBox, { target: { value: "tenantadmin" } });
  expect(screen.getByTestId("userName-input")).toHaveValue("tenantadmin");

  const passwordBox = screen.getByTestId("password-input");
  expect(passwordBox).toBeInTheDocument();
  expect(passwordBox).toHaveAttribute("type", "password");
  fireEvent.change(passwordBox, { target: { value: "Akhilpinni@123" } });
  expect(screen.getByTestId("password-input")).toHaveValue("Akhilpinni@123");

  const submitBtn = screen.getByTestId("signin-button");
  fireEvent.click(submitBtn);
});

it("test if input box is present and takes inputs as a tenant", () => {
  let store = mockStore({
    ...storeStates,
    loginType: { loading: false, data: "tenant" },
  });
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Login />
      </Provider>
    </BrowserRouter>
  );
  const emailBox = screen.getByTestId("userName-input");
  fireEvent.change(emailBox, { target: { value: "tenantadmin" } });

  const passwordBox = screen.getByTestId("password-input");
  fireEvent.change(passwordBox, { target: { value: "Akhilpinni@123" } });

  const submitBtn = screen.getByTestId("signin-button");
  fireEvent.click(submitBtn);

  store = mockStore({
    ...storeStates,
    loginType: { loading: false, data: "tenant" },
    userData: { data: { name: "rohit" } },
  });
});
