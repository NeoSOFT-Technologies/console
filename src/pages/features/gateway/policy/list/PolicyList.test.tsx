import { render, fireEvent, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import PolicyList from "./PolicyList";

const mockStore = configureStore([thunk]);
const store = mockStore({
  policyListState: {
    loading: false,
    data: {
      Policies: [
        {
          Id: "3cf66180-0b61-4047-a0a8-8140f9026234",
          Name: "policy1",
          Apis: ["api1", "api2"],
          AuthType: "standard",
        },
      ],
    },
    TotalCount: 1,
  },
});
it("render without crashing policy list", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <PolicyList />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const rows = screen.getAllByRole("row");
  expect(rows).toHaveLength(2);
});

it("render buttons", async () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <PolicyList />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const searchBtn = screen.getByTestId("searchBtn");
  expect(searchBtn).toBeInTheDocument();
  fireEvent.click(searchBtn);

  const createBtn = screen.getByTestId("createBtn");
  expect(createBtn).toBeInTheDocument();
  fireEvent.click(createBtn);
});
