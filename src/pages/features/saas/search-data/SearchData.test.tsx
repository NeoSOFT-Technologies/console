import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import mockApi from "../../../../resources/tenant/testconfig";
import store from "../../../../store/index";
import SearchData from "./SearchData";

describe("SAAS - SEARCH DATA Component 1", () => {
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

describe("SAAS - SEARCH DATA Component 2", () => {
  it("Check entire flow of Searching", async () => {
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
      ],
      count: 1,
    });

    mockApi
      .onGet(
        "https://iam-dev-saas.neosofttech.com/api/v1/manage/table/?tenantId=1"
      )
      .reply(200, {
        statusCode: 200,
        message: "Successfully retrieved all tables",
        data: [
          {
            tenantName: "No Tenant Found",
            tenantId: 1,
            tableName: "testTable",
          },
        ],
      });

    mockApi
      .onGet(
        "https://iam-dev-saas.neosofttech.com/api/v1/manage/table/testTable?tenantId=1"
      )
      .reply(200, {
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
        message: "Record fetched successfully",
        status: "OK",
        results: {
          numDocs: 10,
          data: [
            { name: ["omkar"], id: "1", username: ["omkar261099"] },
            { name: ["xname"], id: "2", username: ["username_2"] },
            { name: ["yname"], id: "3", username: ["username_3"] },
            { name: ["zname"], id: "4", username: ["username_4"] },
            { name: ["pname"], id: "5", username: ["username_5"] },
            { name: ["qname"], id: "6", username: ["username_6"] },
          ],
        },
      });

    mockApi
      .onGet(
        "testTable?tenantId=1&queryField=id&searchTerm=*&startRecord=5&pageSize=6&orderBy=id&order=asc"
      )
      .reply(200, {
        statusCode: 200,
        message: "Records fetched successfully",
        status: "OK",
        results: {
          numDocs: 10,
          data: [
            { name: ["karthik"], id: "6", username: ["karthik-pillai"] },
            { name: ["afname"], id: "7", username: ["user-name-2"] },
            { name: ["bfname"], id: "8", username: ["user-name-3"] },
            { name: ["cfname"], id: "9", username: ["user-name-4"] },
            { name: ["dfname"], id: "10", username: ["user-name-5"] },
          ],
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
        timeout: 1000,
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
        timeout: 1000,
      }
    );
    expect(tableDropdown).toBeInTheDocument();

    // CHECK IF OPTION IN THE DROPDOWN IS FETCHED AND VISIBLE
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
        timeout: 1000,
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

    const usernameInTable = await waitFor(
      () => screen.getByText("omkar261099", { exact: false }),
      {
        timeout: 3000,
      }
    );
    expect(usernameInTable).toBeInTheDocument();

    const nextBtn = await waitFor(
      () => screen.getByText("Next", { exact: false }),
      {
        timeout: 1000,
      }
    );
    expect(nextBtn).toBeInTheDocument();
    userEvent.click(nextBtn);

    const usernameInTable2 = await waitFor(
      () => screen.getByText("karthik-pillai", { exact: false }),
      {
        timeout: 3000,
      }
    );
    expect(usernameInTable2).toBeInTheDocument();

    const previousBtn = await waitFor(
      () => screen.getByText("Previous", { exact: false }),
      {
        timeout: 1000,
      }
    );
    userEvent.click(previousBtn);
    expect(previousBtn).toBeInTheDocument();

    // const usernameInTable =
    expect(
      await waitFor(() => screen.getByText("omkar261099", { exact: false }), {
        timeout: 3000,
      })
    ).toBeInTheDocument();
  });
});
