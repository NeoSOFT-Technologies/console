import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
// import configureStore from "redux-mock-store";
// import thunk from "redux-thunk";
import store from "../../../../../store";
import CreateKey from "./CreateKey";

it("render without crashing CreateKey", async () => {
  await render(
    <BrowserRouter>
      <Provider store={store}>
        <CreateKey />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});

it("render buttons", async () => {
  await render(
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
});
