import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import UserDetails from "./UserDetails";

const mockStore = configureStore([thunk]);
const store = mockStore({
  userData: {
    loading: false,
    data: {
      username: "string",
      createdTimestamp: "string",
      count: 1,
      roles: [""],
    },
  },
  userDetails: {
    loading: false,
    data: {
      id: "string",
      createdTimestamp: "",
      username: "",
      enabled: true,
      emailVerified: true,
      email: "string;",
      tenantName: "",
      roles: ["existing_role"],
      permissions: [],
    },
  },
  rolesList: { loading: false, data: ["role1"] },
  deleteUserState: { loading: false, data: true },
  updateUserDataState: { loading: false, data: true },
});

it("render without crashing UserDetails", async () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <UserDetails />
      </Provider>
    </BrowserRouter>
  );
});

it("render edit, remove, save and cancel buttons", async () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <UserDetails />
      </Provider>
    </BrowserRouter>
  );
  const editBtn = screen.getByTestId("edit");
  expect(editBtn).toBeInTheDocument();
  fireEvent.click(editBtn);

  const removeBtn = screen.getByTestId("remove");
  expect(removeBtn).toBeInTheDocument();
  fireEvent.click(removeBtn);

  const saveBtn = screen.getByTestId("save");
  expect(saveBtn).toBeInTheDocument();
  fireEvent.click(saveBtn);

  const cancelBtn = screen.getByTestId("cancel");
  expect(cancelBtn).toBeInTheDocument();
  fireEvent.click(cancelBtn);
});

it("render form boxes", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <UserDetails />
      </Provider>
    </BrowserRouter>
  );
  const nameBox = screen.getByTestId("userName-input");
  expect(nameBox).toBeInTheDocument();
  expect(nameBox).toHaveAttribute("type", "text");
  fireEvent.change(nameBox, { target: { value: "Rohit" } });
  expect(nameBox).toHaveValue("Rohit");

  const emailBox = screen.getByTestId("email-input");
  expect(emailBox).toBeInTheDocument();
  expect(emailBox).toHaveAttribute("type", "text");
  fireEvent.change(emailBox, { target: { value: "rohit@gmail.com" } });
  expect(emailBox).toHaveValue("rohit@gmail.com");

  const tenantNameBox = screen.getByTestId("tenantName-input");
  expect(tenantNameBox).toBeInTheDocument();
  expect(tenantNameBox).toHaveAttribute("type", "text");
  fireEvent.change(tenantNameBox, { target: { value: "Rohit" } });
  expect(tenantNameBox).toHaveValue("Rohit");

  const editBtn = screen.getByTestId("edit");
  fireEvent.click(editBtn);
  const saveBtn = screen.getByTestId("save");
  fireEvent.click(saveBtn);
});

it("should throw an error while entering a invalid email", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <UserDetails />
      </Provider>
    </BrowserRouter>
  );

  const emailBox = screen.getByTestId("email-input");
  fireEvent.change(emailBox, { target: { value: "rohit" } });

  const editBtn = screen.getByTestId("edit");
  fireEvent.click(editBtn);
  const saveBtn = screen.getByTestId("save");
  fireEvent.click(saveBtn);
});

it("renders role select box and remove role button", async () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <UserDetails />
      </Provider>
    </BrowserRouter>
  );
  const editBtn = screen.getByTestId("edit");
  fireEvent.click(editBtn);
  await waitFor(() => {
    const dropdownToggler = screen.getByTestId("dropdown-toggler");
    waitFor(() => {
      fireEvent.click(dropdownToggler);

      const roleItem = screen.getByTestId("role-item");
      expect(roleItem).toBeInTheDocument();
      fireEvent.click(roleItem);
      fireEvent.click(roleItem);

      const removeRoleBtn = screen.getByTestId("remove-role-btn");
      expect(removeRoleBtn).toBeInTheDocument();
      fireEvent.click(removeRoleBtn);
    });
  });
});
