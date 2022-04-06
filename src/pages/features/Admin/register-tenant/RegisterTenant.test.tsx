import { render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../store/index";
import RegisterTenant from "./RegisterTenant";

it("render without crashing RegisterTenant", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <RegisterTenant />
      </Provider>
    </BrowserRouter>
  );
});

// it("test if input box is present", () => {
//   render(
//     <BrowserRouter>
//       <Provider store={store}>
//         <RegisterTenant />
//       </Provider>
//     </BrowserRouter>
//   );

//   const nameBox = screen.getByTestId("name-input");
//   expect(nameBox).toBeInTheDocument();
//   expect(nameBox).toHaveAttribute("type", "text");

//   const emailBox = screen.getByTestId("email-input");
//   expect(emailBox).toBeInTheDocument();
//   expect(emailBox).toHaveAttribute("type", "email");

//   const passwordBox = screen.getByTestId("password-input");
//   expect(passwordBox).toBeInTheDocument();
//   expect(passwordBox).toHaveAttribute("type", "password");

//   const tDesBox = screen.getByTestId("tenantDescription-input");
//   expect(tDesBox).toBeInTheDocument();
//   expect(tDesBox).toHaveAttribute("type", "textarea");

//   const dbNameBox = screen.getByTestId("databaseName-input");
//   expect(dbNameBox).toBeInTheDocument();
//   expect(dbNameBox).toHaveAttribute("type", "text");

//   const dbDesBox = screen.getByTestId("databaseDescription-input");
//   expect(dbDesBox).toBeInTheDocument();
//   expect(dbDesBox).toHaveAttribute("type", "textarea");
// });

// it("test if input box take input", () => {
//   render(
//     <BrowserRouter>
//       <Provider store={store}>
//         <RegisterTenant />
//       </Provider>
//     </BrowserRouter>
//   );

//   const nameBox = screen.getByTestId("name-input");
//   fireEvent.change(nameBox, { target: { value: "deepthi" } });
//   expect(screen.getByTestId("name-input")).toHaveValue("deepthi");

//   const emailBox = screen.getByTestId("email-input");
//   fireEvent.change(emailBox, { target: { value: "akhilpinni123@gmail.com" } });
//   expect(screen.getByTestId("email-input")).toHaveValue(
//     "akhilpinni123@gmail.com"
//   );

//   const passwordBox = screen.getByTestId("password-input");
//   fireEvent.change(passwordBox, { target: { value: "akhil@1234" } });
//   expect(screen.getByTestId("password-input")).toHaveValue("akhil@1234");

//   const tDesBox = screen.getByTestId("tenantDescription-input");
//   fireEvent.change(tDesBox, { target: { value: "hello" } });
//   expect(screen.getByTestId("tenantDescription-input")).toHaveValue("hello");

//   const dbNameBox = screen.getByTestId("databaseName-input");
//   fireEvent.change(dbNameBox, { target: { value: "registername" } });
//   expect(screen.getByTestId("databaseName-input")).toHaveValue("registername");

//   const dbDesBox = screen.getByTestId("databaseDescription-input");
//   fireEvent.change(dbDesBox, { target: { value: "description" } });
//   expect(screen.getByTestId("databaseDescription-input")).toHaveValue(
//     "description"
//   );
// });

// it("if submit button and cancel button renders", () => {
//   render(
//     <BrowserRouter>
//       <Provider store={store}>
//         <RegisterTenant />
//       </Provider>
//     </BrowserRouter>
//   );
//   const submitBtn = screen.getByTestId("submit-input");
//   expect(submitBtn).toBeInTheDocument();
//   fireEvent.click(submitBtn);

//   const cancelBtn = screen.getByTestId("cancel-input");
//   expect(cancelBtn).toBeInTheDocument();
//   fireEvent.click(cancelBtn);
// });
