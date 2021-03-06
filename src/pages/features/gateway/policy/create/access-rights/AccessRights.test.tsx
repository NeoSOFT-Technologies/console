import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../../store";
import AccessRights from "./AccessRights";

it("Test render of AccessRights", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <AccessRights />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});
