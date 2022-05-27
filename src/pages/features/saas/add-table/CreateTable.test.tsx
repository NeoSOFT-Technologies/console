import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../store/index";
import GetTables from "./CreateTable";

describe("SAAS - ADD TABLE Component", () => {
  it("Check if H1 rendered", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <GetTables />
        </Provider>
      </BrowserRouter>
    );

    const insertDataH1Tag = screen.getByText("Add Table", {
      exact: false,
    });
    expect(insertDataH1Tag).toBeInTheDocument();
  });

  it("Check if Add New Column Button rendered", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <GetTables />
        </Provider>
      </BrowserRouter>
    );

    const addNewColBtn = screen.getByText("Add Column", {
      exact: false,
    });
    expect(addNewColBtn).toBeInTheDocument();
  });

  it("Check if Save Button rendered", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <GetTables />
        </Provider>
      </BrowserRouter>
    );

    const addSaveBtn = screen.getByText("Save", {
      exact: false,
    });
    expect(addSaveBtn).toBeInTheDocument();
  });
});
