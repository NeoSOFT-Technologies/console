import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import mockApi from "../../../../resources/tenant/testconfig";
import store from "../../../../store/index";
import GetTables from "./GetTables";

describe("SAAS - GET Tables Component", () => {
  it("Render without crashing", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <GetTables />
        </Provider>
      </BrowserRouter>
    );
  });

  it("Check if button rendered", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <GetTables />
        </Provider>
      </BrowserRouter>
    );

    const getTablesBtnElement = screen.getByText("Get Tables", {
      exact: false,
    });
    expect(getTablesBtnElement).toBeInTheDocument();
  });

  it("Check if outputting value", async () => {
    mockApi.onGet("?tenantId=1").reply(200, {
      statusCode: 200,
      message: "Successfully retrieved all tables",
      data: ["testTable"],
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <GetTables />
        </Provider>
      </BrowserRouter>
    );

    const tenantIdField = await screen.getByPlaceholderText(/enter tenant id/i);
    expect(tenantIdField).toBeInTheDocument();
    fireEvent.change(tenantIdField, { target: { value: "1" } });

    const getTablesBtn = screen.getByTestId("get-tables-btn");
    expect(getTablesBtn).toBeInTheDocument();
    fireEvent.click(getTablesBtn);
  });

  it("Check if component renders after getting data from API call", async () => {
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
          <GetTables />
        </Provider>
      </BrowserRouter>
    );

    const tenantIdField = await screen.getByPlaceholderText(/enter tenant id/i);
    expect(tenantIdField).toBeInTheDocument();
    fireEvent.change(tenantIdField, { target: { value: "1" } });

    const getTablesBtn = screen.getByTestId("get-tables-btn");
    expect(getTablesBtn).toBeInTheDocument();
    // fireEvent.click(getTablesBtn);
    userEvent.click(getTablesBtn);

    // expect result
    const data = await waitFor(
      () => screen.getByText("testTable", { exact: false }),
      {
        timeout: 3000,
      }
    );
    expect(data).toBeInTheDocument();
  });
});
