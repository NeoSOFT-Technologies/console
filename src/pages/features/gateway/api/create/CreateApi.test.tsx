import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
// import configureStore from "redux-mock-store";
// import thunk from "redux-thunk";
import store from "../../../../../store";
import CreateApi from "./CreateApi";

// const mockStore = configureStore([thunk]);
// const store = mockStore({
//   loading: false,
//   apiAdded: true,
//   data: {
//     Name: "api1",
//     listenPath: "/api1/",
//     TargetUrl: "http://httpbin.org",
//     IsActive: true,
//   },
// });

it("render without crashing CreateApi", async () => {
  await render(
    <BrowserRouter>
      <Provider store={store}>
        <CreateApi />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});

it("test buttons and inputs present", async () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <CreateApi />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const cancelBtn = screen.getByTestId("cancel-input");
  expect(cancelBtn).toBeInTheDocument();
  fireEvent.click(cancelBtn);

  const submitBtn = screen.getByTestId("form-input");
  expect(submitBtn).toBeInTheDocument();
  fireEvent.submit(submitBtn);

  const nameInput = screen.getByTestId("name-input");
  fireEvent.change(nameInput, { target: { value: "api1" } });
  expect(screen.getByTestId("name-input")).toHaveValue("api1");

  const listenPathInput = screen.getByTestId("listenPath-input");
  fireEvent.change(listenPathInput, { target: { value: "/api1/" } });
  expect(screen.getByTestId("listenPath-input")).toHaveValue("/api1/");

  const targetUrlInput = screen.getByTestId("targetUrl-input");
  fireEvent.change(targetUrlInput, { target: { value: "http://httpbin.org" } });
  expect(screen.getByTestId("targetUrl-input")).toHaveValue(
    "http://httpbin.org"
  );
});
