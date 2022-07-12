import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../store";
import CreateKey from "./CreateKey";

it("Test render of CreateKey", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <CreateKey />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});

it("Test buttons present", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <CreateKey />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const submitBtn = screen.getByTestId("form-input");
  expect(submitBtn).toBeInTheDocument();
  fireEvent.submit(submitBtn);

  const cancelBtn = screen.getByTestId("cancel-input");
  expect(cancelBtn).toBeInTheDocument();
  fireEvent.click(cancelBtn);

  // const copyBtn = screen.getByTestId("copy-input");
  // expect(copyBtn).toBeInTheDocument();
  // fireEvent.click(copyBtn);
});
