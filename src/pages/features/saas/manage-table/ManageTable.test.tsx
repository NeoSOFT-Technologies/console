import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../store/index";
import ManageTable from "./ManageTable";

describe("SAAS - SEARCH DATA Component", () => {
  it("Check if H1 rendered", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ManageTable />
        </Provider>
      </BrowserRouter>
    );

    const insertDataH1Tag = screen.getByText("Table Details", {
      exact: false,
    });
    expect(insertDataH1Tag).toBeInTheDocument();
  });

  it("Check if Add New Button rendered", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ManageTable />
        </Provider>
      </BrowserRouter>
    );

    const addNewBtn = screen.getByText("Add New", {
      exact: false,
    });
    expect(addNewBtn).toBeInTheDocument();
  });
});