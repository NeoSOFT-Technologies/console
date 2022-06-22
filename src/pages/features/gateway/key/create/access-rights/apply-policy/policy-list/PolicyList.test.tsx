import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../../../../store";
import PolicyList from "./PolicyList";

it("render without crashing Policylist", async () => {
  await render(
    <BrowserRouter>
      <Provider store={store}>
        <PolicyList />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});

it("render buttons and inputs", async () => {
  await render(
    <BrowserRouter>
      <Provider store={store}>
        <PolicyList />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const applyPolicyHeading = screen.getByText(/apply policy/i);
  expect(applyPolicyHeading).toBeVisible();
});
