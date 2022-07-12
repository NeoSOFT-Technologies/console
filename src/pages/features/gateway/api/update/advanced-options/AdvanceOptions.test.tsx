import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../../store";
import AdvancedOptions from "./AdvancedOptions";

it("Test render of AdvanceOptions", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <AdvancedOptions />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});
