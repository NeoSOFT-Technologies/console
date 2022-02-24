import { createServer, Model } from "miragejs";
import { responseUtils } from "./utils/responseUtils";
import {
  getDataList,
  updateUser,
  userLogin,
  userDelete,
  userAdd,
} from "./utils/index";

export default function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,
    models: {
      user: Model,
    },

    seeds(server) {
      server.db.loadData({
        user: [
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
            userid: "paras727271",
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
            userid: "naveen7681",
            email: "naveen768@gmail.com",
            password: "naveen768",
            type: "tenant",
            id: 6,
          },
          {
            name: "harsh",
            description: "i live in indore",
            userid: "harsh7681",
            email: "harsh768@gmail.com",
            password: "harsh768",
            type: "tenant",
            id: 7,
          },
        ],
      });
    },

    routes() {
      this.namespace = "/api";

      this.post("/login", (schema, request) => {
        try {
          const { requestBody } = request;
          let uniqueUser = userLogin(schema, requestBody);
          return responseUtils(200, uniqueUser);
        } catch (err) {
          return responseUtils(500);
        }
      });

      this.get("/user", (schema, request) => {
        try {
          const { type, _page, name_like } = request.queryParams;
          let { datalist, count } = getDataList(schema, type, _page, name_like);
          return responseUtils(200, { list: datalist, count: count });
        } catch (err) {
          return responseUtils(500);
        }
      });

      this.put("/user/:id", (schema, request) => {
        try {
          const { params, requestBody } = request;
          updateUser(schema, params, requestBody);
          return responseUtils(200);
        } catch (err) {
          return responseUtils(500);
        }
      });

      this.post("/user", (schema, request) => {
        try {
          const { requestBody } = request;
          userAdd(schema, requestBody);
          return responseUtils(200);
        } catch (err) {
          return responseUtils(500);
        }
      });

      this.delete("/user/:id", (schema, request) => {
        try {
          const { id } = request.params;
          userDelete(schema, id);
          return responseUtils(200);
        } catch (err) {
          return responseUtils(500);
        }
      });
    },
  });

  return server;
}
