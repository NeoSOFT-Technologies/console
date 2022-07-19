import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../store";
import { IPolicyCreateState } from "../../../../../store/features/gateway/policy/create";
import {
  setForm,
  setFormError,
} from "../../../../../store/features/gateway/policy/create/slice";
import GlobalRateLimit from "./GlobalRateLimit";
import { IPropsHelper } from "./rate-limit-helper";
const state: IPolicyCreateState = {
  data: {
    form: {
      Name: "",
      Active: true,
      KeysInactive: true,
      Quota: 10,
      QuotaRenewalRate: 3600,
      Rate: 10,
      Per: 10,
      ThrottleInterval: 10,
      ThrottleRetries: 10,
      State: "active",
      KeyExpiresIn: 10,
      Tags: [],
      APIs: [],
      Partitions: {
        quota: false,
        rate_limit: false,
        complexity: false,
        acl: false,
        per_api: true,
      },
    },
    errors: {
      Name: "",
      Policies: "",
      GlobalLimit: {
        ApiId: "",
        ApiName: "",
        Per: "",
        Rate: "",
        Quota: "",
        Expires: "",
        QuotaRenewalRate: "",
        ThrottleInterval: "",
        ThrottleRetries: "",
      },
      PerApiLimit: [],
    },
  },
  loading: false,
  error: undefined,
};
const requiredParameters: IPropsHelper = {
  state,
  form: state.data.form!,
  formProp: state.data.form.APIs!,
  errors: state.data.errors!,
  errorProp: state.data.errors?.PerApiLimit!,
  setForm,
  setFormError,
  propName: "APIs",
  current: "policy",
};
it("render without crashing GlobalRateLimit", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <GlobalRateLimit current={"policy"} helper={requiredParameters} />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});

it("render inputs and check if they are taking input", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <GlobalRateLimit current={"policy"} helper={requiredParameters} />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const rateInput = screen.getByTestId("rate-input");
  fireEvent.change(rateInput, { target: { value: "10" } });
  expect(screen.getByTestId("rate-input")).toHaveValue("10");
  expect(rateInput).toBeInTheDocument();

  const perInput = screen.getByTestId("per-input");
  fireEvent.change(perInput, { target: { value: "10" } });
  expect(screen.getByTestId("per-input")).toHaveValue("10");
  expect(perInput).toBeInTheDocument();

  const retryInput = screen.getByTestId("retry-input");
  fireEvent.change(retryInput, { target: { value: "10" } });
  expect(screen.getByTestId("retry-input")).toHaveValue("10");
  expect(retryInput).toBeInTheDocument();

  const intervalInput = screen.getByTestId("interval-input");
  fireEvent.change(intervalInput, { target: { value: "10" } });
  expect(screen.getByTestId("interval-input")).toHaveValue("10");
  expect(intervalInput).toBeInTheDocument();

  const quotaPerInput = screen.getByTestId("quotaPer-input");
  fireEvent.change(quotaPerInput, { target: { value: "10" } });
  expect(screen.getByTestId("quotaPer-input")).toHaveValue("10");
  expect(quotaPerInput).toBeInTheDocument();
});

it("render buttons", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <GlobalRateLimit current={"policy"} helper={requiredParameters} />
      </Provider>
    </BrowserRouter>
  );

  expect(screen).toBeDefined();

  const rateSwitch = screen.getByTestId("rate-switch");
  expect(rateSwitch).toBeInTheDocument();
  fireEvent.change(rateSwitch, { target: { checked: true } });
  expect(rateSwitch).toBeChecked();
  fireEvent.change(rateSwitch);

  const throttleSwitch = screen.getByTestId("throttle-switch");
  expect(throttleSwitch).toBeInTheDocument();
  fireEvent.change(throttleSwitch, { target: { checked: true } });
  expect(throttleSwitch).toBeChecked();
  fireEvent.change(throttleSwitch);

  const quotaSwitch = screen.getByTestId("quota-switch");
  expect(quotaSwitch).toBeInTheDocument();
  fireEvent.change(quotaSwitch, { target: { checked: true } });
  expect(quotaSwitch).toBeChecked();
  fireEvent.change(quotaSwitch);
});
