import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Update from "./Update";
import { store } from "./advanced-options/blacklisted-ips/BlacklistedIPs.test";

it("Test render of UpdateApi", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Update />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});

it("Test buttons present", async () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Update />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const cancelBtn = screen.getByTestId("cancel-input");
  expect(cancelBtn).toBeInTheDocument();
  fireEvent.click(cancelBtn);

  const submitBtn = screen.getByTestId("form-input");
  expect(submitBtn).toBeInTheDocument();
  fireEvent.submit(submitBtn);
});
