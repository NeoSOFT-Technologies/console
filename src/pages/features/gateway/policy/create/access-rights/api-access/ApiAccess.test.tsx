import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../../../store";
import ApiAccess from "./ApiAccess";

it("Test render of ApiAccess", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <ApiAccess />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});
