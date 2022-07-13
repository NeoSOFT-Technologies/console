import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../../../../store";
import Policies from "./Policies";

it("Test render of Policies", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Policies />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});
