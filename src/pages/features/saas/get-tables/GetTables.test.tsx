import { render, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../store/index";
import GetTables from "./GetTables";

const mockApi = new MockAdapter(axios);

describe("SAAS - GET Tables Component", () => {
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

  it("Check if input box rendered", async () => {
    mockApi.onGet("/api/v1/manage/table?tenantId=1").reply(200, {
      statusCode: 200,
      message: "Successfully retrieved all tables",
      data: ["test"],
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <GetTables />
        </Provider>
      </BrowserRouter>
    );

    const tenantIdField = await screen.getByPlaceholderText(/enter tenant id/i);
    // userEvent.type(tenantIdField, '1');

    // const buttonElement=screen.getByRole('button', {
    //   name: /Get Tables/i
    // });
    // userEvent.click(buttonElement);

    // const getTablesBtnElement = await screen.getByText("Table Name", {
    //   exact: false,
    // });
    expect(tenantIdField).toBeInTheDocument();
  });
});
