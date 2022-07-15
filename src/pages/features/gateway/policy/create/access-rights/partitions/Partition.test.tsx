import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../../../store";
import Partitions from "./Partitions";

it("render without crashing Partitions", async () => {
  await render(
    <BrowserRouter>
      <Provider store={store}>
        <Partitions />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});

it("render buttons and inputs", async () => {
  await render(
    <BrowserRouter>
      <Provider store={store}>
        <Partitions />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const enforceAccess = screen.getByTestId("enforce-access-rights");
  expect(enforceAccess).toBeInTheDocument();
  fireEvent.click(enforceAccess);

  const enforceUsage = screen.getByTestId("enforce-usage-quota");
  expect(enforceUsage).toBeInTheDocument();
  fireEvent.click(enforceUsage);

  const enforceRate = screen.getByTestId("enforce-rate-limit");
  expect(enforceRate).toBeInTheDocument();
  fireEvent.click(enforceRate);
});
