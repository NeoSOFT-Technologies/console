import { render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import Error401 from "./Error401";
import Error404 from "./Error404";
import Error500 from "./Error500";
it("render without crashing Error401", () => {
  render(
    <BrowserRouter>
      <Error401 />
    </BrowserRouter>
  );
});
it("render without crashing Error404", () => {
  render(
    <BrowserRouter>
      <Error404 />
    </BrowserRouter>
  );
});
it("render without crashing Error500", () => {
  render(
    <BrowserRouter>
      <Error500 />
    </BrowserRouter>
  );
});
