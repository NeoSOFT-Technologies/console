import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import TenantProfile from "./TenantProfile";
import { Provider } from "react-redux";
import store from "../../../../store/index";

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
  const nameBox = screen.getByTestId("name-input");
  expect(nameBox).toBeInTheDocument();
  expect(nameBox).toHaveAttribute("type", "text");

  const useridBox = screen.getByTestId("userid-input");
  expect(useridBox).toBeInTheDocument();
  expect(useridBox).toHaveAttribute("type", "text");

  const emailBox = screen.getByTestId("email-input");
  expect(emailBox).toBeInTheDocument();
  expect(emailBox).toHaveAttribute("type", "email");

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
  const nameBox = screen.getByTestId("name-input");
  fireEvent.change(nameBox, { target: { value: "akhilpinni" } });
  expect(screen.getByTestId("name-input")).toHaveValue("akhilpinni");

  const useridBox = screen.getByTestId("userid-input");
  fireEvent.change(useridBox, { target: { value: "akhilpinni" } });
  expect(screen.getByTestId("userid-input")).toHaveValue("akhilpinni");

  const emailBox = screen.getByTestId("email-input");
  fireEvent.change(emailBox, { target: { value: "akhilpinni123@gmail.com" } });
  expect(screen.getByTestId("email-input")).toHaveValue(
    "akhilpinni123@gmail.com"
  );

  const dbNameBox = screen.getByTestId("databaseName-input");
  fireEvent.change(dbNameBox, { target: { value: "registername" } });
  expect(screen.getByTestId("databaseName-input")).toHaveValue("registername");

  const hostBox = screen.getByTestId("host-input");
  fireEvent.change(hostBox, { target: { value: `{ tenant.host }` } });
  expect(screen.getByTestId("host-input")).toHaveValue("193.168.0.1");

  const portBox = screen.getByTestId("port-input");
  fireEvent.change(portBox, { target: { value: `{ tenant.port }` } });
  expect(screen.getByTestId("port-input")).toHaveValue("8989");

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
