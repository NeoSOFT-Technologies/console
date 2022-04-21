import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
// import store from "../../../../store/index";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import TenantDetails from "./TenantDetails";

const mockStore = configureStore([thunk]);
const store = mockStore({
  tenantDetails: {
    loading: false,
    data: {
      createdDateTime: "13/04/2022",
      description: "tenantDeatails",
      host: " 505469",
      id: 0,
      policy: "default",
      port: 0,
      databaseName: " tenant-db",
      tenantId: 0,
      tenantName: " tenantadmin",
    },
  },
  deleteTenant: { loading: false, data: true },
  updateTenantState: { loading: false, data: true },
});

it("render without crashing TenantDetails", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <TenantDetails />
      </Provider>
    </BrowserRouter>
  );
});

it("testif input box is present", async () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <TenantDetails />
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

  const descBox = screen.getByTestId("description-input");
  expect(descBox).toBeInTheDocument();
  expect(descBox).toHaveAttribute("type", "textarea");
});

it("test if input box take input", async () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <TenantDetails />
      </Provider>
    </BrowserRouter>
  );

  const nameBox = await screen.getByTestId("tenantName-input");
  fireEvent.change(nameBox, { target: { value: "akhilpinni" } });
  expect(screen.getByTestId("tenantName-input")).toHaveValue("akhilpinni");

  const dbNameBox = screen.getByTestId("databaseName-input");
  fireEvent.change(dbNameBox, { target: { value: "registername" } });
  expect(screen.getByTestId("databaseName-input")).toHaveValue("registername");

  const hostBox = screen.getByTestId("host-input");
  fireEvent.change(hostBox, { target: { value: "193.168.0.1" } });
  expect(screen.getByTestId("host-input")).toHaveValue("193.168.0.1");

  const portBox = screen.getByTestId("port-input");
  fireEvent.change(portBox, { target: { value: "8989" } });
  expect(screen.getByTestId("port-input")).toHaveValue("8989");

  const desBox = screen.getByTestId("description-input");
  fireEvent.change(desBox, { target: { value: "description" } });
  expect(screen.getByTestId("description-input")).toHaveValue("description");
});

it("test if update, edit and cancel buttons render", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <TenantDetails />
      </Provider>
    </BrowserRouter>
  );

  const editBtn = screen.getByTestId("edit-button");
  expect(editBtn).toBeInTheDocument();
  fireEvent.click(editBtn);

  const cancelBtn = screen.getByTestId("cancel-button");
  expect(cancelBtn).toBeInTheDocument();
  fireEvent.click(cancelBtn);

  const updateBtn = screen.getByTestId("update-button");
  expect(updateBtn).toBeInTheDocument();
  fireEvent.click(updateBtn);
});
