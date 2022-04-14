import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "../../store/index";
import Error from "./Error";
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
it("render without crashing Error", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Error />
      </Provider>
    </BrowserRouter>
  );
  const BacktohomeBtn = screen.getByTestId("error-input");
  expect(BacktohomeBtn).toBeInTheDocument();
  fireEvent.click(BacktohomeBtn);
});
