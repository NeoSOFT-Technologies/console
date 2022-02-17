import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import Login from "../app/user-pages/Login";
import { Provider } from "react-redux";
import store from "../app/redux/store/store";

it("renders without crashing", () => {
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
  const inputBox = screen.getByTestId("email-input");
  expect(inputBox).toBeDefined();
  expect(inputBox).toHaveAttribute("type", "email");
  const passwordbox = screen.getByTestId("password-input");
  expect(passwordbox).toBeDefined();
  expect(passwordbox).toHaveAttribute("type", "password");
});

it("test if input-box take input", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Login />
      </Provider>
    </BrowserRouter>
  );
  const inputBox = screen.getByTestId("email-input");
  fireEvent.change(inputBox, { target: { value: "rahul768@gmail.com" } });
  expect(screen.getByTestId("email-input")).toHaveValue("rahul768@gmail.com");
  const passwordbox = screen.getByTestId("password-input");
  fireEvent.change(passwordbox, { target: { value: "rahul768" } });
  expect(screen.getByTestId("password-input")).toHaveValue("rahul768");
});
