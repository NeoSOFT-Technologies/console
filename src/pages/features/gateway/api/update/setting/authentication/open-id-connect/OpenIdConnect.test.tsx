import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { componentStore } from "../../../mock-store";
import OepnIdConnect from "./OpenIdConnect";

const mockStore = configureStore([thunk]);
const store = componentStore("openIdConnect");

const store2 = mockStore({
  policyListState: {
    loading: false,
    data: {
      Policies: [
        {
          Action: "",
          Id: "0",
          Name: "policy1",
          State: "active",
          Apis: ["api1", "api2"],
          AuthType: "standard",
        },
      ],
    },
  },
  updateApiState: {
    loading: false,
    data: {
      form: {
        ApiId: 0,
        Name: "api1",
        ListenPath: "/api1/",
        StripListenPath: true,
        TargetUrl: "https://httpbin.org",
        IsActive: true,
        AuthType: "standard",
        RateLimit: {
          Rate: 5,
          Per: 10,
          IsDisabled: true,
        },
        VersioningInfo: {
          Location: 1,
          Key: "key",
        },
        Versions: [
          {
            Name: "default",
            OverrideTarget: "https://httpbin.org2",
          },
        ],
        Blacklist: [process.env.IP_ADDRESS],
        Whitelist: [process.env.IP_ADDRESS],
        OpenidOptions: {
          Providers: [
            {
              Issuer: "issuer",
              Client_ids: [],
            },
          ],
        },

        CORS: {
          IsEnabled: false,
          AllowedOrigins: ["https://google.co.in"],
          AllowedMethods: ["GET"],
          AllowedHeaders: ["ABC"],
          ExposedHeaders: ["XYZ"],
          AllowCredentials: true,
          MaxAge: 5,
          OptionsPassthrough: false,
          Debug: false,
        },
        EnableRoundRobin: false,
        LoadBalancingTargets: [],
      },
    },
  },
});
it("Test render of OepnIdConnect", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <OepnIdConnect />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});

it("test buttons and inputs", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <OepnIdConnect />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const issuer = screen.getByTestId("issuer");
  expect(issuer).toBeInTheDocument();
  fireEvent.change(issuer, { target: { value: "issuer1" } });
  expect(issuer).toHaveValue("issuer1");

  const addBtn = screen.getByTestId("add-btn");
  expect(addBtn).toBeInTheDocument();
  fireEvent.click(addBtn);

  const clientId = screen.getByTestId("clientId");
  expect(clientId).toBeInTheDocument();
  fireEvent.change(clientId, { target: { value: "clientId" } });
  expect(clientId).toHaveValue("clientId");

  const selectedPolicy = screen.getByTestId("selected-policy");
  expect(selectedPolicy).toBeInTheDocument();
  fireEvent.change(selectedPolicy, { target: { value: "policy1" } });

  // not covered
  const addClient = screen.getByTestId("add-Client");
  expect(addClient).toBeInTheDocument();
  fireEvent.click(addClient);

  const deleteIssuer = screen.getByTestId("delete-issuer");
  expect(deleteIssuer).toBeInTheDocument();
  fireEvent.click(deleteIssuer);
});

it("test buttons and inputs2", () => {
  render(
    <BrowserRouter>
      <Provider store={store2}>
        <OepnIdConnect />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const clientID = screen.getByTestId("clientId");
  expect(clientID).toBeInTheDocument();
  fireEvent.change(clientID, { target: { value: "newId" } });
  expect(clientID).toHaveValue("newId");

  const selectedPolicy = screen.getByTestId("selected-policy");
  expect(selectedPolicy).toBeInTheDocument();
  fireEvent.change(selectedPolicy, { target: { value: "policy1" } });

  // notcovered
  const addClient = screen.getByTestId("addClient");
  expect(addClient).toBeInTheDocument();
  fireEvent.click(addClient);

  const deleteIssuer = screen.getByTestId("deleteIssuer");
  expect(deleteIssuer).toBeInTheDocument();
  fireEvent.click(deleteIssuer);
});
