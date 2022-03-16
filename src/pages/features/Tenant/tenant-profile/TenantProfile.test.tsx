import { render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import TenantProfile from "./TenantProfile";
import { Provider } from "react-redux";
import store from "../../../../store/index";
it("render without crashing AdminDashboard", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <TenantProfile />
      </Provider>
    </BrowserRouter>
  );
});
it("render without crashing AdminDashboard", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <TenantProfile />
      </Provider>
    </BrowserRouter>
  );
});
