import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { componentStore } from "../../../mock-store";
import MutualTLS from "./MutualTLS";

const store = componentStore("mutualTls");
it("render without crashing Mutual TLS", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <MutualTLS />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});

it("test buttons and inputs", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <MutualTLS />
      </Provider>
    </BrowserRouter>
  );

  const handlePlusBtn = screen.getByTestId("handlePlus-button");
  expect(handlePlusBtn).toBeInTheDocument();
  fireEvent.click(handlePlusBtn);

  const handledropLeftBtn = screen.getByTestId("handleDropLeft-table");
  expect(handledropLeftBtn).toBeInTheDocument();
  fireEvent.click(handledropLeftBtn);
});
