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
          let query = request.queryParams;
          if (query._page) {
            let datalist = schema.db.user.where({
              type: query.type,
            });
            //this variable stores list of all tenant
            if (query.name_like != " ") {
              let reg = new RegExp(query.name_like);
              datalist = datalist.filter((ele) => reg.test(ele.userid));
              //filter out userid which have name_like
            }
            count = Math.ceil(datalist.length / 10);
            //count total entries and have a round number for pagination.
            let start = (query._page - 1) * 10;
            //calculate start of array to be sent according to page number.
            datalist = datalist.splice(start, 10);
            //array now contains list according to pagination.
            return new Response(
              200,
              { "Content-type": "application/json" },
              { list: datalist, count: count }
            );
          }
          let tmp = schema.db.user.where(query);
          return new Response(200, { "Content-type": "application/json" }, tmp);
        } catch (err) {
          return new Response(500);
        }
      });

      this.put("/registeration/:id", (schema, request) => {
        try {
          schema.db.user.update(
            request.params,
            JSON.parse(request.requestBody)
          );
          return new Response(200);
        } catch (err) {
          return new Response(500);
        }
      });

      this.post("/registeration", (schema, request) => {
        try {
          schema.db.user.insert(JSON.parse(request.requestBody));
          return new Response(201);
        } catch (err) {
          return new Response(500);
        }
      });

      this.delete("/registeration/:id", (schema, request) => {
        try {
          schema.db.user.remove({ id: request.params.id });
          return new Response(200);
        } catch (err) {
          return new Response(500);
        }
      });
    },
  });

  return server;
}
