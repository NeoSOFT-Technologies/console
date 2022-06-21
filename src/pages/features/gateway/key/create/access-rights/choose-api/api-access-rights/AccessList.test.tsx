import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../../../../store";
import AccessList from "./AccessList";

it("render without crashing AccessList", async () => {
  await render(
    <BrowserRouter>
      <Provider store={store}>
        <AccessList />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});

it("render buttons and inputs", async () => {
  await render(
    <BrowserRouter>
      <Provider store={store}>
        <AccessList />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const apiAccessHeading = screen.getByText(/add api access rights/i);
  expect(apiAccessHeading).toBeVisible();

  const accessList = screen.getByTestId("accesslist");
  expect(accessList).toBeInTheDocument();
});
