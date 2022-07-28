import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../../../store";
import Versions from "./Versions";

const overrideTargetInputs = "overrideTarget-input";
const overRideTargetInputs = "overRideTarget-input";
const overRideTargetValue = "https://httpbin.org";
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

  const overrideTargetInput = screen.getByTestId(overrideTargetInputs);
  expect(overrideTargetInput).toBeInTheDocument();
  fireEvent.change(overrideTargetInput, {
    target: { value: overRideTargetValue },
  });
  expect(overrideTargetInput).toHaveValue(overRideTargetValue);
  fireEvent.change(overrideTargetInput);

  const overRideTargetInput = screen.getByTestId(overRideTargetInputs);
  expect(overRideTargetInput).toBeInTheDocument();
  fireEvent.change(overRideTargetInput, {
    target: { value: overRideTargetValue },
  });
  expect(overRideTargetInput).toHaveValue(overRideTargetValue);
  fireEvent.change(overRideTargetInput);

  // validation
  const overRide = screen.getByTestId(overRideTargetInputs);
  expect(overRide).toBeInTheDocument();
  fireEvent.change(overRide, {
    target: { value: "" },
  });
  const overRideErr = screen.getByTestId("overRideTargetErr");
  expect(overRideErr).toHaveTextContent("");

  const overRideInput = screen.getByTestId(overRideTargetInputs);
  expect(overRideInput).toBeInTheDocument();
  fireEvent.change(overRideInput, {
    target: { value: "test" },
  });
  const overRideError = screen.getByTestId("overRideTargetErr");
  expect(overRideError).toHaveTextContent("Enter a valid Override Target Host");
  // end

  const expiresInput = screen.getByTestId("expires-input");
  expect(expiresInput).toBeInTheDocument();
  fireEvent.change(expiresInput);

  const nameInput = screen.getByTestId("name-input");
  expect(nameInput).toBeInTheDocument();
  fireEvent.change(nameInput, {
    target: { value: "name" },
  });
  expect(nameInput).toHaveValue("name");
  fireEvent.change(nameInput);

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
  fireEvent.click(deleteBtn);

  const addBtn = screen.getByTestId("add-button");
  expect(addBtn).toBeInTheDocument();
  fireEvent.click(addBtn);
});

it("check validations", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Versions />
      </Provider>
    </BrowserRouter>
  );
  const overrideTargetInput = screen.getByTestId(overrideTargetInputs);
  fireEvent.change(overrideTargetInput, { target: { value: "test" } });
  const overrideTargetErr = screen.getByTestId("overrideTargetErr");
  expect(overrideTargetErr).toHaveTextContent(
    "Enter a valid Override Target Host"
  );

  const overridetargetInput = screen.getByTestId(overrideTargetInputs);
  fireEvent.change(overridetargetInput, { target: { value: "" } });
  const overridetargetErr = screen.getByTestId("overrideTargetErr");
  expect(overridetargetErr).toHaveTextContent("");
});
