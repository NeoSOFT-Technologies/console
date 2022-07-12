import { render } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../store/index";
import KeyList from "./KeyList";

const mockApi = new MockAdapter(axios);

it("render without crashing Tenant list", () => {
  mockApi.onGet("/api/tenants?isDeleted=false&page=1").reply(200, {
    data: [
      {
        Id: "9dd100136a6a4e00af04bcece0eb1c8a",
        KeyName: "key1",
        IsActive: true,
        Expires: 0,
        Policies: [],
        CreatedDate: "2022-07-07T14:09:40.405677+00:00",
      },
    ],
    count: 1,
  });
  render(
    <BrowserRouter>
      <Provider store={store}>
        <KeyList />
      </Provider>
    </BrowserRouter>
  );
});

// {
//     "TotalCount": 1,
//     "Page": 0,
//     "PageSize": 0,
//     "Succeeded": true,
//     "Message": null,
//     "Errors": null,
//     "Data": {
//       "Keys": [
//         {
//           "Id": "9dd100136a6a4e00af04bcece0eb1c8a",
//           "KeyName": "key1",
//           "IsActive": true,
//           "Expires": null,
//           "Policies": [],
//           "CreatedDate": "2022-07-07T14:09:40.405677+00:00"
//         }
//       ]
//     }
//   }
