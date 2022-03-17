import { render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Provider } from "react-redux";
import store from "../../store";

it("render without crashing Sidebar", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Sidebar />
      </Provider>
    </BrowserRouter>
  );
});
