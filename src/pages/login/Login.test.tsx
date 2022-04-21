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

it("test if input box is present and takes inputs as a user", () => {
  const store = mockStore({
    ...storeStates,
    loginType: { loading: false, data: "user" },
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

  const tenantNameBox = screen.getByTestId("tenantName-input");
  expect(tenantNameBox).toBeInTheDocument();
  expect(tenantNameBox).toHaveAttribute("type", "text");
  fireEvent.change(tenantNameBox, { target: { value: "tenantadmin" } });
  expect(tenantNameBox).toHaveValue("tenantadmin");

  const submitBtn = screen.getByTestId("signin-button");
  fireEvent.click(submitBtn);
});

it("test if sign-in, keep-signed-in and forgot-password button renders", () => {
  const store = mockStore(storeStates);

  render(
    <BrowserRouter>
      <Provider store={store}>
        <Login />
      </Provider>
    </BrowserRouter>
  );
  const submitBtn = screen.getByTestId("signin-button");
  expect(submitBtn).toBeInTheDocument();
  fireEvent.click(submitBtn);

  const keepSignedInBtn = screen.getByTestId("keep-signed-in");
  expect(keepSignedInBtn).toBeInTheDocument();
  fireEvent.click(keepSignedInBtn);

  const forgotPasswordBtn = screen.getByTestId("forgot-password");
  expect(forgotPasswordBtn).toBeInTheDocument();
  fireEvent.click(forgotPasswordBtn);
});

it("test if login as tenant or user button renders or not", async () => {
  const store = mockStore(storeStates);

  render(
    <BrowserRouter>
      <Provider store={store}>
        <Login />
      </Provider>
    </BrowserRouter>
  );

  const tenantLoginBtn = screen.getByTestId("tenant-login");
  expect(tenantLoginBtn).toBeInTheDocument();
  fireEvent.click(tenantLoginBtn);

  const userLoginBtn = screen.getByTestId("user-login");
  expect(userLoginBtn).toBeInTheDocument();
  fireEvent.click(userLoginBtn);
});

it("test if login as admin button renders or not", async () => {
  const store = mockStore({
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

  const adminLoginBtn = screen.getByTestId("admin-login");
  expect(adminLoginBtn).toBeInTheDocument();
  fireEvent.click(adminLoginBtn);
});
