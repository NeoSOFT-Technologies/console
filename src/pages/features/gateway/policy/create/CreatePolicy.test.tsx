import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../store";
import CreatePolicy from "./CreatePolicy";

it("render without crashing CreatePolicy", async () => {
  await render(
    <BrowserRouter>
      <Provider store={store}>
        <CreatePolicy />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});
