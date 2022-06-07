import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import mockApi from "../../../../resources/tenant/testconfig";
import store from "../../../../store/index";
import GetTables from "./CreateTable";

describe("SAAS - ADD TABLE Component", () => {
  it("Check if H1 rendered", () => {
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
  });

  it("Check if Add New Column Button rendered", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <GetTables />
        </Provider>
      </BrowserRouter>
    );

    const addNewColBtn = screen.getByText("Add Column", {
      exact: false,
    });
    expect(addNewColBtn).toBeInTheDocument();
  });

  it("Check if Save Button rendered", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <GetTables />
        </Provider>
      </BrowserRouter>
    );

    const addSaveBtn = screen.getByText("Save", {
      exact: false,
    });
    expect(addSaveBtn).toBeInTheDocument();
  });

  it("Check if capacity plans renders after getting data from API call", async () => {
    mockApi
      .onGet("http://localhost:8083/api/v1/manage/table/capacity-plans")
      .reply(200, {
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

    render(
      <BrowserRouter>
        <Provider store={store}>
          <GetTables />
        </Provider>
      </BrowserRouter>
    );

    const userInputField = await screen.getByPlaceholderText(/user/i);
    expect(userInputField).toBeInTheDocument();
    fireEvent.change(userInputField, { target: { value: "1" } });

    const tableNameField = await screen.getByPlaceholderText(/table name/i);
    expect(tableNameField).toBeInTheDocument();
    fireEvent.change(tableNameField, { target: { value: "testTable" } });

    const getCapacitiesBtn = screen.getByTestId("select-capacity-btn");
    expect(getCapacitiesBtn).toBeInTheDocument();
    // fireEvent.click(getTablesBtn);
    userEvent.click(getCapacitiesBtn);

    const s1CapacityPlan = await waitFor(
      () => screen.getByText("S1", { exact: false }),
      {
        timeout: 3000,
      }
    );
    expect(s1CapacityPlan).toBeInTheDocument();
    userEvent.click(s1CapacityPlan);

    const addNewColBtn = screen.getByText("Add Column", {
      exact: false,
    });
    expect(addNewColBtn).toBeInTheDocument();
    userEvent.click(addNewColBtn);

    const colNameInputField = await waitFor(
      () => screen.getByPlaceholderText(/name/i),
      {
        timeout: 3000,
      }
    );
    expect(colNameInputField).toBeInTheDocument();
    fireEvent.change(colNameInputField, { target: { value: "testTable" } });

    const typeInputField = await waitFor(
      () => screen.getByPlaceholderText(/type/i),
      {
        timeout: 3000,
      }
    );
    expect(typeInputField).toBeInTheDocument();
    fireEvent.change(typeInputField, { target: { value: "string" } });

    const addNewColPopupBtn = await waitFor(
      () => screen.getByTestId("add-col-popup"),
      {
        timeout: 1000,
      }
    );
    expect(addNewColPopupBtn).toBeInTheDocument();
    userEvent.click(addNewColPopupBtn);
  });
});
