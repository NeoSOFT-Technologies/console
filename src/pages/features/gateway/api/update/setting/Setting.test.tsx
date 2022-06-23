import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../../store";
import Setting from "./Setting";

it("render without crashing Setting", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Setting />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});

it("render buttons and inputs", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Setting />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const apiIdCopyBtn = screen.getByTestId("apiIdCopy-button");
  expect(apiIdCopyBtn).toBeInTheDocument();
  fireEvent.click(apiIdCopyBtn);

  const apiUrlCopyBtn = screen.getByTestId("apiUrlCopy-button");
  expect(apiUrlCopyBtn).toBeInTheDocument();
  fireEvent.click(apiUrlCopyBtn);

  const isActiveSwitch = screen.getByTestId("isActive-switch");
  expect(isActiveSwitch).toBeInTheDocument();
  fireEvent.change(isActiveSwitch, { target: { checked: true } });
  expect(isActiveSwitch).toBeChecked();
  const Active = screen.getByText("Active");
  expect(Active).toBeVisible();

  const apiNameInput = screen.getByTestId("apiName-input");
  expect(apiNameInput).toBeInTheDocument();
  fireEvent.change(apiNameInput, {
    target: { value: "api1", disabled: false },
  });
  expect(apiNameInput).toHaveValue("api1");
  fireEvent.change(apiNameInput);
  expect(apiNameInput).toBeEnabled();
});

it("check validations", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Setting />
      </Provider>
    </BrowserRouter>
  );
  const nameInput = screen.getByTestId("apiName-input");
  fireEvent.change(nameInput, { target: { value: "123" } });
  const nameErr = screen.getByTestId("nameErr");
  expect(nameErr).toHaveTextContent("Enter a valid Api Name");
});
