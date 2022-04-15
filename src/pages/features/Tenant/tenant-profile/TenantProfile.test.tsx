import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import TenantProfile from "./TenantProfile";

const mockStore = configureStore([thunk]);
const store = mockStore({
  userData: {
    loading: false,
    data: {
      id: 1,
      tenantId: 2,
      tenantName: "rohit",
      description: "nice",
      createdDateTime: "curr Date and Time",
      databaseName: "data base name",
      host: "localhost",
      port: 3000,
      policy: "some good policies",
    },
  },
  updateTenantState: {
    isUpdated: false,
    loading: false,
    error: undefined,
  },
});

it("render without crashing TenantProfile", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <TenantProfile />
      </Provider>
    </BrowserRouter>
  );
});
it("test if input box is present", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <TenantProfile />
      </Provider>
    </BrowserRouter>
  );
  const nameBox = screen.getByTestId("tenantName-input");
  expect(nameBox).toBeInTheDocument();
  expect(nameBox).toHaveAttribute("type", "text");

  const dbNameBox = screen.getByTestId("databaseName-input");
  expect(dbNameBox).toBeInTheDocument();
  expect(dbNameBox).toHaveAttribute("type", "text");

  const hostBox = screen.getByTestId("host-input");
  expect(hostBox).toBeInTheDocument();
  expect(hostBox).toHaveAttribute("type", "text");

  const portBox = screen.getByTestId("port-input");
  expect(portBox).toBeInTheDocument();
  expect(portBox).toHaveAttribute("type", "text");
});

it("if input box takes input and if update and edit button renders", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <TenantProfile />
      </Provider>
    </BrowserRouter>
  );

  const descBox = screen.getByTestId("description-input");
  fireEvent.change(descBox, { target: { value: "hello" } });
  expect(screen.getByTestId("description-input")).toHaveValue("hello");

  const editBtn = screen.getByTestId("edit-button");
  expect(editBtn).toBeInTheDocument();
  fireEvent.click(editBtn);

  const updateBtn = screen.getByTestId("update-button");
  expect(updateBtn).toBeInTheDocument();
  fireEvent.click(updateBtn);
});

it("renders the cancel button", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <TenantProfile />
      </Provider>
    </BrowserRouter>
  );

  const editBtn = screen.getByTestId("edit-button");
  expect(editBtn).toBeInTheDocument();
  fireEvent.click(editBtn);

  const cancelBtn = screen.getByTestId("cancel-btn");
  expect(cancelBtn).toBeInTheDocument();
  fireEvent.click(cancelBtn);
});

it("should throw an error while updating tenant with empty name", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <TenantProfile />
      </Provider>
    </BrowserRouter>
  );

  const editBtn = screen.getByTestId("edit-button");
  fireEvent.click(editBtn);

  const nameBox = screen.getByTestId("tenantName-input");
  fireEvent.change(nameBox, { target: { value: "" } });

  const updateBtn = screen.getByTestId("update-button");
  fireEvent.click(updateBtn);
});
