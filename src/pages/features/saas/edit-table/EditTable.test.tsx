import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import mockApi from "../../../../resources/tenant/testconfig";
import store from "../../../../store/index";
import GetTables from "./EditTable";

describe("SAAS - EDIT TABLE Component", () => {
  it("Check if H1 rendered", () => {
    render(
      <MemoryRouter
        initialEntries={[
          { pathname: "/", state: { tableName: "testTable", tenantId: 1 } },
        ]}
      >
        <Provider store={store}>
          <GetTables />
        </Provider>
      </MemoryRouter>
    );

    const editDataH1Tag = screen.getByText("Edit Table", {
      exact: false,
    });
    expect(editDataH1Tag).toBeInTheDocument();
  });

  it("Check if Save Button rendered", () => {
    render(
      <MemoryRouter
        initialEntries={[
          { pathname: "/", state: { tableName: "testTable", tenantId: 1 } },
        ]}
      >
        <Provider store={store}>
          <GetTables />
        </Provider>
      </MemoryRouter>
    );

    const saveBtn = screen.getByText("Save", {
      exact: false,
    });
    expect(saveBtn).toBeInTheDocument();
  });

  it("Check if fields autofilled using API on component load & entire editing flow", async () => {
    mockApi
      .onGet("http://localhost:8083/api/v1/manage/table/testTable?tenantId=1")
      .reply(200, {
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
          ],
        },
      });

    render(
      <MemoryRouter
        initialEntries={[
          { pathname: "/", state: { tableName: "testTable", tenantId: 1 } },
        ]}
      >
        {/* <BrowserRouter> */}
        <Provider store={store}>
          <GetTables />
        </Provider>
        {/* </BrowserRouter> */}
      </MemoryRouter>
    );

    const testTableInputText = screen.getByText("testTable", {
      exact: false,
    });
    expect(testTableInputText).toBeInTheDocument();

    const editColBtn = await waitFor(() => screen.getByTestId("edit-col-btn"), {
      timeout: 3000,
    });
    expect(editColBtn).toBeInTheDocument();
    userEvent.click(editColBtn);

    const saveChangesBtn = await waitFor(
      () => screen.getByText("Save changes"),
      {
        timeout: 3000,
      }
    );
    expect(saveChangesBtn).toBeInTheDocument();
    userEvent.click(saveChangesBtn);
  });
});
