import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../blacklisted-ips/BlacklistedIPs.test";
import WhitelistedIPs from "./WhitelistedIPs";

it("render without crashing WhiteListIPs", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <WhitelistedIPs />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});

it("render buttons and inputs", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <WhitelistedIPs />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const whiteListSwitch = screen.getByTestId("whitelist-switch");
  expect(whiteListSwitch).toBeInTheDocument();
  fireEvent.change(whiteListSwitch, { target: { checked: false } });
  expect(whiteListSwitch).not.toBeChecked();
  fireEvent.click(whiteListSwitch);

  const whiteListInput = screen.getByTestId("whitelist-input");
  expect(whiteListInput).toBeInTheDocument();
  const testIP = process.env.REACT_APP_IP;
  fireEvent.change(whiteListInput, { target: { value: testIP } });
  expect(whiteListInput).toHaveValue(testIP);
  fireEvent.change(whiteListInput);

  const addIps = screen.getByTestId("add-ips");
  expect(addIps).toBeInTheDocument();
  fireEvent.click(addIps);

  const deleteRows = screen.getByTestId("delete-rows");
  expect(deleteRows).toBeInTheDocument();
  fireEvent.click(deleteRows);
});

it("check validations", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <WhitelistedIPs />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const whitelistInput = screen.getByTestId("whitelist-input");
  expect(whitelistInput).toBeInTheDocument();
  fireEvent.change(whitelistInput, { target: { value: "" } });
  expect(whitelistInput).toHaveValue("");
  const whitelistErr = screen.getByTestId("whiteListErr");
  expect(whitelistErr).toHaveTextContent("");
});
