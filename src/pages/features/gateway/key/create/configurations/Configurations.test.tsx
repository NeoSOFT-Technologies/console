import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../../store";
import Configurations from "./Configurations";

it("render without crashing Configurations", async () => {
  await render(
    <BrowserRouter>
      <Provider store={store}>
        <Configurations />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});

it("render buttons and inputs", async () => {
  await render(
    <BrowserRouter>
      <Provider store={store}>
        <Configurations />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const settingsHeading = screen.getByText(/settings/i);
  expect(settingsHeading).toBeVisible();

  const nameInput = screen.getByTestId("keyName-input");
  expect(nameInput).toBeInTheDocument();
  fireEvent.change(nameInput, {
    target: { value: "test" },
  });
  expect(screen.getByTestId("keyName-input")).toHaveValue("test");

  const expire = screen.getByTestId("expiry");
  fireEvent.change(expire, { target: { value: "3600" } });
  expect(screen.getByTestId("expiry")).toHaveValue("3600");
  expect(expire).toBeInTheDocument();
});
