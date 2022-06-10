import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import mockApi from "../../../../resources/tenant/testconfig";
import store from "../../../../store/index";
import ManageTable from "./ManageTable";

describe("SAAS - MANAGE TABLE Component", () => {
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

  it("Check if fields autofilled using API on component load", async () => {
    mockApi
      .onGet("manage/table/all-tables?pageNumber=1&pageSize=6")
      .reply(200, {
        statusCode: 200,
        message: "Successfully retrieved all Tables From The Server",
        tableList: [
          { tenantId: 1, tableName: "testTable" },
          { tenantId: 1, tableName: "karthik" },
        ],
      });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <ManageTable />
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

  it("Check if delete button works", async () => {
    mockApi
      .onGet("manage/table/all-tables?pageNumber=1&pageSize=6")
      .reply(200, {
        statusCode: 200,
        message: "Successfully retrieved all Tables From The Server",
        tableList: [{ tenantId: 1, tableName: "testTable" }],
      });

    mockApi.onDelete("manage/table/testTable?tenantId=1").reply(200, {
      statusCode: 200,
      message:
        "Table:testTable Having TenantID: 1 is Successfully Initialized For Deletion ",
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <ManageTable />
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

    const deleteTableBtn = screen.getByTestId("delete-table-btn");
    expect(deleteTableBtn).toBeInTheDocument();
    userEvent.click(deleteTableBtn);

    const cancelBtn = await waitFor(
      () => screen.getByText("No, Cancel", { exact: false }),
      {
        timeout: 3000,
      }
    );
    expect(cancelBtn).toBeInTheDocument();
    userEvent.click(cancelBtn);

    // ====================================================================

    expect(deleteTableBtn).toBeInTheDocument();
    userEvent.click(deleteTableBtn);

    const confirmBtn = await waitFor(
      () => screen.getByText("Yes, Delete", { exact: false }),
      {
        timeout: 3000,
      }
    );
    expect(confirmBtn).toBeInTheDocument();
    userEvent.click(confirmBtn);

    const successMessage = await waitFor(
      () => screen.getByText("Table Deleted successfully", { exact: false }),
      {
        timeout: 3000,
      }
    );
    expect(successMessage).toBeInTheDocument();
  });

  it("Check if edit button works", async () => {
    mockApi
      .onGet("manage/table/all-tables?pageNumber=1&pageSize=6")
      .reply(200, {
        statusCode: 200,
        message: "Successfully retrieved all Tables From The Server",
        tableList: [{ tenantId: 1, tableName: "testTable" }],
      });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <ManageTable />
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

    const editTableBtn = screen.getByTestId("edit-table-btn");
    expect(editTableBtn).toBeInTheDocument();
    // fireEvent.click(getTablesBtn);
    userEvent.click(editTableBtn);
    const cancelBtn = await waitFor(
      () => screen.getByText("No, Cancel", { exact: false }),
      {
        timeout: 3000,
      }
    );
    expect(cancelBtn).toBeInTheDocument();
    userEvent.click(cancelBtn);

    // ====================================================================

    expect(editTableBtn).toBeInTheDocument();
    // fireEvent.click(getTablesBtn);
    userEvent.click(editTableBtn);

    const confirmBtn = await waitFor(
      () => screen.getByText("Yes, Edit", { exact: false }),
      {
        timeout: 3000,
      }
    );
    expect(confirmBtn).toBeInTheDocument();
    userEvent.click(confirmBtn);
  });

  it("Check if prev and next button work", async () => {
    mockApi
      .onGet("manage/table/all-tables?pageNumber=1&pageSize=6")
      .reply(200, {
        statusCode: 200,
        message: "Successfully retrieved all Tables From The Server",
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
      .onGet("manage/table/all-tables?pageNumber=2&pageSize=6")
      .reply(200, {
        statusCode: 200,
        message: "Successfully retrieved all Tables From The Server",
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
          <ManageTable />
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
