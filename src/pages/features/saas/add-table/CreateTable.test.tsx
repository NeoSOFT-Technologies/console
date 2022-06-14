import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import mockApi from "../../../../resources/tenant/testconfig";
import store from "../../../../store/index";
import GetTables from "./CreateTable";

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

    mockApi.onGet("manage/table/?tenantId=1").reply(200, {
      statusCode: 200,
      message: "Successfully retrieved all tables",
      data: ["testTable"],
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
          <GetTables />
        </Provider>
      </BrowserRouter>
    );

    const tenantIDInput = await waitFor(
      () => screen.getByTestId("tenant-id-input-box"),
      {
        timeout: 500,
      }
    );
    expect(tenantIDInput).toBeInTheDocument();
    fireEvent.change(tenantIDInput, {
      target: { value: "1" },
    });

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
    userEvent.click(capacityPlanDropdown);

    const capacityPlanB = await waitFor(
      () => screen.getByText("B", { exact: true }),
      {
        timeout: 500,
      }
    );
    expect(capacityPlanB).toBeInTheDocument();
    userEvent.click(capacityPlanB);

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

    const colTypeInPopup = await waitFor(
      () => screen.getByTestId("column-type-popup"),
      {
        timeout: 500,
      }
    );
    expect(colTypeInPopup).toBeInTheDocument();
    fireEvent.change(colTypeInPopup, {
      target: { value: "string" },
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
