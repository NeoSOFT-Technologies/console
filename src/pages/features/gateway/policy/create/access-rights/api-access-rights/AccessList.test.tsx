import { render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import AccessList from "./AccessList";

const mockStore = configureStore([thunk]);
const store = mockStore({
  createPolicyState: {
    loading: false,
    data: {
      form: {
        Name: "",
        Active: true,
        KeysInactive: true,
        Quota: -1,
        QuotaRenewalRate: -1,
        Rate: 0,
        Per: 0,
        ThrottleInterval: -1,
        ThrottleRetries: -1,
        State: "active",
        KeyExpiresIn: 0,
        Tags: [],
        APIs: [],
        Partitions: {
          quota: false,
          rate_limit: false,
          complexity: false,
          acl: false,
          per_api: true,
        },
      },
    },
  },
  apiListState: {
    loading: false,
    data: {
      Apis: {
        Action: "get",
        Name: "api1",
        CreatedDate: "",
        TargetUrl: "https://httpbin.org",
        IsActive: true,
        Id: "0",
        AuthType: "standard",
      },
    },
  },
});
it("Test render of AccessList", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <AccessList />
      </Provider>
    </BrowserRouter>
  );
});
