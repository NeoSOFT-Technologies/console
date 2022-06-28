import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../../../store";
import RateLimit from "./RateLimit";

it("render without crashing RateLimit", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <RateLimit />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});

it("render switches", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <RateLimit />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const rateSwitch = screen.getByTestId("disableRate-switch");
  expect(rateSwitch).toBeInTheDocument();
  fireEvent.change(rateSwitch, { target: { checked: true } });
  expect(rateSwitch).toBeChecked();
  fireEvent.change(rateSwitch);

  const quotaSwitch = screen.getByTestId("disableQuota-switch");
  expect(quotaSwitch).toBeInTheDocument();
  fireEvent.change(quotaSwitch, { target: { checked: true } });
  expect(quotaSwitch).toBeChecked();
  fireEvent.change(quotaSwitch);
});

it("render inputs", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <RateLimit />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const rateInput = screen.getByTestId("rate-input");
  expect(rateInput).toBeInTheDocument();
  fireEvent.change(rateInput, {
    target: { value: "10", disabled: true },
  });
  expect(rateInput).toHaveValue("10");
  fireEvent.change(rateInput);
  expect(rateInput).toBeDisabled();

  const perInput = screen.getByTestId("per-input");
  expect(perInput).toBeInTheDocument();
  fireEvent.change(perInput, {
    target: { value: "20", disabled: true },
  });
  expect(perInput).toHaveValue("20");
  fireEvent.change(perInput);
  expect(perInput).toBeDisabled();
});
