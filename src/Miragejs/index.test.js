import makeServer from "./index";

let server;

beforeEach(() => {
  server = makeServer({ environment: "test" });
});

afterEach(() => {
  server.shutdown();
});
let output = [
  {
    name: "Rahul kenchi",
    description: "i am going to win the world",
    userid: "rahul123",
    email: "rahul768@gmail.com",
    password: "rahul768",
    type: "admin",
    id: 1,
  },
  {
    name: "Tushar Saxena",
    description: "i am the king of the seven worlds",
    userid: "tushar123",
    email: "tushar057@gmail.com",
    password: "tushar057",
    type: "tenant",
    id: 2,
  },
  {
    name: "Jeff Mathew",
    description: "i am a coding god",
    userid: "jeff1234",
    email: "jeff123@gmail.com",
    password: "jeff123",
    type: "tenant",
    id: 3,
  },
  {
    name: "Paras Saxena",
    description: "I am a Master hacker ",
    userid: "paras72727",
    email: "parassaxena206@gmail.com",
    password: "parassaxena206",
    type: "tenant",
    id: 4,
  },
  {
    name: "Rohit singh",
    description: "i am pro gamer",
    userid: "rohit123",
    email: "rohit@gmail.com",
    password: "rohit",
    type: "tenant",
    id: 5,
  },
  {
    name: "Naveen",
    description: "i am a fan of Spiderman",
    userid: "naveen768",
    email: "naveen768@gmail.com",
    password: "naveen768",
    type: "tenant",
    id: 6,
  },
  {
    name: "harsh",
    description: "i live in indore",
    userid: "harsh768",
    email: "harsh768@gmail.com",
    password: "harsh768",
    type: "tenant",
    id: 7,
  },
]
test("Shows all database entries", async () => {
  let tmp = await fetch("/api/registeration")
  console.log(tmp)
  expect(tmp.json()).toEqual(output)
});
