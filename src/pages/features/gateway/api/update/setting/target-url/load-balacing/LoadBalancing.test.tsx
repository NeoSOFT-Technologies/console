import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../../../../store";
import LoadBalancing from "./LoadBalancing";

it("render without crashing LoadBalancing", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <LoadBalancing />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});

it("render buttons and inputs", () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Provider store={store}>
        <LoadBalancing />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const loadTargetInput = getByTestId("loadTargets-input");
  expect(loadTargetInput).toBeInTheDocument();
  fireEvent.change(loadTargetInput, {
    target: { value: "https://httpbin.org" },
  });
  expect(loadTargetInput).toHaveValue("https://httpbin.org");
  fireEvent.change(loadTargetInput);

  const addBtn = getByTestId("add-button");
  expect(addBtn).toBeInTheDocument();
  fireEvent.click(addBtn);

  const weighting = getByTestId("weighting");
  expect(weighting).toBeInTheDocument();
  fireEvent.change(weighting, { target: { value: "2" } });

  const deleteBtn = getByTestId("deleteRow-button");
  expect(deleteBtn).toBeInTheDocument();
  fireEvent.click(deleteBtn);
});

it("check validations", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <LoadBalancing />
      </Provider>
    </BrowserRouter>
  );
  const targeturlInput = screen.getByTestId("loadTargets-input");
  fireEvent.change(targeturlInput, {
    target: { value: "wrongurl" },
  });
  const targeturl = screen.getByTestId("loadTargetErr");
  expect(targeturl).toHaveTextContent("Enter a valid Url");
});
