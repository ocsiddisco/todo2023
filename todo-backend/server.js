const https = require("https");
const fs = require("fs");
// const { mongoConnect, client } = require("./services/mongo");
const { mongoConnect } = require("./services/mongo");

require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 8000;

//key & cert : establish a secure and encrypted connection between your server and clients
const server = https.createServer(
  {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
  },
  app
);

async function startServer() {
  // connect to server before starting app -> data available to handle requests users

  await mongoConnect();
  console.log("connected to DB");

  server.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
  });
}

startServer();
