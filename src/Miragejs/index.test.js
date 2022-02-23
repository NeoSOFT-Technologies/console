import makeServer from "./index";
import "@testing-library/jest-dom/extend-expect";
let output = [];

let server;
beforeEach(() => {
  server = makeServer({ environment: "test" });
});

afterEach(() => {
  server.shutdown();
});

it("Shows all database entries", () => {
  let tmp;
  fetch("/api/registeration").then((res) => {
    tmp = res.json();
    expect(tmp).toHaveValue(output);
  });
});
