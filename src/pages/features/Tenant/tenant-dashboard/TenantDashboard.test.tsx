import { render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import TenantDashboard from "./TenantDashboard";
import { Provider } from "react-redux";
import store from "../../../../store/index";

it("render without crashing TenantDashboard", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <TenantDashboard />
      </Provider>
    </BrowserRouter>
  );
});
