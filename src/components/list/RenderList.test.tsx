// import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { render } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../store";
import RenderList1 from "./RenderList";

const mockApi = new MockAdapter(axios);

it("render without crashing RenderList", async () => {
  mockApi
    .onGet("/api/tenants?isDeleted=false&page=1")
    .reply(200, { data: [{ name: "Rohit" }], count: 1 });
  render(
    <BrowserRouter>
      <Provider store={store}>
        <RenderList1
          searchBy=""
          headings={[
            {
              name: "Name",
              data: "name",
              width: "100",
            },
          ]}
          url="api/tenants?isDeleted=false&"
          actions={{
            classNames: "",
            func: (val) => {
              console.log(val);
            },
          }}
        />
      </Provider>
    </BrowserRouter>
  );

  // await waitFor(() => {
  //   const actionBtn = screen.getByTestId("action-btn");
  //   expect(actionBtn).toBeInTheDocument();
  //   fireEvent.click(actionBtn);
  // });
});
