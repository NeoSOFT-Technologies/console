import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../../../../store";
import ApiAccess from "./ApiAccess";

it("render without crashing ApiAccess", async () => {
  await render(
    <BrowserRouter>
      <Provider store={store}>
        <ApiAccess />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});

it("render buttons and inputs", async () => {
  await render(
    <BrowserRouter>
      <Provider store={store}>
        <ApiAccess />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const apiAccessHeading = screen.getByText(/api access/i);
  expect(apiAccessHeading).toBeVisible();
});
