import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../store";
import CreateApi from "./CreateApi";

it("render without crashing CreateApi", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <CreateApi />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});

it("test buttons and inputs present", async () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <CreateApi />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const cancelBtn = screen.getByTestId("cancel-input");
  expect(cancelBtn).toBeInTheDocument();
  fireEvent.click(cancelBtn);

  const submitBtn = screen.getByTestId("form-input");
  expect(submitBtn).toBeInTheDocument();
  fireEvent.submit(submitBtn);

  const nameInput = screen.getByTestId("name-input");
  fireEvent.change(nameInput, { target: { value: "api1" } });
  expect(screen.getByTestId("name-input")).toHaveValue("api1");

  const listenPathInput = screen.getByTestId("listenPath-input");
  fireEvent.change(listenPathInput, { target: { value: "/api1/" } });
  expect(screen.getByTestId("listenPath-input")).toHaveValue("/api1/");

  const targetUrlInput = screen.getByTestId("targetUrl-input");
  fireEvent.change(targetUrlInput, {
    target: { value: "https://httpbin.org" },
  });
  expect(screen.getByTestId("targetUrl-input")).toHaveValue(
    "https://httpbin.org"
  );

  const activeBtn = screen.getByTestId("isActive-input");
  expect(activeBtn).toBeInTheDocument();
  fireEvent.change(listenPathInput, { target: { checked: true } });
  const Active = screen.getByText("Active");
  expect(Active).toBeVisible();
});

it("check validations", async () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <CreateApi />
      </Provider>
    </BrowserRouter>
  );
  const nameInput = await screen.getByTestId("name-input");
  fireEvent.change(nameInput, { target: { value: "123" } });
  const nameErr = screen.getByTestId("nameErr");
  expect(nameErr).toHaveTextContent("Enter valid Api Name eg: abcd or Abcd1");

  const listenPathInput = await screen.getByTestId("listenPath-input");
  fireEvent.change(listenPathInput, { target: { value: "test" } });
  const listenPathErr = screen.getByTestId("listenPathErr");
  expect(listenPathErr).toHaveTextContent(
    "Enter a Valid Listen Path eg: /abc/"
  );

  const targetUrlInput = await screen.getByTestId("targetUrl-input");
  fireEvent.change(targetUrlInput, { target: { value: "https:wrongUrl" } });
  const targetUrlErr = screen.getByTestId("targetUrlErr");
  expect(targetUrlErr).toHaveTextContent("Enter a Valid url");
});
