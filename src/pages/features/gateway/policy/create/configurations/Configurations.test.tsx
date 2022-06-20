import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../../store";
import Configurations from "./Configurations";

it("render without crashing Configurations", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Configurations />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});

it("render buttons and input", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Configurations />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const policyHeader = screen.getByText(/policy name/i);
  expect(policyHeader).toBeVisible();

  const settingHeader = screen.getByText(/settings/i);
  expect(settingHeader).toBeVisible();

  const policyStatusHeader = screen.getByText(/policy status :/i);
  expect(policyStatusHeader).toBeVisible();

  const keyHeader = screen.getByText(/key expires after :/i);
  expect(keyHeader).toBeVisible();

  const nameInput = screen.getByTestId("name-input");
  fireEvent.change(nameInput, { target: { value: "policy1" } });
  expect(screen.getByTestId("name-input")).toHaveValue("policy1");
  expect(nameInput).toBeInTheDocument();

  const state = screen.getByTestId("state");
  fireEvent.change(state, { target: { value: "active" } });
  expect(screen.getByTestId("state")).toHaveValue("active");
  expect(nameInput).toBeInTheDocument();

  const keyExpire = screen.getByTestId("keyExpire");
  fireEvent.change(keyExpire, { target: { value: "3600" } });
  expect(screen.getByTestId("keyExpire")).toHaveValue("3600");
  expect(nameInput).toBeInTheDocument();
});
