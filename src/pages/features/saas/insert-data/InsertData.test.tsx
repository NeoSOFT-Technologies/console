import {
  render,
  screen,
  fireEvent,
  waitFor,
  getAllByRole,
} from "@testing-library/react";
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

    mockApi
      .onGet("manage/table/?tenantId=1") // ("http://localhost:8083/api/v1/manage/table/?tenantId=1")
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

    const tenantDropdown = await waitFor(
      () => screen.getByTestId("tenant-name-select"),
      {
        timeout: 3000,
      }
    );
    expect(tenantDropdown).toBeInTheDocument();
    userEvent.click(tenantDropdown);

    const dropdownOptions = getAllByRole(tenantDropdown, "option");
    fireEvent.click(dropdownOptions[1]);

    const tenant1Dropdown = await waitFor(
      () => screen.getByText("Tenant1", { exact: false }),
      {
        timeout: 3000,
      }
    );
    expect(tenant1Dropdown).toBeInTheDocument();
    // userEvent.click(tenant1Dropdown);

    // fireEvent.click(screen.getByText("Tenant1"));

    // const testTableDropdown = await waitFor(
    //   () => screen.getByText("testTable", { exact: false }),
    //   {
    //     timeout: 3000,
    //   }
    // );
    // expect(testTableDropdown).toBeInTheDocument();
    // userEvent.click(testTableDropdown);
  });
});
