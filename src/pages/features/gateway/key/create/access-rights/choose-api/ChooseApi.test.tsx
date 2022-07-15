import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../../../store";
import ChooseApi from "./ChooseApi";

it("Test render of ChooseApi", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <ChooseApi />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});
