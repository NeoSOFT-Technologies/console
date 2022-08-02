import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { componentStore } from "../../mock-store";
import BlacklistedIPs from "./BlacklistedIPs";

const store = componentStore();
it("render without crashing BlackListIPs", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <BlacklistedIPs />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});

it("render switch and inputs", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <BlacklistedIPs />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const blackListSwitch = screen.getByTestId("blacklist-switch");
  expect(blackListSwitch).toBeInTheDocument();
  fireEvent.change(blackListSwitch, { target: { checked: false } });
  expect(blackListSwitch).not.toBeChecked();
  fireEvent.click(blackListSwitch);

  const blackListInput = screen.getByTestId("blacklist-input");
  expect(blackListInput).toBeInTheDocument();
  const testIP = process.env.REACT_APP_IP;
  fireEvent.change(blackListInput, { target: { value: testIP } });
  expect(blackListInput).toHaveValue(testIP);
  fireEvent.change(blackListInput);

  const addIps = screen.getByTestId("add-ips");
  expect(addIps).toBeInTheDocument();
  fireEvent.click(addIps);

  const deleteRow = screen.getByTestId("delete-row");
  expect(deleteRow).toBeInTheDocument();
  fireEvent.click(deleteRow);
});
