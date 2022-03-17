import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./store/index";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import makeServer from "./Miragejs/index";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./utils/error-boundry";
makeServer();
ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ErrorBoundary>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
