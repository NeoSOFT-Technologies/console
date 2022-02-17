import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { shallow } from 'enzyme'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from "react-router-dom";
import Login from "../app/user-pages/Login";

Enzyme.configure({ adapter: new Adapter() });

it("renders without crashing", () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );
});

it("test if input box is present", () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );
    const inputBox = screen.getByTestId("email-input");
    expect(inputBox).toBeDefined();
    expect(inputBox).toHaveAttribute("type", "email");
    const passwordbox = screen.getByTestId("password-input");
    expect(passwordbox).toBeDefined();
    expect(passwordbox).toHaveAttribute("type", "password");
});

it("test if input-box take input", () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );
    const inputBox = screen.getByTestId("email-input");
    fireEvent.change(inputBox, { target: { value: "rahul768@gmail.com" } });
    expect(screen.getByTestId("email-input")).toHaveValue("rahul768@gmail.com");
    const passwordbox = screen.getByTestId("password-input");
    fireEvent.change(passwordbox, { target: { value: "rahul768" } });
    expect(screen.getByTestId("password-input")).toHaveValue("rahul768");
});

