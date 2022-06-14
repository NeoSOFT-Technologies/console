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
      .onGet("manage/table/deletion/all-tables?pageNumber=1&pageSize=6")
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
      .onGet("manage/table/deletion/all-tables?pageNumber=1&pageSize=6")
      .reply(200, {
        statusCode: 200,
        message: "Successfully Retrieved All Tables Under Deletion",
        tableList: [{ tenantId: 1, tableName: "testTable" }],
      });

    mockApi.onPut("manage/table/restore/testTable?tenantId=1").reply(200, {
      statusCode: 200,
      message: "Restore Deletion of Table omkar Performed Successfully",
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

    const successMessage = await waitFor(
      () => screen.getByText("Table restored successfully", { exact: false }),
      {
        timeout: 3000,
      }
    );
    expect(successMessage).toBeInTheDocument();
  });

  it("Click Cancel button", async () => {
    mockApi
      .onGet("manage/table/deletion/all-tables?pageNumber=1&pageSize=6")
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

  it("Check if next and prev btns working", async () => {
    mockApi
      .onGet("manage/table/deletion/all-tables?pageNumber=1&pageSize=6")
      .reply(200, {
        statusCode: 200,
        message: "Successfully Retrieved All Tables Under Deletion",
        tableList: [
          { tenantId: 1, tableName: "testTable1" },
          { tenantId: 1, tableName: "testTable2" },
          { tenantId: 1, tableName: "testTable3" },
          { tenantId: 1, tableName: "testTable4" },
          { tenantId: 1, tableName: "testTable5" },
          { tenantId: 1, tableName: "testTable6" },
        ],
      });

    mockApi
      .onGet("manage/table/deletion/all-tables?pageNumber=2&pageSize=6")
      .reply(200, {
        statusCode: 200,
        message: "Successfully Retrieved All Tables Under Deletion",
        tableList: [
          { tenantId: 1, tableName: "testTable7" },
          { tenantId: 1, tableName: "testTable8" },
          { tenantId: 1, tableName: "testTable9" },
          { tenantId: 1, tableName: "testTable_10" },
          { tenantId: 1, tableName: "testTable_11" },
          { tenantId: 1, tableName: "testTable_12" },
        ],
      });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <GetTables />
        </Provider>
      </BrowserRouter>
    );

    expect(
      await waitFor(() => screen.getByText("testTable1", { exact: false }), {
        timeout: 3000,
      })
    ).toBeInTheDocument();

    const nextBtn = await waitFor(
      () => screen.getByText("Next", { exact: false }),
      {
        timeout: 3000,
      }
    );
    expect(nextBtn).toBeInTheDocument();
    userEvent.click(nextBtn);

    expect(
      await waitFor(() => screen.getByText("testTable8", { exact: false }), {
        timeout: 3000,
      })
    ).toBeInTheDocument();

    const previousBtn = await waitFor(
      () => screen.getByText("Previous", { exact: false }),
      {
        timeout: 3000,
      }
    );
    userEvent.click(previousBtn);
    expect(previousBtn).toBeInTheDocument();

    expect(
      await waitFor(() => screen.getByText("testTable1", { exact: false }), {
        timeout: 3000,
      })
    ).toBeInTheDocument();
  });
});
