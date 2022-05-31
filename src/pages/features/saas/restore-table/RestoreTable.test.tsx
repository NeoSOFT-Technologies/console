import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../store/index";
import GetTables from "./RestoreTable";

describe("SAAS - RESTORE TABLE Component", () => {
  it("Check if component rendered without crashing", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <GetTables />
        </Provider>
      </BrowserRouter>
    );
  });

  it("Check if H1 rendered", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <GetTables />
        </Provider>
      </BrowserRouter>
    );

    const tableDetailsH1Tag = screen.getByText("Table Details", {
      exact: false,
    });
    expect(tableDetailsH1Tag).toBeInTheDocument();
  });
});
