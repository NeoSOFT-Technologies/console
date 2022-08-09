import { screen, render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../store/index";
import KeyList from "./KeyList";

it("check buttons and inputs", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <KeyList />
      </Provider>
    </BrowserRouter>
  );
  const keyListHeading = screen.getByText("KEY LIST");
  expect(keyListHeading).toBeInTheDocument();
});
