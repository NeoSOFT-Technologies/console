import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../store";
import Sidebar from "./Sidebar";

it("render without crashing Sidebar", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Sidebar />
      </Provider>
    </BrowserRouter>
  );
});

it("render nav link button", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Sidebar />
      </Provider>
    </BrowserRouter>
  );

  const navLink = screen.getByTestId("nav-link-button");
  expect(navLink).toBeInTheDocument();
  fireEvent.click(navLink);
});
