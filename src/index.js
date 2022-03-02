import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import { Provider } from "react-redux";
import store from "./app/redux/store/store";
import makeServer from "./miragejs";

// import "./i18n";

makeServer();

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
