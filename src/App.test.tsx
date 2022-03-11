import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import App from "./App";

test("renders learn react link", () => {
  const { container } = render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
  container.querySelector(".landing");
  expect(container.firstChild).toMatchSnapshot();
});
