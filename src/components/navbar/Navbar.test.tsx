import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../store";
import Navbar from "./Navbar";
it("render without crashing Navbar", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Navbar />
      </Provider>
    </BrowserRouter>
  );
});

it("render toggle-button, navigate-button, toggle-off buttons", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Navbar />
      </Provider>
    </BrowserRouter>
  );
  const toggleBtn = screen.getByTestId("toggle-button");
  expect(toggleBtn).toBeInTheDocument();
  fireEvent.click(toggleBtn);

  const navigateBtn = screen.getByTestId("navigate-button");
  expect(navigateBtn).toBeInTheDocument();
  fireEvent.click(navigateBtn);

  const toggleOffBtn = screen.getByTestId("toggleOff-button");
  expect(toggleOffBtn).toBeInTheDocument();
  fireEvent.click(toggleOffBtn);
});

it("render dropdown menu", async () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Navbar />
      </Provider>
    </BrowserRouter>
  );
  const dropdownToggleBtn = screen.getByTestId("dropdown-toggle");
  await waitFor(() => {
    expect(dropdownToggleBtn).toBeInTheDocument();
    fireEvent.click(dropdownToggleBtn);
  });

  const eventTodayBtn = screen.getByTestId("event-today");
  await waitFor(() => {
    expect(eventTodayBtn).toBeInTheDocument();
    fireEvent.click(eventTodayBtn);
  });

  const settingsBtn = screen.getByTestId("settings");
  await waitFor(() => {
    expect(settingsBtn).toBeInTheDocument();
    fireEvent.click(settingsBtn);
  });

  const launchAdminBtn = screen.getByTestId("launch-admin");
  await waitFor(() => {
    expect(launchAdminBtn).toBeInTheDocument();
    fireEvent.click(launchAdminBtn);
  });
});
