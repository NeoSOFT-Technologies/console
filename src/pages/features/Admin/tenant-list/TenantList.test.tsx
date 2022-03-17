import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import TenantList from "./TenantList";
import { Provider } from "react-redux";
import store from "../../../../store/index";

it("render without crashing TenantList", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <TenantList />
      </Provider>
    </BrowserRouter>
  );
});

it("renders active, inactive and all buttons", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <TenantList />
      </Provider>
    </BrowserRouter>
  );
  const activeBtn = screen.getByTestId("active");
  expect(activeBtn).toBeInTheDocument();
  fireEvent.click(activeBtn);

  const inactiveBtn = screen.getByTestId("inactive");
  expect(inactiveBtn).toBeInTheDocument();
  fireEvent.click(inactiveBtn);

  const allBtn = screen.getByTestId("all");
  expect(allBtn).toBeInTheDocument();
  fireEvent.click(allBtn);
});

// it("render searchBtn and inputBox", () => {
//   render(
//     <BrowserRouter>
//       <Provider store={store}>
//         <TenantList />
//       </Provider>
//     </BrowserRouter>
//   );
//   const searchBtn = screen.getByTestId("search-button");
//   expect(searchBtn).toBeInTheDocument();
//   fireEvent.click(searchBtn);

//   const inputBox = screen.getByTestId("input-group");
//   expect(inputBox).toBeInTheDocument();
//   fireEvent.change(inputBox, { target: { value: "akhilpinni" } });
//   expect(screen.getByTestId("input-group")).toHaveValue("akhilpinni");
// });
