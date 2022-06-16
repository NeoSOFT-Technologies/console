import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import mockApi from "../../../../resources/tenant/testconfig";
import store from "../../../../store/index";
import InsertData from "./InsertData";

describe("SAAS - INSERT DATA Component", () => {
  it("Check if H1 rendered", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <InsertData />
        </Provider>
      </BrowserRouter>
    );

    const insertDataH1Tag = screen.getByText("Insert Data", {
      exact: false,
    });
    expect(insertDataH1Tag).toBeInTheDocument();
  });

  it("Check if Save button rendered", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <InsertData />
        </Provider>
      </BrowserRouter>
    );

    const saveButtonElement = screen.getByRole("button", {
      name: /save/i,
    });
    expect(saveButtonElement).toBeInTheDocument();
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

    mockApi.onGet("manage/table/?tenantId=1").reply(200, {
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
            type: "strings",
            required: true,
            partialSearch: false,
            multiValue: true,
            sortable: false,
            filterable: true,
            storable: true,
          },
          {
            name: "username",
            type: "strings",
            required: true,
            partialSearch: false,
            multiValue: true,
            sortable: false,
            filterable: true,
            storable: true,
          },
        ],
      },
    });

    mockApi.onPost("ingest/testTable?tenantId=1").reply(200, {
      statusCode: 200,
      message: "Successfully Added!",
      maxAllowedRequestSize: "100000000kB",
      incomingRequestSize: "0.136kB",
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <InsertData />
        </Provider>
      </BrowserRouter>
    );

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

    const jsonInputField = await screen.getByTestId("json-input-box");
    fireEvent.change(jsonInputField, {
      target: {
        value: '[{"id":"1","name":"karthik","username":"karthik"}]',
      },
    });

    const saveBtn = screen.getByTestId("save-btn");
    expect(saveBtn).toBeInTheDocument();
    userEvent.click(saveBtn);

    const successPopUpBottomRight = await waitFor(
      () => screen.getByText("Data Saved successfully", { exact: false }),
      {
        timeout: 5000,
      }
    );
    expect(successPopUpBottomRight).toBeInTheDocument();
  });
});
