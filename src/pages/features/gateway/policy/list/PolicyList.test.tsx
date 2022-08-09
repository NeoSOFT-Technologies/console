import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../store/index";
import PolicyList from "./PolicyList";

it("check buttons and inputs", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <PolicyList />
      </Provider>
    </BrowserRouter>
  );
  const policyListHeading = screen.getByText("POLICY LIST");
  expect(policyListHeading).toBeInTheDocument();
});
