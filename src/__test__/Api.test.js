import React from "react";
import { render, waitForElement } from "@testing-library/react";
import Login from "../app/user-pages/Login";
import { createServer } from "miragejs";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../app/redux/store/store";

let server;

beforeEach(() => {
  server = createServer();
});

afterEach(() => {
  server.shutdown();
});

it("shows the users from our server", async () => {
  server.get("/users", () => [
    { id: 1, name: "Luke" },
    { id: 2, name: "Leia" },
  ]);

  const { getByTestId } = render(
    <BrowserRouter>
      <Provider store={store}>
        <Login />
      </Provider>
    </BrowserRouter>
  );
  await waitForElement(() => getByTestId("email-input"));
  await waitForElement(() => getByTestId("password-input"));

  expect(getByTestId("user-1")).toHaveTextContent("");
  expect(getByTestId("user-2")).toHaveTextContent("");
});
