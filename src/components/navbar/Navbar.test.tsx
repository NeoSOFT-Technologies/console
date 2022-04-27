import { render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../store";
import Navbar from "./Navbar";
it("render without crashing Navbar", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Navbar />
      </Provider>
    </BrowserRouter>
  );
});
