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
        Blacklist: ["192.168.0.0"],
        Whitelist: ["192.168.0.1"],
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
store.dispatch = jest.fn();
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
  fireEvent.change(blackListSwitch, { target: { checked: true } });
  expect(blackListSwitch).toBeChecked();
  fireEvent.change(blackListSwitch);

  const blackListInput = screen.getByTestId("blacklist-input");
  expect(blackListInput).toBeInTheDocument();
  fireEvent.change(blackListInput, { target: { value: "192.168.0.0" } });
  expect(blackListInput).toHaveValue("192.168.0.0");
  fireEvent.change(blackListInput);

  expect(store.dispatch).toHaveBeenCalledTimes(1);
});
