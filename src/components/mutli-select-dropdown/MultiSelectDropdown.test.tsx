import {
  fireEvent,
  render,
  screen,
  within,
  waitFor,
} from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../store";
import MultiSelectDropdown from "./MultiSelectDropdown";

it("render without crashing MultiSelect Dropdown menu", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <MultiSelectDropdown
          list={[]}
          title="Roles"
          formData={[]}
          handleCheck={() => {}}
          removeRole={() => {}}
        />
      </Provider>
    </BrowserRouter>
  );
});

it("render the roles list in MultiSelect Dropdown menu", async () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <MultiSelectDropdown
          list={["role1"]}
          title="Roles"
          formData={[]}
          handleCheck={() => {}}
          removeRole={() => {}}
        />
      </Provider>
    </BrowserRouter>
  );

  const dropdownBtn = screen.getByTestId("dropdown-toggle");
  await waitFor(() => {
    expect(dropdownBtn).toBeInTheDocument();
    fireEvent.click(dropdownBtn);
  });
  const rolesMenu = screen.getAllByTestId("dropdown-items");

  const item = rolesMenu[0];
  const roleItem = within(item).getByTestId("role-item");
  expect(roleItem).toBeInTheDocument();
  // expect(roleItem).toHaveValue("role1");
  expect(roleItem).toHaveAttribute("type", "checkbox");
});

it("render the form data", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <MultiSelectDropdown
          list={[]}
          title="Roles"
          formData={["role1"]}
          handleCheck={() => {}}
          removeRole={() => {}}
        />
      </Provider>
    </BrowserRouter>
  );

  const formData = screen.getAllByTestId("form-data-list");
  const item = formData[0];
  const roleItem = within(item).getByTestId("form-data-role-item");
  expect(roleItem).toBeInTheDocument();
  fireEvent.click(roleItem);
});
