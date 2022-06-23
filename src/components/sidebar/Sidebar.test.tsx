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
    user: JSON.stringify({
      accessToken:
        "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI5b2I4QjFXZ3lVcEtvb2luRUJ1cXNZZW0yYTBaT1dKZFhsWFBmblpkTkk0In0.eyJleHAiOjE2NTUyNzMzNTEsImlhdCI6MTY1NTI3MzA1MSwianRpIjoiZmM5MDQ2NTQtMzI1Yi00MmJiLThlMWUtZmUyYTZkNzUxZTk0IiwiaXNzIjoiaHR0cHM6Ly9pYW0ta2V5Y2xvYWsubmVvc29mdHRlY2guY29tL2F1dGgvcmVhbG1zL1RlbmFudDIiLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImFjY291bnQiXSwic3ViIjoiYmY0Y2NmYjgtN2RmZS00MzAyLWEyZmUtMjc4ZDNmMzkzZDQ1IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibXktbmVzdC1hcHBsaWNhdGlvbiIsInNlc3Npb25fc3RhdGUiOiJhYzRlZTVlMy1iNTE2LTRmNWItOGFlOS04YzVmZTAwMDhhZjUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NTAwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLXRlbmFudDIiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInRlbmFudGFkbWluIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsicmVhbG0tbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJ2aWV3LWlkZW50aXR5LXByb3ZpZGVycyIsInZpZXctcmVhbG0iLCJtYW5hZ2UtaWRlbnRpdHktcHJvdmlkZXJzIiwiaW1wZXJzb25hdGlvbiIsInJlYWxtLWFkbWluIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJzaWQiOiJhYzRlZTVlMy1iNTE2LTRmNWItOGFlOS04YzVmZTAwMDhhZjUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInBlcm1pc3Npb24iOlsiY3JlYXRlIiwidmlldyIsImVkaXQiLCJkZWxldGUiXSwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFiY0BhLmNvbSJ9.Jb2zsQh6mj9yXRGnfVaZpAOQxmJOX9tadXdbZE5xVCm81wiCP2MlN7LbWt7q-dVMsejXiG02t3xI3YLmtELc9_tmPQuWVF7bx6FfD90bZSnUAwZbvSCG_p01v8-c-_y-LW-oo97D5Yno688sOaS8FvO-Auv5bTc6zPSIOe7eHHniRZcQiLfv1tU6Yd1XKpyFgNfzzRwyp6N2hsHsdoh6zLtrvqsOgKRMKrWcRQpx7U-qKCK2DVPbdTv_7kE5IBedFtOZXpjR_MSuJsc0T7Rp9RjwWpwyNOwhIo_fjOXf7xWAFypKmtswJRJY63Ltt76MRmRRHFwJABkiC6eJrzMNSA",
      refreshToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJiYzE2YWJmNy1lMzIyLTRmOGMtODJiYy01YWZhYmZjYzY3ZGUifQ.eyJleHAiOjE2NTUyNzQ4NTEsImlhdCI6MTY1NTI3MzA1MSwianRpIjoiYzVhNGExNTktNGViNi00ZjY2LTgyYzUtMDVjMWM5NTMwZDZhIiwiaXNzIjoiaHR0cHM6Ly9pYW0ta2V5Y2xvYWsubmVvc29mdHRlY2guY29tL2F1dGgvcmVhbG1zL1RlbmFudDIiLCJhdWQiOiJodHRwczovL2lhbS1rZXljbG9hay5uZW9zb2Z0dGVjaC5jb20vYXV0aC9yZWFsbXMvVGVuYW50MiIsInN1YiI6ImJmNGNjZmI4LTdkZmUtNDMwMi1hMmZlLTI3OGQzZjM5M2Q0NSIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJteS1uZXN0LWFwcGxpY2F0aW9uIiwic2Vzc2lvbl9zdGF0ZSI6ImFjNGVlNWUzLWI1MTYtNGY1Yi04YWU5LThjNWZlMDAwOGFmNSIsInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsInNpZCI6ImFjNGVlNWUzLWI1MTYtNGY1Yi04YWU5LThjNWZlMDAwOGFmNSJ9.9UKcMWPl1f6GshNfGS1VgIGUaMSY6FHf4H6wE9nAYuY",
      expiresIn: 300,
      refreshExpiresIn: 1800,
      tokenType: "Bearer",
      scope: "email profile",
      sessionState: "ac4ee5e3-b516-4f5b-8ae9-8c5fe0008af5",
    }),
    user_info: `{"id":"8d2e314a-b512-489f-baca-55a029c92462","createdTimestamp":"2022/05/26 mailto:05:02:14","username":"user2","enabled":true,"emailverified":false,"email":"user2@gmail.com","access":{"manageGroupMembership":true,"view":true,"mapRoles":true,"impersonate":true,"manage":true},"tenantName":"Tenant2","roles":["tenantadmin","default-roles-tenant2"],"permissions":["view"]}`,
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
