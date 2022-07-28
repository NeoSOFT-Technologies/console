import { fireEvent, render, screen } from "@testing-library/react";
import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import MutualTLS from "./MutualTLS";

const mockStore = configureStore([thunk]);
const store = mockStore({
  getAllCertificateState: {
    loading: false,
    data: {
      CertificateCollection: [
        {
          CertId: "cert1",
          Issuer: "test",
          SignatureAlgorithm: "test",
          Subject: "test",
          Thumbprint: "test",
          ValidNotAfter: "test",
          ValidNotBefore: "test",
          showDetails: true,
          addState: true,
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
        CertIds: ["cert1"],
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
it("render without crashing Mutual TLS", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <MutualTLS />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});

it("test buttons and inputs", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <MutualTLS />
      </Provider>
    </BrowserRouter>
  );

  const handlePlusBtn = screen.getByTestId("handlePlus-button");
  expect(handlePlusBtn).toBeInTheDocument();
  fireEvent.click(handlePlusBtn);

  const handledropLeftBtn = screen.getByTestId("handleDropLeft-table");
  expect(handledropLeftBtn).toBeInTheDocument();
  fireEvent.click(handledropLeftBtn);
});
