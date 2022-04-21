// import { render } from "@testing-library/react";
// import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { IHeadings } from "./index";

it('has a languageName of "TypeScript"', () => {
  const state: IHeadings = { title: "apple" };
  expect(state.title).toEqual("apple");
});
