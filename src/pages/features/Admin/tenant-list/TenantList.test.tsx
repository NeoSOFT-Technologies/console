import { render } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../store/index";
import TenantList from "./TenantList";

const mockApi = new MockAdapter(axios);

it("render without crashing Tenant list", () => {
  mockApi.onGet("api/tenants?tenantName=paras&page=1").reply(200, {
    data: [
      {
        id: 2,
        tenantName: "Paras",
        email: "Paras@gmail.com",
        description: "qwerty",
        databaseName: "db-Paras",
        databaseDescription: "Paras",
        createdDateTime: "2022/04/12 05:41:55",
      },
    ],
    count: 1,
  });
  render(
    <BrowserRouter>
      <Provider store={store}>
        <TenantList />
      </Provider>
    </BrowserRouter>
  );
});
it("render without crashing Tenant list", () => {
  mockApi.onGet("api/tenants?tenantName=paras&page=1").reply(404, {});
  render(
    <BrowserRouter>
      <Provider store={store}>
        <TenantList />
      </Provider>
    </BrowserRouter>
  );
});
// it("render without crashing Tenant list", () => {
//   mockApi.onGet("/api/tenants?isDeleted=false&").reply(400, {});
//   render(
//     <BrowserRouter>
//       <Provider store={store}>
//         <TenantList />
//       </Provider>
//     </BrowserRouter>
//   );
// });

// it("render the active, inactive and all buttons", () => {
//   mockApi
//     .onGet("/api/tenants?isDeleted=false&")
//     .reply(200, { data: [{ name: "Rohit" }], count: 1 });
//   render(
//     <BrowserRouter>
//       <Provider store={store}>
//         <TenantList />
//       </Provider>
//     </BrowserRouter>
//   );

//   const activeButton = screen.getByTestId("active");
//   expect(activeButton).toBeInTheDocument();
//   fireEvent.click(activeButton);

//   const inActiveButton = screen.getByTestId("inactive");
//   expect(inActiveButton).toBeInTheDocument();
//   fireEvent.click(inActiveButton);

//   const allButton = screen.getByTestId("all");
//   expect(allButton).toBeInTheDocument();
//   fireEvent.click(allButton);
// });
