import { render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../store";
import GlobalLimit from "./GlobalLimit";

it("render without crashing GlobalLimit", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <GlobalLimit isDisabled={true} msg={""} />
      </Provider>
    </BrowserRouter>
  );
});
