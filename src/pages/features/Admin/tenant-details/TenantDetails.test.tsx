import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../store/index";
import TenantDetails from "./TenantDetails";

it("render without crashing TenantDetails", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <TenantDetails />
      </Provider>
    </BrowserRouter>
  );
});

it("testif input box is present", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <TenantDetails />
      </Provider>
    </BrowserRouter>
  );
  const nameBox = screen.getByTestId("name-input");
  expect(nameBox).toBeInTheDocument();
  expect(nameBox).toHaveAttribute("type", "text");

  // const emailBox = screen.getByTestId("email-input");
  // expect(emailBox).toBeInTheDocument();
  // expect(emailBox).toHaveAttribute("type", "email");

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

it("test if input box take input", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <TenantDetails />
      </Provider>
    </BrowserRouter>
  );

  const nameBox = screen.getByTestId("name-input");
  fireEvent.change(nameBox, { target: { value: "akhilpinni" } });
  expect(screen.getByTestId("name-input")).toHaveValue("akhilpinni");

  // const emailBox = screen.getByTestId("email-input");
  // fireEvent.change(emailBox, { target: { value: "akhilpinni123@gmail.com" } });
  // expect(screen.getByTestId("email-input")).toHaveValue(
  //   "akhilpinni123@gmail.com"
  // );

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

  // const updateBtn = screen.queryByTestId("update-button") as HTMLElement;
  // expect(updateBtn).toBeInTheDocument();
  // fireEvent.click(updateBtn);

  const editBtn = screen.queryByTestId("edit-button") as HTMLElement;
  expect(editBtn).toBeInTheDocument();
  fireEvent.click(editBtn);

  const cancelBtn = screen.getByTestId("cancel-button");
  expect(cancelBtn).toBeInTheDocument();
  fireEvent.click(cancelBtn);
});

//  it("test if dropdown-items delete-tenant, manage-roles, manage-permissions renders properly", () => {
//    render(
//      <BrowserRouter>
//        <Provider store={store}>
//          <TenantDetails />
//        </Provider>
//      </BrowserRouter>
//    );
//    const ddBtn1 = screen.queryByTestId("dropdownitem1") as HTMLElement;
//   expect(ddBtn1).toBeInTheDocument();
//   fireEvent.click(ddBtn1);
//  });

// rendering dropdown items and modal left
