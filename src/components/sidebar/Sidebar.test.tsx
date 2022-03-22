import { render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../store";
import Sidebar from "./Sidebar";

it("render without crashing Sidebar", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Sidebar />
      </Provider>
    </BrowserRouter>
  );
});
