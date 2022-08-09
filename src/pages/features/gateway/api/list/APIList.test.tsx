import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../store/index";
import APIList from "./APIList";

it("check buttons and inputs", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <APIList />
      </Provider>
    </BrowserRouter>
  );
  const apiListHeading = screen.getByText("API LIST");
  expect(apiListHeading).toBeInTheDocument();
});
