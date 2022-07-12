import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../store";
import Dashboard from "./Dashboard";

it("render without crashing- Dashboard", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Dashboard />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});
