import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../store";
import GlobalLimit from "./GlobalLimit";

it("render without crashing GlobalRateLimit", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <GlobalLimit isDisabled={true} msg={""} />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});

it("render switches buttons and inputs", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <GlobalLimit isDisabled={true} msg={""} />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const rateSwitch = screen.queryByRole("rate-switch");
  expect(rateSwitch).not.toBeInTheDocument();
});
