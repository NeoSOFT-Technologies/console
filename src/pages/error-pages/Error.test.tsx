import { render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import Error401 from "./Error401";
import Error404 from "./Error404";
import Error500 from "./Error500";
it("render without crashing AdminDashboard", () => {
  render(
    <BrowserRouter>
      <Error401 />
    </BrowserRouter>
  );
});
it("render without crashing AdminDashboard", () => {
  render(
    <BrowserRouter>
      <Error404 />
    </BrowserRouter>
  );
});
it("render without crashing AdminDashboard", () => {
  render(
    <BrowserRouter>
      <Error500 />
    </BrowserRouter>
  );
});
