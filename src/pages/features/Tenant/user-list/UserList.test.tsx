import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import UserList from "./UserList";
import { Provider } from "react-redux";
import store from "../../../../store/index";

it("render without crashing UserList", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <UserList />
      </Provider>
    </BrowserRouter>
  );
});

it("test if it renders active, inactive and all buttons correctly", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <UserList />
      </Provider>
    </BrowserRouter>
  );
  const activeBtn = screen.getByTestId("active-button");
  expect(activeBtn).toBeInTheDocument();
  fireEvent.click(activeBtn);

  const inactiveBtn = screen.getByTestId("inactive-button");
  expect(inactiveBtn).toBeInTheDocument();
  fireEvent.click(inactiveBtn);

  const allBtn = screen.getByTestId("all-button");
  expect(allBtn).toBeInTheDocument();
  fireEvent.click(allBtn);
});

it("render searchBtn and inputBox", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <UserList />
      </Provider>
    </BrowserRouter>
  );
  const searchBtn = screen.getByTestId("search-button");
  expect(searchBtn).toBeInTheDocument();
  fireEvent.click(searchBtn);

  const inputBox = screen.getByTestId("input-group");
  expect(inputBox).toBeInTheDocument();
  fireEvent.change(inputBox, { target: { value: "akhilpinni" } });
  expect(screen.getByTestId("input-group")).toHaveValue("akhilpinni");
});
