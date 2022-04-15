import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import store from "../../store/index";
import Error from "./Error";
import Error401 from "./Error401";
import Error404 from "./Error404";
import Error500 from "./Error500";

const mockStore = configureStore([thunk]);
const storeStates = {
  loginType: { loading: false, data: "admin" },
};
it("render without crashing Error401", () => {
  render(
    <BrowserRouter>
      <Error401 />
    </BrowserRouter>
  );
});
it("render without crashing Error404", () => {
  render(
    <BrowserRouter>
      <Error404 />
    </BrowserRouter>
  );
});
it("render without crashing Error500", () => {
  render(
    <BrowserRouter>
      <Error500 />
    </BrowserRouter>
  );
});
it("render without crashing Error", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Error />
      </Provider>
    </BrowserRouter>
  );
  const BacktohomeBtn = screen.getByTestId("error-input");
  expect(BacktohomeBtn).toBeInTheDocument();
  fireEvent.click(BacktohomeBtn);
});

it("render without crashing Errors", () => {
  const stores = mockStore({
    ...storeStates,
    loginType: { loading: false, data: "tenant" },
  });
  render(
    <BrowserRouter>
      <Provider store={stores}>
        <Error />
      </Provider>
    </BrowserRouter>
  );
  const BacktohomeBtn = screen.getByTestId("error-input");
  expect(BacktohomeBtn).toBeInTheDocument();
  fireEvent.click(BacktohomeBtn);
});

it("render without crashing Errors", () => {
  const stores = mockStore({
    ...storeStates,
    loginType: { loading: false, data: "user" },
  });
  render(
    <BrowserRouter>
      <Provider store={stores}>
        <Error />
      </Provider>
    </BrowserRouter>
  );
  const BacktohomeBtn = screen.getByTestId("error-input");
  expect(BacktohomeBtn).toBeInTheDocument();
  fireEvent.click(BacktohomeBtn);
});
it("render without crashing Errors", () => {
  const stores = mockStore({
    ...storeStates,
    loginType: { loading: false, data: "test" },
  });
  render(
    <BrowserRouter>
      <Provider store={stores}>
        <Error />
      </Provider>
    </BrowserRouter>
  );
  const BacktohomeBtn = screen.getByTestId("error-input");
  expect(BacktohomeBtn).toBeInTheDocument();
  fireEvent.click(BacktohomeBtn);
});
