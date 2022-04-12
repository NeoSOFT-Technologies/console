import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../store";
import RolesAndPermissions from "./RolesAndPermissions";

it("render without crashing Roles and Permissions component", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <RolesAndPermissions
          heading={"heading"}
          list={["roles"]}
          classes={"classes"}
        />
      </Provider>
    </BrowserRouter>
  );
});

it("render the list of roles", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <RolesAndPermissions
          heading={"heading"}
          list={["roles"]}
          classes={"classes"}
        />
      </Provider>
    </BrowserRouter>
  );

  const allRoles = screen.getAllByTestId("role");
  const item = allRoles[0];

  expect(item).toBeInTheDocument();
});
