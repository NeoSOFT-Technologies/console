import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
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
});
