import { render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../store";
import Loader from "./Loader";

it("renders without crashing Loader", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Loader />
      </Provider>
    </BrowserRouter>
  );
});
