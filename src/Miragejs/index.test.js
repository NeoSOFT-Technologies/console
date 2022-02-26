import makeServer from "./index";
import "@testing-library/jest-dom/extend-expect";

let server;
beforeEach(() => {
  server = makeServer({ environment: "test" });
});

afterEach(() => {
  server.shutdown();
});

//TODO write working test cases

it("Try to login", () => {
  fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ email: "rohit@gmail.com", password: "rohit" }),
  }).then((res) => console.log(res.json()));
});
