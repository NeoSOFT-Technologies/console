import { render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../store";
import Navbar from "./Navbar";
it("render without crashing Navbar", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Navbar />
      </Provider>
    </BrowserRouter>
  );
});

// it("render toggle-button, navigate-button, dropdown items properly", () => {
//   render(
//     <BrowserRouter>
//       <Provider store={store}>
//         <Navbar />
//       </Provider>
//     </BrowserRouter>
//   );
//   const toggleBtn = screen.getByTestId("toggle-button");
//   expect(toggleBtn).toBeInTheDocument();
//   fireEvent.click(toggleBtn);

//   const navigateBtn = screen.getByTestId("navigate-button");
//   expect(navigateBtn).toBeInTheDocument();
//   fireEvent.click(navigateBtn);

//   const toggleOffBtn = screen.getByTestId("toggleOff-button");
//   expect(toggleOffBtn).toBeInTheDocument();
//   fireEvent.click(toggleOffBtn);

//   const node = document.querySelectorAll(".dropdown-item.preview-item").item(0);
//   if (node) fireEvent.click(node);
// });

// it("render without crashing Navbar", () => {
//   render(
//     <BrowserRouter>
//       <Provider store={store}>
//         <Navbar />
//       </Provider>
//     </BrowserRouter>
//   );

//   const ddI1 = screen.getByTestId("dropdownItem1");
//   expect(ddI1).toBeInTheDocument();
//   fireEvent.click(ddI1);

//   const eventToday = screen.getByTestId("event-today");
//   expect(eventToday).toBeInTheDocument();
//   fireEvent.click(eventToday);

//   const settings = screen.getByTestId("settings");
//   expect(settings).toBeInTheDocument();
//   fireEvent.click(settings);

//   const launchAdmin = screen.getByTestId("launch-admin");
//   expect(launchAdmin).toBeInTheDocument();
//   fireEvent.click(launchAdmin);
// });
