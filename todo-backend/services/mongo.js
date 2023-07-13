require("dotenv").config();
const TodoModel = require("../models/todo.mongo");

const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_URL);

async function mongoConnect(client) {
  client.connect();
  console.log("connected");
}

module.exports = {
  MongoClient,
  client,
  mongoConnect,
};
