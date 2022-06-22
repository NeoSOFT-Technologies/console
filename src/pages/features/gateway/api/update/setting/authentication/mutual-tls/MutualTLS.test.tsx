import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../../../../store";
import MutualTLS from "./MutualTLS";

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
