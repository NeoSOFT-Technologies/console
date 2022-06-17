import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../../../store";
import TargetUrl from "./TargetUrl";

it("render without crashing TargetUrl", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <TargetUrl />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});

it("render buttons and inputs", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <TargetUrl />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const targetUrlInput = screen.getByTestId("targetUrl-input");
  expect(targetUrlInput).toBeInTheDocument();
  fireEvent.change(targetUrlInput, {
    target: { value: "https://httpbin.org", disabled: false },
  });
  expect(targetUrlInput).toHaveValue("https://httpbin.org");
  fireEvent.change(targetUrlInput);
  expect(targetUrlInput).toBeEnabled();

  const roudRobinSwitch = screen.getByTestId("roundRobin-switch");
  expect(roudRobinSwitch).toBeInTheDocument();
  fireEvent.change(roudRobinSwitch, { target: { checked: true } });
  expect(roudRobinSwitch).toBeChecked();
  fireEvent.change(roudRobinSwitch);

  const isServiceSwitch = screen.getByTestId("isService-switch");
  expect(isServiceSwitch).toBeInTheDocument();
  fireEvent.change(isServiceSwitch, { target: { checked: true } });
  expect(isServiceSwitch).toBeChecked();
  fireEvent.change(isServiceSwitch);
});
