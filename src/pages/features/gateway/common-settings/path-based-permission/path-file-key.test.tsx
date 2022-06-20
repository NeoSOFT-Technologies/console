import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
// import configureStore from "redux-mock-store";
// import thunk from "redux-thunk";
import store from "../../../../../store";
import IpathpermissionKey from "./path-file-Key";

it("render without crashing path-file-key", async () => {
  await render(
    <BrowserRouter>
      <Provider store={store}>
        <IpathpermissionKey current="key" />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});

it("render buttons and inputs", async () => {
  await render(
    <BrowserRouter>
      <Provider store={store}>
        <IpathpermissionKey current="key" />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const pathHeader = screen.getByText(/paths :/i);
  expect(pathHeader).toBeVisible();

  const allowedMethodsHeader = screen.getByText(/allowed methods :/i);
  expect(allowedMethodsHeader).toBeVisible();

  const pathInput = screen.getByTestId("path-input");
  expect(pathInput).toBeInTheDocument();
  fireEvent.change(pathInput, { target: { value: "/get" } });
  expect(screen.getByTestId("path-input")).toHaveValue("/get");

  const methodInput = screen.getByTestId("method-input");
  expect(methodInput).toBeInTheDocument();
  fireEvent.change(methodInput, { target: { value: "GET" } });
  expect(screen.getByTestId("method-input")).toHaveValue("GET");

  const addBtn = screen.getByText(/add/i);
  expect(addBtn).toBeInTheDocument();
});
