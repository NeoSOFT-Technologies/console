import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../store/index";
import TenantList from "./TenantList";

it("render without crashing TenantList", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <TenantList />
      </Provider>
    </BrowserRouter>
  );
});

it("renders active, inactive and all buttons", async () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <TenantList />
      </Provider>
    </BrowserRouter>
  );
  const activeBtn = await screen.getByTestId("active");
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
