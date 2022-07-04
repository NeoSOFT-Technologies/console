import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../store";
import Update from "./Update";

it("render without crashing Update", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Update />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});
