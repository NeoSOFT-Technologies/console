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

  it("Check if table name populates on entering tenant id", async () => {
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
          <InsertData />
        </Provider>
      </BrowserRouter>
    );

    const tenantIdField = await screen.getByPlaceholderText(/user/i);
    expect(tenantIdField).toBeInTheDocument();
    fireEvent.change(tenantIdField, { target: { value: "1" } });

    // expect result
    const testTableDropdown = await waitFor(
      () => screen.getByText("testTable", { exact: false }),
      {
        timeout: 3000,
      }
    );
    expect(testTableDropdown).toBeInTheDocument();
    userEvent.click(testTableDropdown);

    const jsonInputField = await screen.getByPlaceholderText(/json input/i);
    expect(jsonInputField).toBeInTheDocument();
    fireEvent.change(tenantIdField, {
      target: { value: '[{"name":"karthik"}]' },
    });

    const saveButtonElement = screen.getByRole("button", {
      name: /save/i,
    });
    expect(saveButtonElement).toBeInTheDocument();
    userEvent.click(saveButtonElement);
  });
});
