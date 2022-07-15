import { render, screen, waitFor, fireEvent } from "@testing-library/react";
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
      .onGet(
        "https://iam-dev-saas.neosofttech.com/api/v1/manage/table/testTable?tenantId=1"
      )
      .reply(200, {
        statusCode: 200,
        message: "Table Information retrieved successfully",
        data: {
          tableName: "testTable",
          tableInfo: {
            replicationFactor: 1,
            noOfShards: 1,
            tenantInfo: {
              tenantName: "Tenant1",
            },
          },
          columns: [
            {
              name: "name",
              type: "string",
              required: false,
              partialSearch: false,
              multiValue: false,
              sortable: false,
              filterable: false,
              storable: true,
            },
          ],
        },
      });

    mockApi
      .onPut(
        "https://iam-dev-saas.neosofttech.com/api/v1/manage/table/testTable?tenantId=1"
      )
      .reply(200, {
        statusCode: 200,
        message: "Table is updated successfully",
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

    const testTableInputText = screen.getByTestId("table-name-input", {
      exact: false,
    });
    expect(testTableInputText).toBeInTheDocument();

    //= ===============================================================
    const editColBtn = await waitFor(() => screen.getByTestId("edit-col-btn"), {
      timeout: 3000,
    });
    expect(editColBtn).toBeInTheDocument();
    userEvent.click(editColBtn);

    // userEvent.click(editColBtn);

    const closeModalBtn = await waitFor(
      () => screen.getByTestId("close-modal-btn"),
      {
        timeout: 3000,
      }
    );
    expect(closeModalBtn).toBeInTheDocument();
    userEvent.click(closeModalBtn);
    //= ===============================================================

    //= ===============================================================
    const deleteColBtn = await waitFor(
      () => screen.getByTestId("delete-col-btn"),
      {
        timeout: 3000,
      }
    );
    expect(deleteColBtn).toBeInTheDocument();
    userEvent.click(deleteColBtn);

    const popupNoCancelForDelete = await waitFor(
      () => screen.getByText("No, Cancel", { exact: true }),
      {
        timeout: 3000,
      }
    );
    expect(popupNoCancelForDelete).toBeInTheDocument();
    userEvent.click(popupNoCancelForDelete);

    userEvent.click(deleteColBtn);

    const popupYesDeleteForDelete = await waitFor(
      () => screen.getByText("Yes, Delete", { exact: false }),
      {
        timeout: 3000,
      }
    );
    expect(popupYesDeleteForDelete).toBeInTheDocument();
    userEvent.click(popupYesDeleteForDelete);
    //= ===============================================================

    const saveChangesBtn = await waitFor(() => screen.getByText("Save"), {
      timeout: 1000,
    });
    expect(saveChangesBtn).toBeInTheDocument();
    userEvent.click(saveChangesBtn);

    //= ===============================================================
    const addColBtn = await waitFor(() => screen.getByTestId("add-col-btn"), {
      timeout: 100,
    });
    expect(addColBtn).toBeInTheDocument();
    userEvent.click(addColBtn);

    const addColNameInput = screen.getByTestId("add-col-name-input");
    fireEvent.change(addColNameInput, {
      target: { value: "id" },
    });

    const addColSubmitBtn = await waitFor(
      () => screen.getByTestId("save-col-change-btn"),
      {
        timeout: 500,
      }
    );
    expect(addColSubmitBtn).toBeInTheDocument();
    userEvent.click(addColSubmitBtn);

    userEvent.click(addColSubmitBtn);
    //= ===============================================================

    const sendUpdateRequestBtn = await waitFor(
      () => screen.getByTestId("send-update-request-btn"),
      {
        timeout: 100,
      }
    );
    expect(sendUpdateRequestBtn).toBeInTheDocument();
    userEvent.click(sendUpdateRequestBtn);
  });
});
