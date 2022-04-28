import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import store from "../../store";
import Sidebar from "./Sidebar";
const mockStore = configureStore([thunk]);
const storeStates = {
  userData: {
    data: { username: "", createdTimestamp: "", count: 1, roles: [""] },
  },
};
it("render without crashing Sidebar", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Sidebar />
      </Provider>
    </BrowserRouter>
  );
});

it("render nav link button", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Sidebar />
      </Provider>
    </BrowserRouter>
  );

  const navLink = screen.getByTestId("nav-link-button");
  expect(navLink).toBeInTheDocument();
  fireEvent.click(navLink);
});
it("render nav link button", () => {
  const stores = mockStore({
    ...storeStates,
    loginType: { loading: false, data: "admin" },
  });
  render(
    <BrowserRouter>
      <Provider store={stores}>
        <Sidebar />
      </Provider>
    </BrowserRouter>
  );

  const loginTypelink = screen.getByTestId("logintype");
  expect(loginTypelink).toBeInTheDocument();
  fireEvent.click(loginTypelink);
});

it("render nav link button", () => {
  const stores = mockStore({
    userData: {
      data: {
        id: 9,
        tenantId: 4,
        tenantName: "deepthi",
        description: "db-tenant",
        createdDateTime: "",
        databaseName: "",
        host: "",
        port: 5,
        policy: "",
      },
    },
    loginType: { loading: false, data: "tenant" },
  });
  render(
    <BrowserRouter>
      <Provider store={stores}>
        <Sidebar />
      </Provider>
    </BrowserRouter>
  );

  const loginTypelink = screen.getByTestId("logintype");
  expect(loginTypelink).toBeInTheDocument();
  fireEvent.click(loginTypelink);
});
it("render nav link button", () => {
  const stores = mockStore({
    userData: {
      data: {
        id: "",
        createdTimestamp: "",
        username: "",
        enabled: true,
        emailVerified: true,
        email: "",
        access: {
          manageGroupMembership: true,
          view: true,
          mapRoles: true,
          impersonate: true,
          manage: true,
        },
        tenantName: "",
        roles: ["", ""],
        permissions: ["", ""],
      },
    },

    loginType: { loading: false, data: "user" },
  });
  render(
    <BrowserRouter>
      <Provider store={stores}>
        <Sidebar />
      </Provider>
    </BrowserRouter>
  );

  const loginTypelink = screen.getByTestId("logintype");
  expect(loginTypelink).toBeInTheDocument();
  fireEvent.click(loginTypelink);
});
it("render nav link button", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Sidebar />
      </Provider>
    </BrowserRouter>
  );

  const gatewayLink = screen.getByTestId("gateway-item");
  expect(gatewayLink).toBeInTheDocument();
  fireEvent.click(gatewayLink);

  // const sassLink = screen.getByTestId("sass");
  // expect(sassLink).toBeInTheDocument();
  // fireEvent.click(sassLink);
});
it("render nav link button", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Sidebar />
      </Provider>
    </BrowserRouter>
  );

  const sassLink = screen.getByTestId("sass");
  expect(sassLink).toBeInTheDocument();
  fireEvent.click(sassLink);
});
it("render nav link button", () => {
  const stores = mockStore({
    ...storeStates,
    loginType: { loading: false, data: "admin" },
  });
  render(
    <BrowserRouter>
      <Provider store={stores}>
        <Sidebar />
      </Provider>
    </BrowserRouter>
  );

  const loginTypelink = screen.getByTestId("gateway-item");
  expect(loginTypelink).toBeInTheDocument();
  fireEvent.click(loginTypelink);
});

it("render nav link button", () => {
  const stores = mockStore({
    userData: {
      data: {
        id: 9,
        tenantId: 4,
        tenantName: "deepthi",
        description: "db-tenant",
        createdDateTime: "",
        databaseName: "",
        host: "",
        port: 5,
        policy: "",
      },
    },
    loginType: { loading: false, data: "tenant" },
  });
  render(
    <BrowserRouter>
      <Provider store={stores}>
        <Sidebar />
      </Provider>
    </BrowserRouter>
  );

  const loginTypelink = screen.getByTestId("gateway-item");
  expect(loginTypelink).toBeInTheDocument();
  fireEvent.click(loginTypelink);
});

it("render nav link button", () => {
  const stores = mockStore({
    userData: {
      data: {
        id: "",
        createdTimestamp: "",
        username: "",
        enabled: true,
        emailVerified: true,
        email: "",
        access: {
          manageGroupMembership: true,
          view: true,
          mapRoles: true,
          impersonate: true,
          manage: true,
        },
        tenantName: "",
        roles: ["", ""],
        permissions: ["", ""],
      },
    },

    loginType: { loading: false, data: "user" },
  });
  render(
    <BrowserRouter>
      <Provider store={stores}>
        <Sidebar />
      </Provider>
    </BrowserRouter>
  );

  const loginTypelink = screen.getByTestId("gateway-item");
  expect(loginTypelink).toBeInTheDocument();
  fireEvent.click(loginTypelink);
});

it("render nav link button", () => {
  const stores = mockStore({
    ...storeStates,
    loginType: { loading: false, data: "admin" },
  });
  render(
    <BrowserRouter>
      <Provider store={stores}>
        <Sidebar />
      </Provider>
    </BrowserRouter>
  );

  const loginTypelink = screen.getByTestId("sass");
  expect(loginTypelink).toBeInTheDocument();
  fireEvent.click(loginTypelink);
});

it("render nav link button", () => {
  const stores = mockStore({
    userData: {
      data: {
        id: 9,
        tenantId: 4,
        tenantName: "deepthi",
        description: "db-tenant",
        createdDateTime: "",
        databaseName: "",
        host: "",
        port: 5,
        policy: "",
      },
    },
    loginType: { loading: false, data: "tenant" },
  });
  render(
    <BrowserRouter>
      <Provider store={stores}>
        <Sidebar />
      </Provider>
    </BrowserRouter>
  );

  const loginTypelink = screen.getByTestId("sass");
  expect(loginTypelink).toBeInTheDocument();
  fireEvent.click(loginTypelink);
});

it("render nav link button", () => {
  const stores = mockStore({
    userData: {
      data: {
        id: "",
        createdTimestamp: "",
        username: "",
        enabled: true,
        emailVerified: true,
        email: "",
        access: {
          manageGroupMembership: true,
          view: true,
          mapRoles: true,
          impersonate: true,
          manage: true,
        },
        tenantName: "",
        roles: ["", ""],
        permissions: ["", ""],
      },
    },

    loginType: { loading: false, data: "user" },
  });
  render(
    <BrowserRouter>
      <Provider store={stores}>
        <Sidebar />
      </Provider>
    </BrowserRouter>
  );

  const loginTypelink = screen.getByTestId("sass");
  expect(loginTypelink).toBeInTheDocument();
  fireEvent.click(loginTypelink);
});
