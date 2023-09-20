const express = require("express");
const helmet = require("helmet");
const authenticateRouter = require("./routes/authentication.router");
const userRouter = require("./routes/user.router");

const todosRouter = require("./routes/todos.router");
const cors = require("cors");

const app = express();

app.use(helmet()); // secure server by protecting again common configuration issues

// parse requests of content-type - application/json
app.use(express.json());

const listCors = [
  "http://localhost:3000",
  "https://todo-app-backend-8q6w.onrender.com",
];
app.use(
  cors({
    origin: listCors,
    credentials: true, // Enable credentials (e.g., cookies, HTTP authentication)
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

app.use("/", authenticateRouter);
app.use("/delete/user", userRouter);
app.use("/todos", todosRouter);

module.exports = app;
