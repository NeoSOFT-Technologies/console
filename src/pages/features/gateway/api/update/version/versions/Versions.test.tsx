import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../../../store";
import Versions from "./Versions";

it("render without crashing Versions", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Versions />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});

it("render inputs", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Versions />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const versionSelect = screen.getByTestId("version-select");
  expect(versionSelect).toBeInTheDocument();
  fireEvent.change(versionSelect);

  const versionNameInput = screen.getByTestId("versionName-input");
  expect(versionNameInput).toBeInTheDocument();
  fireEvent.change(versionNameInput, {
    target: { value: "testVersionName" },
  });
  expect(versionNameInput).toHaveValue("testVersionName");
  fireEvent.change(versionNameInput);

  const overrideTargetInput = screen.getByTestId("overrideTarget-input");
  expect(overrideTargetInput).toBeInTheDocument();
  fireEvent.change(overrideTargetInput, {
    target: { value: "https://httpbin.org" },
  });
  expect(overrideTargetInput).toHaveValue("https://httpbin.org");
  fireEvent.change(overrideTargetInput);

  const overRideTargetInput = screen.getByTestId("overRideTarget-input");
  expect(overRideTargetInput).toBeInTheDocument();
  fireEvent.change(overRideTargetInput, {
    target: { value: "https://httpbin.org" },
  });
  expect(overRideTargetInput).toHaveValue("https://httpbin.org");
  fireEvent.change(overRideTargetInput);

  const expiresInput = screen.getByTestId("expires-input");
  expect(expiresInput).toBeInTheDocument();
  fireEvent.change(expiresInput);

  const dateInput = screen.getByTestId("name-input");
  expect(dateInput).toBeInTheDocument();
  fireEvent.change(dateInput);

  const ExpiresInput = screen.getByTestId("Expires-input");
  expect(ExpiresInput).toBeInTheDocument();
  fireEvent.change(ExpiresInput);
});

it("render buttons", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Versions />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const deleteBtn = screen.getByTestId("delete-button");
  expect(deleteBtn).toBeInTheDocument();
  fireEvent.change(deleteBtn);

  const addBtn = screen.getByTestId("add-button");
  expect(addBtn).toBeInTheDocument();
  fireEvent.change(addBtn);
});
