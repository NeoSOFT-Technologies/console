import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("Check entire flow", async () => {
    mockApi.onGet("/api/tenants").reply(200, {
      data: [
        {
          id: 1,
          tenantName: "Tenant1",
          email: "tenant1@email.com",
          description: "updated description",
          databaseName: "tenant1-db",
          databaseDescription: "tenant1 db",
          createdDateTime: "2022/05/30 08:28:11",
        },
        {
          id: 2,
          tenantName: "Tenant2",
          email: "tenant2@email.org",
          description: "des",
          databaseName: "tenant2-db",
          databaseDescription: "des",
          createdDateTime: "2022/06/02 10:56:19",
        },
      ],
      count: 2,
    });

    mockApi
      .onGet("http://localhost:8083/api/v1/manage/table/?tenantId=1")
      .reply(200, {
        statusCode: 200,
        message: "Successfully retrieved all tables",
        data: ["testTable"],
      });

    mockApi.onGet("manage/table/testTable?tenantId=1").reply(200, {
      statusCode: 200,
      message: "Table Information retrieved successfully",
      data: {
        tableName: "testTable",
        columns: [
          {
            name: "id",
            type: "string",
            required: true,
            partialSearch: false,
            multiValue: false,
            sortable: false,
            filterable: true,
            storable: true,
          },
          {
            name: "name",
            type: "string",
            required: false,
            partialSearch: false,
            multiValue: false,
            sortable: false,
            filterable: false,
            storable: false,
          },
          {
            name: "username",
            type: "strings",
            required: true,
            partialSearch: false,
            multiValue: true,
            sortable: true,
            filterable: true,
            storable: true,
          },
        ],
      },
    });

    mockApi
      .onGet(
        "testTable?tenantId=1&queryField=id&searchTerm=*&startRecord=0&pageSize=6&orderBy=id&order=asc"
      )
      .reply(200, {
        statusCode: 200,
        message: "Records fetched successfully",
        status: "OK",
        results: {
          numDocs: 1,
          data: [{ name: ["karthik"], id: "1", username: ["karthik261099"] }],
        },
      });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <SearchData />
        </Provider>
      </BrowserRouter>
    );

    // CHECK IF TENANT SELECT DROPDOWN EXISTS
    const tenantDropdown = await waitFor(
      () => screen.getByTestId("tenant-name-select"),
      {
        timeout: 3000,
      }
    );
    expect(tenantDropdown).toBeInTheDocument();

    // SELECT ITEM FROM DROP DOWN
    userEvent.selectOptions(screen.getByTestId("tenant-name-select"), [
      "Tenant1",
    ]);

    // CHECK IF TABLE SELECT DROPDOWN EXISTS
    const tableDropdown = await waitFor(
      () => screen.getByTestId("table-name-select"),
      {
        timeout: 3000,
      }
    );
    expect(tableDropdown).toBeInTheDocument();

    // CHECK IF OPTION IN THE TABLE IS FETCHED AND VISIBLE
    const tableOption = await waitFor(
      () => screen.getByText("testTable", { exact: false }),
      {
        timeout: 3000,
      }
    );
    expect(tableOption).toBeInTheDocument();

    // SELECT ITEM FROM DROP DOWN
    userEvent.selectOptions(screen.getByTestId("table-name-select"), [
      "testTable",
    ]);

    //= =======================

    const queryFieldDropdown = await waitFor(
      () => screen.getByTestId("query-field-select"),
      {
        timeout: 3000,
      }
    );
    expect(queryFieldDropdown).toBeInTheDocument();

    // CHECK IF OPTION IN THE TABLE IS FETCHED AND VISIBLE
    const queryFieldOption = await waitFor(
      () => screen.getAllByText("id", { exact: false })[0],
      {
        timeout: 3000,
      }
    );
    expect(queryFieldOption).toBeInTheDocument();

    userEvent.selectOptions(screen.getByTestId("query-field-select"), ["id"]);

    userEvent.selectOptions(screen.getByTestId("record-count-select"), ["5"]);

    userEvent.selectOptions(screen.getByTestId("order-by-select"), ["id"]);

    const searchBtn = screen.getByTestId("search-btn");
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    // const usernameInTable = screen.getByText("karthik261099", {
    //   exact: false,
    // });
    const usernameInTable = await waitFor(
      () => screen.getByText("karthik261099", { exact: false }),
      {
        timeout: 3000,
      }
    );
    expect(usernameInTable).toBeInTheDocument();
  });
});
