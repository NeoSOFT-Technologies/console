import {
  render,
  screen,
  fireEvent,
  waitFor,
  getAllByRole,
} from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import mockApi from "../../../../resources/tenant/testconfig";
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

  it("Check if table name populates on entering tenant id", async () => {
    mockApi
      .onGet("http://localhost:8083/api/v1/manage/table/?tenantId=1")
      .reply(200, {
        statusCode: 200,
        message: "Successfully retrieved all tables",
        data: ["testTable"],
      });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <SearchData />
        </Provider>
      </BrowserRouter>
    );

    const tenantIdField = await screen.getByPlaceholderText(/user/i);
    expect(tenantIdField).toBeInTheDocument();
    fireEvent.change(tenantIdField, { target: { value: "1" } });

    // expect result
    const data = await waitFor(
      () => screen.getByText("testTable", { exact: false }),
      {
        timeout: 3000,
      }
    );
    expect(data).toBeInTheDocument();

    const getTablesSelectDropdown = screen.getByTestId("table-name-select");

    fireEvent.click(getTablesSelectDropdown);
    const dropdownOptions = getAllByRole(getTablesSelectDropdown, "option");
    fireEvent.click(dropdownOptions[1]);

    const display = getTablesSelectDropdown.children[1];
    expect(display).toHaveTextContent("testTable");
  });
});
