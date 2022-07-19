import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "../../../../../../../../store";
import OpenKeyLess from "./OpenKeyLess";

it("Test render of OpenKeyLess", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <OpenKeyLess />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});
