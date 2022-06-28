import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../../store";
import Version from "./Version";

it("render without crashing Versions", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Version />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});

it("render buttons", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Version />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const versionSwitch = screen.getByTestId("enableVersion-switch");
  expect(versionSwitch).toBeInTheDocument();
  fireEvent.change(versionSwitch);
});
