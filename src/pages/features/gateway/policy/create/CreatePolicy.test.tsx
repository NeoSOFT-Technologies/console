import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import CreatePolicy from "./CreatePolicy";
import { store } from "./access-rights/api-access-rights/AccessList.test";

describe("Create policy component", () => {
  it("render without crashing CreatePolicy", async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <CreatePolicy />
        </Provider>
      </BrowserRouter>
    );
  });
  it("check all buttons and inputs", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <CreatePolicy />
        </Provider>
      </BrowserRouter>
    );
    const createPolicyHeading = screen.getByText("CREATE POLICY");
    expect(createPolicyHeading).toBeInTheDocument();

    const cancelBtn = screen.getByText("Cancel");
    expect(cancelBtn).toBeInTheDocument();
    fireEvent.click(cancelBtn);

    const formInput = screen.getByTestId("form-input");
    expect(formInput).toBeInTheDocument();
    fireEvent.submit(formInput);

    const accessRightsTab = screen.getByRole("tab", { name: "Access Rights" });
    fireEvent.click(accessRightsTab);
    expect(screen.getByRole("tab", { selected: true })).toHaveTextContent(
      "Access Rights"
    );

    const globalRateLimitHeading = screen.getByText("GlobalRateLimit");
    expect(globalRateLimitHeading).toBeInTheDocument();

    const ConfigurationsTab = screen.getByRole("tab", {
      name: "Configurations",
    });
    fireEvent.click(ConfigurationsTab);
    expect(screen.getByRole("tab", { selected: true })).toHaveTextContent(
      "Configurations"
    );
  });
});
