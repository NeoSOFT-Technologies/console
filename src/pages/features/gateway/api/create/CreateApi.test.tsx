import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../store";
import CreateApi from "./CreateApi";

const name_Input = "name-input";
const listen_Path_Input = "listenPath-input";
const target_Url_Input = "targetUrl-input";
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

  const nameInput = screen.getByTestId(name_Input);
  fireEvent.change(nameInput, { target: { value: "api1" } });
  expect(screen.getByTestId(name_Input)).toHaveValue("api1");

  const listenPathInput = screen.getByTestId(listen_Path_Input);
  fireEvent.change(listenPathInput, { target: { value: "/api1/" } });
  expect(screen.getByTestId(listen_Path_Input)).toHaveValue("/api1/");

  const targetUrlInput = screen.getByTestId(target_Url_Input);
  fireEvent.change(targetUrlInput, {
    target: { value: "https://httpbin.org" },
  });
  expect(screen.getByTestId(target_Url_Input)).toHaveValue(
    "https://httpbin.org"
  );

  const activeBtn = screen.getByTestId("isActive-input");
  expect(activeBtn).toBeInTheDocument();
  fireEvent.change(activeBtn, { target: { checked: true } });
  const Active = screen.getByText("Active");
  expect(Active).toBeVisible();
  fireEvent.click(activeBtn);
});

it("check validations", async () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <CreateApi />
      </Provider>
    </BrowserRouter>
  );
  const nameInput = screen.getByTestId(name_Input);
  fireEvent.change(nameInput, { target: { value: "123" } });
  const nameErr = screen.getByTestId("nameErr");
  expect(nameErr).toHaveTextContent("Enter valid Api Name eg: abcd or Abcd1");

  const listenPathInput = screen.getByTestId(listen_Path_Input);
  fireEvent.change(listenPathInput, { target: { value: "test" } });
  const listenPathErr = screen.getByTestId("listenPathErr");
  expect(listenPathErr).toHaveTextContent(
    "Enter a Valid Listen Path eg: /abc/"
  );

  const targetUrlInput = await screen.getByTestId(target_Url_Input);
  fireEvent.change(targetUrlInput, { target: { value: "https:wrongUrl" } });
  const targetUrlErr = screen.getByTestId("targetUrlErr");
  expect(targetUrlErr).toHaveTextContent("Enter a Valid url");
});
