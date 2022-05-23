import React from 'react';
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../store/index";
import SearchData from "./SearchData";

describe("SAAS - SEARCH DATA Component", () => {
  it("Check if H1 rendered", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <SearchData />
        </Provider>
      </BrowserRouter>
    );

    const insertDataH1Tag = screen.getByText("Search Data", {
      exact: false,
    });
    expect(insertDataH1Tag).toBeInTheDocument();
  });

  it("Check if search button rendered", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <SearchData />
        </Provider>
      </BrowserRouter>
    );

    const searchButtonElement = screen.getByRole("button", {
      name: /search/i,
    });
    expect(searchButtonElement).toBeInTheDocument();
  });
});
