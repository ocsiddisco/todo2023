require("dotenv").config();

const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_URL);

async function mongoConnect() {
  client.connect();
  console.log("connected");
}

module.exports = {
  MongoClient,
  client,
  mongoConnect,
};
