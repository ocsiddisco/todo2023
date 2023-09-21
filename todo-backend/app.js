const express = require("express");
const helmet = require("helmet");
const authenticateRouter = require("./routes/authentication.router");
const userRouter = require("./routes/user.router");
const path = require("path");

const todosRouter = require("./routes/todos.router");
const cors = require("cors");

const app = express();

app.use(helmet()); // secure server by protecting again common configuration issues

// parse requests of content-type - application/json
app.use(express.json());

const listCors = [
  "http://localhost:3000",
  "https://todo-app-frontend-istz.onrender.com",
];

// var corsOptions = {
//   origin: "*",
//   // origin: function (origin, callback) {
//   //   if (listCors.includes(origin)) {
//   //     callback(null, true);
//   //   } else {
//   //     callback(new Error("Not allowed by CORS"));
//   //   }
//   // },
//   methods: ["GET", "PUT", "POST", "DELETE"],
//   credentials: true, // Enable credentials (e.g., cookies, HTTP authentication)
//   // allowedHeaders: "Origin,Content-Type,Accept",
// };
app.options("*", cors());
app.use(cors());

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
//   next();
// });

app.use("/", authenticateRouter);
app.use("/delete/user", userRouter);
app.use("/todos", todosRouter);

// /*: after the get end point, will match everything following the slash, (match any end point not mentionned above)
// when it find a route not matching one of the above ones, it passes it on to react app via index.html
// this allows React (front-end) to roading instead

app.get("/*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "todo-backend", "public", "index.html")
  );
});

module.exports = app;
