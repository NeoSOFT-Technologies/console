import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../../../store";
import CorsOptions from "./CorsOptions";

it("render without crashing CorsOptions", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <CorsOptions />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});

it("render inputs, buttons and switch", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <CorsOptions />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const enableCorsSwitch = screen.getByTestId("enableCors-switch");
  expect(enableCorsSwitch).toBeInTheDocument();
  fireEvent.change(enableCorsSwitch, { target: { checked: true } });
  expect(enableCorsSwitch).toBeChecked();
  fireEvent.click(enableCorsSwitch);

  const allowCredSwitch = screen.getByTestId("allowCred-switch");
  expect(allowCredSwitch).toBeInTheDocument();
  fireEvent.change(allowCredSwitch, { target: { checked: true } });
  expect(allowCredSwitch).toBeChecked();
  fireEvent.click(allowCredSwitch);

  const optionPassSwitch = screen.getByTestId("optionPass-switch");
  expect(optionPassSwitch).toBeInTheDocument();
  fireEvent.change(optionPassSwitch, { target: { checked: true } });
  expect(optionPassSwitch).toBeChecked();
  fireEvent.click(optionPassSwitch);

  const maxAgeInput = screen.getByTestId("maxAge-input");
  expect(maxAgeInput).toBeInTheDocument();
  fireEvent.change(maxAgeInput, { target: { value: 5 } });
  expect(maxAgeInput).toHaveValue(5);
  fireEvent.change(maxAgeInput);

  const allowedOriginInput = screen.getByTestId("allowedOrigin-input");
  expect(allowedOriginInput).toBeInTheDocument();
  fireEvent.change(allowedOriginInput, {
    target: { value: "https://httpbin.org" },
  });
  expect(allowedOriginInput).toHaveValue("https://httpbin.org");
  fireEvent.change(allowedOriginInput);

  const addBtn = screen.getByTestId("add-allowedOrigin");
  expect(addBtn).toBeInTheDocument();
  fireEvent.click(addBtn);

  const deleteBtn = screen.getByTestId("delete-allowedOrigin");
  expect(deleteBtn).toBeInTheDocument();
  fireEvent.click(deleteBtn);

  const allowedMethodsDropDown = screen.getByTestId("allowedMethods-dropdown");
  expect(allowedMethodsDropDown).toBeInTheDocument();
  fireEvent.click(allowedMethodsDropDown);

  const allowedMethodsAdBtn = screen.getByTestId("allowedMethods-add");
  expect(allowedMethodsAdBtn).toBeInTheDocument();
  fireEvent.click(allowedMethodsAdBtn);

  const allowedMethodsDeleteBtn = screen.getByTestId("delete-allowedMethods");
  expect(allowedMethodsDeleteBtn).toBeInTheDocument();
  fireEvent.click(allowedMethodsDeleteBtn);

  const allowedHeadersInput = screen.getByTestId("allowedHeaders-input");
  expect(allowedHeadersInput).toBeInTheDocument();
  fireEvent.change(allowedHeadersInput, {
    target: { value: "test-header" },
  });
  expect(allowedHeadersInput).toHaveValue("test-header");
  fireEvent.change(allowedHeadersInput);

  const allowedHeadersAddBtn = screen.getByTestId("allowedHeaders-add");
  expect(allowedHeadersAddBtn).toBeInTheDocument();
  fireEvent.click(allowedHeadersAddBtn);

  const allowedHeadersdeleteBtn = screen.getByTestId("allowedHeaders-delete");
  expect(allowedHeadersdeleteBtn).toBeInTheDocument();
  fireEvent.click(allowedHeadersdeleteBtn);

  const exposeHeadersInput = screen.getByTestId("exposeHeaders-input");
  expect(exposeHeadersInput).toBeInTheDocument();
  fireEvent.change(exposeHeadersInput, {
    target: { value: "test-exposeHeader" },
  });
  expect(exposeHeadersInput).toHaveValue("test-exposeHeader");
  fireEvent.change(exposeHeadersInput);

  const exposeHeadersAddBtn = screen.getByTestId("exposeHeaders-add");
  expect(exposeHeadersAddBtn).toBeInTheDocument();
  fireEvent.click(exposeHeadersAddBtn);

  const exposeHeadersdeleteBtn = screen.getByTestId("exposeHeaders-delete");
  expect(exposeHeadersdeleteBtn).toBeInTheDocument();
  fireEvent.click(exposeHeadersdeleteBtn);
});

it("check validations", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <CorsOptions />
      </Provider>
    </BrowserRouter>
  );
  const allowedOriginInput = screen.getByTestId("allowedOrigin-input");
  fireEvent.change(allowedOriginInput, {
    target: { value: "https://httpbin.org" },
  });
  const allowedOriginErr = screen.getByTestId("allowedOriginErr");
  expect(allowedOriginErr).toHaveTextContent("");

  const allowedoriginInput = screen.getByTestId("allowedOrigin-input");
  fireEvent.change(allowedoriginInput, {
    target: { value: "wrongUrl" },
  });
  const allowedoriginErr = screen.getByTestId("allowedOriginErr");
  expect(allowedoriginErr).toHaveTextContent(
    "Please enter a Valid URL value(i.e. http://)"
  );
});
