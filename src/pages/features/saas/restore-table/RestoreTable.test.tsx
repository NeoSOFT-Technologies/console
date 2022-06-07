import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import mockApi from "../../../../resources/tenant/testconfig";
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

  it("Check if fields autofilled using API on component load", async () => {
    mockApi
      .onGet("manage/table/deletion/all-tables?pageNumber=1&pageSize=5")
      .reply(200, {
        statusCode: 200,
        message: "Successfully Retrieved All Tables Under Deletion",
        tableList: [{ tenantId: 1, tableName: "testTable" }],
      });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <GetTables />
        </Provider>
      </BrowserRouter>
    );

    // expect result
    const data = await waitFor(
      () => screen.getByText("testTable", { exact: false }),
      {
        timeout: 3000,
      }
    );
    expect(data).toBeInTheDocument();
  });

  it("Click Restore button", async () => {
    mockApi
      .onGet("manage/table/deletion/all-tables?pageNumber=1&pageSize=5")
      .reply(200, {
        statusCode: 200,
        message: "Successfully Retrieved All Tables Under Deletion",
        tableList: [{ tenantId: 1, tableName: "testTable" }],
      });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <GetTables />
        </Provider>
      </BrowserRouter>
    );

    // expect result
    const testTableText = await waitFor(
      () => screen.getByText("testTable", { exact: false }),
      {
        timeout: 3000,
      }
    );
    expect(testTableText).toBeInTheDocument();

    const restoreTableBtn = screen.getByTestId("restore-table-btn");
    expect(restoreTableBtn).toBeInTheDocument();
    userEvent.click(restoreTableBtn);

    const restoreBtn = await waitFor(
      () => screen.getByText("Yes, Restore", { exact: false }),
      {
        timeout: 3000,
      }
    );
    expect(restoreBtn).toBeInTheDocument();

    userEvent.click(restoreBtn);
  });

  it("Click Cancel button", async () => {
    mockApi
      .onGet("manage/table/deletion/all-tables?pageNumber=1&pageSize=5")
      .reply(200, {
        statusCode: 200,
        message: "Successfully Retrieved All Tables Under Deletion",
        tableList: [{ tenantId: 1, tableName: "testTable" }],
      });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <GetTables />
        </Provider>
      </BrowserRouter>
    );

    // expect result
    const testTableText = await waitFor(
      () => screen.getByText("testTable", { exact: false }),
      {
        timeout: 3000,
      }
    );
    expect(testTableText).toBeInTheDocument();

    const restoreTableBtn = screen.getByTestId("restore-table-btn");
    expect(restoreTableBtn).toBeInTheDocument();
    userEvent.click(restoreTableBtn);

    const cancelBtn = await waitFor(
      () => screen.getByText("No, Cancel", { exact: false }),
      {
        timeout: 3000,
      }
    );
    expect(cancelBtn).toBeInTheDocument();

    userEvent.click(cancelBtn);
  });
});
