import { createServer, Model, Response } from "miragejs";

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

      this.get("/registeration", (schema, request) => {
        try {
          let count;
          console.log(request.queryParams);
          if (request.queryParams._page) {
            let tmp = schema.db.user.where({ type: request.queryParams.type });
            // console.log("tmp1", tmp);
            if (request.queryParams.name_like != " ") {
              let reg = new RegExp(request.queryParams.name_like);
              tmp = tmp.filter((ele) => reg.test(ele.userid));
            }
            count = Math.ceil(tmp.length / 10);
            tmp = tmp.splice((request.queryParams._page - 1) * 10, 10);
            // console.log("tmp3", tmp);
            return new Response(
              200,
              { "Content-type": "application/json" },
              { list: tmp, count: count }
            );
          }
          let tmp = schema.db.user.where(request.queryParams);
          return new Response(200, { "Content-type": "application/json" }, tmp);
        } catch (err) {
          return new Response(500, { "Content-type": "application/json" });
        }
      });

      this.put("/registeration/:id", (schema, request) => {
        try {
          schema.db.user.update(
            request.params,
            JSON.parse(request.requestBody)
          );
          return new Response(
            204,
            { "Content-type": "application/json" },
            { err: 0 }
          );
        } catch (err) {
          return new Response(
            500,
            { "Content-type": "application/json" },
            { err: 1, msg: err }
          );
        }
      });

      this.post("/registeration", (schema, request) => {
        try {
          schema.db.user.insert(JSON.parse(request.requestBody));
          // console.log(schema.db.user);
          return new Response(
            201,
            { "Content-type": "application/json" },
            { err: 0 }
          );
        } catch (err) {
          return new Response(
            500,
            { "Content-type": "application/json" },
            { err: 1, msg: err }
          );
        }
      });

      this.delete("/registeration/:id", (schema, request) => {
        try {
          schema.db.user.remove({ id: request.params.id });
          return new Response(
            200,
            { "Content-type": "application/json" },
            { err: 0 }
          );
        } catch (err) {
          return new Response(
            500,
            { "Content-type": "application/json" },
            { err: 1, msg: "Error deleting object" }
          );
        }
      });
    },
  });

  return server;
}
