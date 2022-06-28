import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../../../../store";
import Policies from "./Policies";

it("render without crashing Policies", async () => {
  await render(
    <BrowserRouter>
      <Provider store={store}>
        <Policies />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});

it("render buttons and inputs", async () => {
  await render(
    <BrowserRouter>
      <Provider store={store}>
        <Policies />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const policiesHeading = screen.getByText(/policies/i);
  expect(policiesHeading).toBeVisible();
});
