import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./../../store";
import Login from "./Login";

it("render without crashing Login", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Login />
      </Provider>
    </BrowserRouter>
  );
});

it("test if input box is present", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Login />
      </Provider>
    </BrowserRouter>
  );
  const emailBox = screen.getByTestId("username-input");
  expect(emailBox).toBeInTheDocument();
  expect(emailBox).toHaveAttribute("type", "text");
  // const tenantBox = screen.getByTestId("tenantname-input");
  // expect(tenantBox).toBeInTheDocument();
  // expect(tenantBox).toHaveAttribute("type", "text");

  const passwordBox = screen.getByTestId("password-input");
  expect(passwordBox).toBeInTheDocument();
  expect(passwordBox).toHaveAttribute("type", "password");
});

it("test if input box takes input", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Login />
      </Provider>
    </BrowserRouter>
  );
  const emailBox = screen.getByTestId("username-input");
  fireEvent.change(emailBox, { target: { value: "deepthi" } });
  expect(screen.getByTestId("username-input")).toHaveValue("deepthi");
  // const tenantBox = screen.getByTestId("tenantname-input");
  // fireEvent.change(tenantBox, { target: { value: "deepthi" } });
  // expect(screen.getByTestId("tenantname-input")).toHaveValue("deepthi");

  const passwordBox = screen.getByTestId("password-input");
  fireEvent.change(passwordBox, { target: { value: "akhilpinni123@" } });
  expect(screen.getByTestId("password-input")).toHaveValue("akhilpinni123@");
});

it("test if sign in button renders", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Login />
      </Provider>
    </BrowserRouter>
  );
  const submitBtn = screen.getByTestId("submit-button");
  expect(submitBtn).toBeInTheDocument();
  fireEvent.click(submitBtn);

  const linkBox = screen.getByTestId("link");
  expect(linkBox).toBeInTheDocument();
  fireEvent.click(linkBox);
});
it("test if sign in button renders", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Login />
      </Provider>
    </BrowserRouter>
  );
  // const adminBtn = screen.getByTestId("admin-login");
  // expect(adminBtn).toBeInTheDocument();
  // fireEvent.click(adminBtn);

  // const tenantBtn = screen.getByTestId("tenant-login");
  // expect(tenantBtn).toBeInTheDocument();
  // fireEvent.click(tenantBtn);
  // const userBtn = screen.getByTestId("user-login");
  // expect(userBtn).toBeInTheDocument();
  // fireEvent.click(userBtn);
});
