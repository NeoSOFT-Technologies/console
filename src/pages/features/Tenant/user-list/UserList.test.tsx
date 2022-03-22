import { render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../store/index";
import UserList from "./UserList";

it("render without crashing UserList", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <UserList />
      </Provider>
    </BrowserRouter>
  );
});
