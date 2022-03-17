import { render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import Loader from "./Loader";
import { Provider } from "react-redux";
import store from "../../store";

it("render without crashing Loader", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Loader />
      </Provider>
    </BrowserRouter>
  );
});
