import { render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../store/index";
import UserDashboard from "./UserDashboard";
it("render without crashing UserDashboard", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <UserDashboard />
      </Provider>
    </BrowserRouter>
  );
});
// it("render without crashing UserDashboard", () => {
//   render(
//     <BrowserRouter>
//       <Provider store={store}>
//         <UserDashboard />
//       </Provider>
//     </BrowserRouter>
//   );
//   const cancelBtn = document.querySelectorAll("btn-danger");
//   console.log(cancelBtn);
// });
