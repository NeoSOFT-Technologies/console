import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import WhitelistedIPs from "./WhitelistedIPs";

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
it("render without crashing WhiteListIPs", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <WhitelistedIPs />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});

it("render buttons and inputs", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <WhitelistedIPs />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const whiteListSwitch = screen.getByTestId("whitelist-switch");
  expect(whiteListSwitch).toBeInTheDocument();
  fireEvent.change(whiteListSwitch, { target: { checked: false } });
  expect(whiteListSwitch).not.toBeChecked();
  fireEvent.click(whiteListSwitch);

  const whiteListInput = screen.getByTestId("whitelist-input");
  expect(whiteListInput).toBeInTheDocument();
  const testIP = "192.168.0.0";
  fireEvent.change(whiteListInput, { target: { value: testIP } });
  expect(whiteListInput).toHaveValue(testIP);
  fireEvent.change(whiteListInput);

  const addIps = screen.getByTestId("add-ips");
  expect(addIps).toBeInTheDocument();
  fireEvent.click(addIps);

  const deleteRows = screen.getByTestId("delete-rows");
  expect(deleteRows).toBeInTheDocument();
  fireEvent.click(deleteRows);
});

it("check validations", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <WhitelistedIPs />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();

  const whitelistInput = screen.getByTestId("whitelist-input");
  expect(whitelistInput).toBeInTheDocument();
  fireEvent.change(whitelistInput, { target: { value: "" } });
  expect(whitelistInput).toHaveValue("");
  const whitelistErr = screen.getByTestId("whiteListErr");
  expect(whitelistErr).toHaveTextContent("");
});
