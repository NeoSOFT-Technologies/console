import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../../../store";
import ListenPath from "./ListenPath";

it("render without crashing ListenPath", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <ListenPath />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});

it("render inputs", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <ListenPath />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const listenPathInput = screen.getByTestId("listenPath-input");
  expect(listenPathInput).toBeInTheDocument();
  fireEvent.change(listenPathInput, {
    target: { value: "/test/" },
  });
  expect(listenPathInput).toHaveValue("/test/");
  fireEvent.change(listenPathInput);
});

it("render buttons", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <ListenPath />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const stripListenPathSwitch = screen.getByTestId("stripListenPath-switch");
  expect(stripListenPathSwitch).toBeInTheDocument();
  fireEvent.change(stripListenPathSwitch, { target: { checked: true } });
  expect(stripListenPathSwitch).toBeChecked();
  fireEvent.change(stripListenPathSwitch);

  const activatedSwitch = screen.getByTestId("activated-switch");
  expect(activatedSwitch).toBeInTheDocument();
  fireEvent.change(activatedSwitch, { target: { checked: true } });
  expect(activatedSwitch).toBeChecked();
  fireEvent.change(activatedSwitch);
});
