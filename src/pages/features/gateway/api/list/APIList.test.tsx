import { render, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../store/index";
import APIList from "./APIList";

const mockApi = new MockAdapter(axios);

it("render without crashing API list", () => {
  mockApi.onGet("/ApplicationGateway?pageNum=1&pageSize=1").reply(200, {
    data: [
      {
        Name: "Api1",
        CreatedDate: "2022-07-07T14:09:40.405677+00:00",
        TargetUrl: "https://httpbin.org",
        IsActive: true,
        Id: "9dd100136a6a4e00af04bcece0eb1c8a",
        AuthType: "standard",
      },
    ],
    count: 1,
  });
  render(
    <BrowserRouter>
      <Provider store={store}>
        <APIList />
      </Provider>
    </BrowserRouter>
  );
});

it("check buttons and inputs", async () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <APIList />
      </Provider>
    </BrowserRouter>
  );
  const apiListHeading = screen.getByText("API LIST");
  expect(apiListHeading).toBeInTheDocument();
});
