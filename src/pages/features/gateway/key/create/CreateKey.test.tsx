import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../store";
import CreateKey from "./CreateKey";

it("Test render of CreateKey", async () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <CreateKey />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});
