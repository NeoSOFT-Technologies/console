import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../../../../store";
import AuthenticationToken from "./AuthenticationToken";

it("render without crashing Authentication Token", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <AuthenticationToken />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});

it("render buttons and inputs", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <AuthenticationToken />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
  expect(screen.getByText(/authentication token/i)).toBeVisible();
  expect(screen.getByText(/auth key header name/i)).toBeVisible();
});
