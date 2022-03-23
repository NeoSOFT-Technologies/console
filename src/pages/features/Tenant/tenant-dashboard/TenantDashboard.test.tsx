import { render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../store/index";
import TenantDashboard from "./TenantDashboard";

it("render without crashing TenantDashboard", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <TenantDashboard />
      </Provider>
    </BrowserRouter>
  );
});
