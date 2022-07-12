import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../../../store";
import Authentication from "./Authentication";

it("render without crashing Authentication", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Authentication />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});

it("render buttons and input", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Authentication />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const authType = screen.getByTestId("authType");
  expect(authType).toBeInTheDocument();
  fireEvent.change(authType);

  const mtlsSwitch = screen.getByTestId("enableMtls");
  expect(mtlsSwitch).toBeInTheDocument();
  fireEvent.click(mtlsSwitch);
});
