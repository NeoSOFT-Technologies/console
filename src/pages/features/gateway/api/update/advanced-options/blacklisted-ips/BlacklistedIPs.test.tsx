import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import BlacklistedIPs from "./BlacklistedIPs";

const mockStore = configureStore([thunk]);
const store = mockStore({
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

it("render without crashing BlackListIPs", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <BlacklistedIPs />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});

it("render switch and inputs", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <BlacklistedIPs />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const blackListSwitch = screen.getByTestId("blacklist-switch");
  expect(blackListSwitch).toBeInTheDocument();
  fireEvent.change(blackListSwitch, { target: { checked: false } });
  expect(blackListSwitch).not.toBeChecked();
  fireEvent.click(blackListSwitch);

  const blackListInput = screen.getByTestId("blacklist-input");
  expect(blackListInput).toBeInTheDocument();
  const testIP = process.env.REACT_APP_IP;
  fireEvent.change(blackListInput, { target: { value: testIP } });
  expect(blackListInput).toHaveValue(testIP);
  fireEvent.change(blackListInput);

  const addIps = screen.getByTestId("add-ips");
  expect(addIps).toBeInTheDocument();
  fireEvent.click(addIps);

  const deleteRow = screen.getByTestId("delete-row");
  expect(deleteRow).toBeInTheDocument();
  fireEvent.click(deleteRow);
});
