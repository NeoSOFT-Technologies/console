import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import mockApi from "../../../../resources/tenant/testconfig";
import store from "../../../../store/index";
import GetTables from "./CreateTables";

describe("SAAS - ADD TABLE Component", () => {
  it("Check if components rendered", () => {
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

    const addNewColBtn = screen.getByText("Add Column", {
      exact: false,
    });
    expect(addNewColBtn).toBeInTheDocument();

    const addSaveBtn = screen.getByText("Save", {
      exact: false,
    });
    expect(addSaveBtn).toBeInTheDocument();
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

    mockApi.onGet("manage/table/capacity-plans").reply(200, {
      statusCode: 200,
      message: "Successfully retrieved all Capacity Plans",
      plans: [
        { sku: "B", name: "Basic", replicas: 1, shards: 1 },
        { sku: "S1", name: "Standard", replicas: 2, shards: 2 },
        { sku: "S2", name: "Standard", replicas: 2, shards: 3 },
        { sku: "S3", name: "Standard", replicas: 3, shards: 7 },
        { sku: "P", name: "Premium", replicas: 3, shards: 5 },
      ],
    });

    mockApi.onPost("manage/table/?tenantId=1").reply(200, {
      statusCode: 200,
      message: "Table-testTable, is created successfully",
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <GetTables />
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

    const tableNameInput = await waitFor(
      () => screen.getByTestId("table-name-input-box"),
      {
        timeout: 500,
      }
    );
    expect(tableNameInput).toBeInTheDocument();
    fireEvent.change(tableNameInput, {
      target: { value: "testTable" },
    });

    const capacityPlanDropdown = await waitFor(
      () => screen.getByTestId("capacity-plan-dropdown"),
      {
        timeout: 500,
      }
    );
    expect(capacityPlanDropdown).toBeInTheDocument();

    userEvent.selectOptions(capacityPlanDropdown, ["B"]);

    const addColumnBtn = await waitFor(
      () => screen.getByTestId("add-column-button"),
      {
        timeout: 500,
      }
    );
    expect(addColumnBtn).toBeInTheDocument();
    userEvent.click(addColumnBtn);

    const colNameInPopup = await waitFor(
      () => screen.getByTestId("column-name-popup"),
      {
        timeout: 500,
      }
    );
    expect(colNameInPopup).toBeInTheDocument();
    fireEvent.change(colNameInPopup, {
      target: { value: "testColumn" },
    });

    const addColumnBtnInPopup = await waitFor(
      () => screen.getByTestId("add-column-btn-popup"),
      {
        timeout: 500,
      }
    );
    expect(addColumnBtnInPopup).toBeInTheDocument();
    userEvent.click(addColumnBtnInPopup);

    //= ===============================================
    const capacityPlanInfoBtn = await waitFor(
      () => screen.getByTestId("capacity-plan-info-btn"),
      {
        timeout: 500,
      }
    );
    expect(capacityPlanInfoBtn).toBeInTheDocument();
    userEvent.click(capacityPlanInfoBtn);

    const capacityPlanInfoCloseBtn = await waitFor(
      () => screen.getByTestId("capacity-plan-info-close-btn"),
      {
        timeout: 500,
      }
    );
    expect(capacityPlanInfoCloseBtn).toBeInTheDocument();
    userEvent.click(capacityPlanInfoCloseBtn);
    //= ===============================================

    const saveTableBtn = await waitFor(
      () => screen.getByTestId("save-table-button"),
      {
        timeout: 500,
      }
    );
    expect(saveTableBtn).toBeInTheDocument();
    userEvent.click(saveTableBtn);
  });
});
