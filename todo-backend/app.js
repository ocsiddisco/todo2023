const express = require("express");
const helmet = require("helmet");
const authenticateRouter = require("./routes/authentication.router");
const userRouter = require("./routes/user.router");

const todosRouter = require("./routes/todos.router");
const cors = require("cors");
const cookieSession = require("cookie-session");

//google console
const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
};

const app = express();

app.use(helmet()); // secure server by protecting again common configuration issues

// parse requests of content-type - application/json
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Enable credentials (e.g., cookies, HTTP authentication)
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to the new version of the application." });
// });

app.use("/", authenticateRouter);
app.use("/delete/user", userRouter);
app.use("/todos", todosRouter);

module.exports = app;
