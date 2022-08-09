import { render, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../store/index";
import PolicyList from "./PolicyList";

const mockApi = new MockAdapter(axios);

it("render without crashing Policy list", () => {
  mockApi.onGet("/Policy?pageNum=1&pageSize=1").reply(200, {
    data: [
      {
        Action: "delete",
        Id: "9dd100136a6a4e00af04bcece0eb1c8a",
        Name: "policy1",
        State: "state",
        Apis: ["api1", "api2"],
        AuthType: "standard",
      },
    ],
    count: 1,
  });
  render(
    <BrowserRouter>
      <Provider store={store}>
        <PolicyList />
      </Provider>
    </BrowserRouter>
  );
});

it("check buttons and inputs", async () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <PolicyList />
      </Provider>
    </BrowserRouter>
  );
  const policyListHeading = screen.getByText("POLICY LIST");
  expect(policyListHeading).toBeInTheDocument();
});
