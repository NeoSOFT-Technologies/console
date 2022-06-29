import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../../../store";
import VersionSettings from "./VersionSettings";

it("render without crashing Version Settings", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <VersionSettings />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});

it("render buttons and inputs", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <VersionSettings />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const versionLocationSelect = screen.getByTestId("versionLocation-select");
  expect(versionLocationSelect).toBeInTheDocument();
  fireEvent.change(versionLocationSelect);

  const keyNameInput = screen.getByTestId("versionKeyName-input");
  expect(keyNameInput).toBeInTheDocument();
  fireEvent.change(keyNameInput, {
    target: { value: "testkeyname" },
  });
  expect(keyNameInput).toHaveValue("testkeyname");
  fireEvent.change(keyNameInput);
});
