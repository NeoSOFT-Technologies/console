import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../../../store";
import AccessList from "./AccessList";

it("render without crashing AccessList", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <AccessList />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});

it("render buttons inputs headers", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <AccessList />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const rateInput = screen.getByText(/add api access rights/i);
  expect(rateInput).toBeVisible();
});
