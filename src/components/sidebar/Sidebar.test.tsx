import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Sidebar from "./Sidebar";
const mockStore = configureStore([thunk]);
const storeStates = {
  userData: {
    data: { username: "", createdTimestamp: "", count: 1, roles: [""] },
  },
};
it("render without crashing Sidebar", () => {
  const store = mockStore({
    ...storeStates,
    loginType: {
      loading: true,
      data: undefined,
    },
  });
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Sidebar />
      </Provider>
    </BrowserRouter>
  );
});

it("render without crashing Sidebar", () => {
  const store = mockStore({
    ...storeStates,
    loginType: {
      loading: false,
      data: "admin",
    },
  });
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Sidebar />
      </Provider>
    </BrowserRouter>
  );
});

it("render without crashing Sidebar", () => {
  const store = mockStore({
    ...storeStates,
    loginType: {
      loading: false,
      data: "tenant",
    },
  });
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Sidebar />
      </Provider>
    </BrowserRouter>
  );
});

it("render without crashing Sidebar", () => {
  const store = mockStore({
    ...storeStates,
    loginType: {
      loading: false,
      data: "user",
    },
  });
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Sidebar />
      </Provider>
    </BrowserRouter>
  );
});

it("render without crashing Sidebar", () => {
  const store = mockStore({
    ...storeStates,
    loginType: {
      loading: true,
      data: undefined,
    },
  });
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Sidebar />
      </Provider>
    </BrowserRouter>
  );

  const navLinkBtn = screen.getByTestId("nav-link-button");
  expect(navLinkBtn).toBeInTheDocument();
  fireEvent.click(navLinkBtn);

  const homeBtn = screen.getByTestId("home");
  expect(homeBtn).toBeInTheDocument();
  fireEvent.click(homeBtn);

  const loggerBtn = screen.getByTestId("tenant");
  expect(loggerBtn).toBeInTheDocument();
  fireEvent.click(loggerBtn);

  const gatewayBtn = screen.getByTestId("gateway");
  expect(gatewayBtn).toBeInTheDocument();
  fireEvent.click(gatewayBtn);

  const sassBtn = screen.getByTestId("saas");
  expect(sassBtn).toBeInTheDocument();
  fireEvent.click(sassBtn);
});
