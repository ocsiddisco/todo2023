const http = require("http");
require("dotenv").config();
const { findAllTodos } = require("./models/todo.model");
const { mongoConnect, client } = require("./services/mongo");

const app = require("./app");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  // connect to server before starting app -> data available to handle requests users

  await mongoConnect(client);
  console.log("connected to DB");

  server.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
  });
}

startServer();
