import { createServer, Model } from "miragejs";

export default function makeServer() {
  let server = createServer({
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
        ],
      });
    },

    routes() {
      this.get("/Registeration", (schema, request) => {
        return schema.db.user.where(request.queryParams);
      });

      this.put("/Registeration/:id", (schema, request) => {
        return schema.db.user.update(
          request.params,
          JSON.parse(request.requestBody)
        );
      });

      this.post("/Registeration", (schema, request) => {
        return schema.db.user.insert(JSON.parse(request.requestBody));
      });

      this.delete("/Registeration/:id", (schema, request) => {
        return schema.db.user.remove({ id: request.params.id });
      });
    },
  });

  return server;
}
