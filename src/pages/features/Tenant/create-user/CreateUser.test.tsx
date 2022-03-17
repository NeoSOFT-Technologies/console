import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import CreateUser from "./CreateUser";
import { Provider } from "react-redux";
import store from "../../../../store/index";

it("render without crashing CreateUser", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <CreateUser />
      </Provider>
    </BrowserRouter>
  );
});

it("test if input box is present", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <CreateUser />
      </Provider>
    </BrowserRouter>
  );
  const usernameBox = screen.getByTestId("username-input");
  expect(usernameBox).toBeInTheDocument();
  expect(usernameBox).toHaveAttribute("type", "text");

  const emailBox = screen.getByTestId("email-input");
  expect(emailBox).toBeInTheDocument();
  expect(emailBox).toHaveAttribute("type", "text");

  const passwordBox = screen.getByTestId("password-input");
  expect(passwordBox).toBeInTheDocument();
  expect(passwordBox).toHaveAttribute("type", "text");

  const tnameBox = screen.getByTestId("tenantname-input");
  expect(tnameBox).toBeInTheDocument();
  expect(tnameBox).toHaveAttribute("type", "text");
});

it("test if input box takes input", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <CreateUser />
      </Provider>
    </BrowserRouter>
  );
  const usernameBox = screen.getByTestId("username-input");
  fireEvent.change(usernameBox, { target: { value: "akhilpinni" } });
  expect(screen.getByTestId("username-input")).toHaveValue("akhilpinni");

  const emailBox = screen.getByTestId("email-input");
  fireEvent.change(emailBox, { target: { value: "akhilpinni123@gmail.com" } });
  expect(screen.getByTestId("email-input")).toHaveValue(
    "akhilpinni123@gmail.com"
  );

  const passwordBox = screen.getByTestId("password-input");
  fireEvent.change(passwordBox, { target: { value: "akhilpinni123@" } });
  expect(screen.getByTestId("password-input")).toHaveValue("akhilpinni123@");

  const tnameBox = screen.getByTestId("tenantname-input");
  fireEvent.change(tnameBox, { target: { value: "akhilpinni" } });
  expect(screen.getByTestId("tenantname-input")).toHaveValue("akhilpinni");
});

it("if submit and cancel buttons renders", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <CreateUser />
      </Provider>
    </BrowserRouter>
  );
  const submitBtn = screen.getByTestId("submit-button");
  expect(submitBtn).toBeInTheDocument();
  fireEvent.click(submitBtn);

  const cancelBtn = screen.getByTestId("cancel-button");
  expect(cancelBtn).toBeInTheDocument();
  fireEvent.click(cancelBtn);
});
