import { render } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../store/index";
import UserList from "./UserList";

const mockApi = new MockAdapter(axios);

it("render without crashing user list", () => {
  mockApi
    .onGet("/api/user?page=1")
    .reply(200, { data: [{ name: "Rohit" }], count: 1 });
  render(
    <BrowserRouter>
      <Provider store={store}>
        <UserList />
      </Provider>
    </BrowserRouter>
  );
});

it("render the active, inactive and all buttons", () => {
  mockApi
    .onGet("/api/user?page=1")
    .reply(200, { data: [{ name: "Rohit" }], count: 1 });
  render(
    <BrowserRouter>
      <Provider store={store}>
        <UserList />
      </Provider>
    </BrowserRouter>
  );
});
