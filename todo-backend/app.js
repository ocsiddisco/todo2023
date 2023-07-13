const express = require("express");
const bodyParser = require("body-parser");
const todosRouter = require("./routes/todos.router");
const cors = require("cors");

const app = express();
app.use(bodyParser.json()); // currently not working. should it be used in the FE as well?
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/", todosRouter);

module.exports = app;
