import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../store/index";
import UserDetails from "./UserDetails";

it("render without crashing UserDetails", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <UserDetails />
      </Provider>
    </BrowserRouter>
  );
});
it("render without crashing UserDetails", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <UserDetails />
      </Provider>
    </BrowserRouter>
  );
  const editBtn = screen.getByTestId("edit-user");
  expect(editBtn).toBeInTheDocument();
  fireEvent.click(editBtn);

  const cancelBtn = screen.getByTestId("remove-user");
  expect(cancelBtn).toBeInTheDocument();
  fireEvent.click(cancelBtn);
});
it("render without crashing UserDetails", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <UserDetails />
      </Provider>
    </BrowserRouter>
  );
  // const nameBox = screen.getByTestId("userName-input");
  // expect(nameBox).toBeInTheDocument();
  // expect(nameBox).toHaveAttribute("type", "text");

  // const dbNameBox = screen.getByTestId("databaseName-input");
  // expect(dbNameBox).toBeInTheDocument();
  // expect(dbNameBox).toHaveAttribute("type", "text");

  // const hostBox = screen.getByTestId("host-input");
  // expect(hostBox).toBeInTheDocument();
  // expect(hostBox).toHaveAttribute("type", "text");
});
