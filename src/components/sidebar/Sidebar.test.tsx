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

const localStorageMock = (() => {
  let store: any = {
    user_info: `{"id":"8d2e314a-b512-489f-baca-55a029c92462","createdTimestamp":"2022/05/26 05:02:14","username":"user2","enabled":true,"emailVerified":false,"email":"user2@gmail.com","access":{"manageGroupMembership":true,"view":true,"mapRoles":true,"impersonate":true,"manage":true},"tenantName":"Tenant2","roles":["tenantadmin","default-roles-tenant2"],"permissions":["view"]}`,
    "tenant-info": `{"id":30,"tenantId":55,"tenantName":"Tenant2","description":"Teanant2 ","createdDateTime":"2022/05/24 12:43:59","databaseName":"db-Tenant","host":"103.224.242.138","port":3306,"policy":"{ max_size: 30 }"}`,
  };
  return {
    getItem(key: string) {
      return store[key];
    },
    setItem(key: string, value: any) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
    removeItem(key: string) {
      delete store[key];
    },
  };
})();
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
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
