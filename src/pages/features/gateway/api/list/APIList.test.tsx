import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import APIList from "./APIList";

const mockStore = configureStore([thunk]);
const store = mockStore({
  apiListState: {
    loading: false,
    data: {
      Apis: [
        {
          Id: "3cf66180-0b61-4047-a0a8-8140f9026234",
          Name: "api1",
          TargetUrl: "http://httpbin.org",
          AuthType: "keyless",
        },
        {
          Id: "3cf66180-0b61-4047-a0a8-8140g8026234",
          Name: "api1",
          TargetUrl: "http://httpbin.org",
          AuthType: "keyless",
        },
      ],
      TotalCount: 2,
      error: undefined,
    },
  },
});
console.log(store.getState());
it("render without crashing api list", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <APIList />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const rows = screen.getAllByRole("row");
  expect(rows).toHaveLength(3);
});

it("render buttons", async () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <APIList />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const rows = screen.getAllByRole("row");
  const searchBtn = screen.getByTestId("searchBtn");
  expect(searchBtn).toBeInTheDocument();
  fireEvent.click(searchBtn);
  expect(rows).toHaveLength(3);

  const createBtn = screen.getByTestId("createBtn");
  expect(createBtn).toBeInTheDocument();
  fireEvent.click(createBtn);
  expect(rows).toHaveLength(3);

  // waitFor(() => expect(screen.getByRole("Spinner")).toBeInTheDocument);
});
