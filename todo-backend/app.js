const express = require("express");
const helmet = require("helmet");
const session = require("express-session");
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");
const authenticateRouter = require("./routes/authentication.router");
const todosRouter = require("./routes/todos.router");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const passportConfig = require("./config/passport");
const logger = require("morgan");

//google console
const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};

const app = express();
app.use(logger("dev"));

app.use(helmet()); // secure server by protecting again common configuration issues

app.use(
  session({
    name: "session",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // unset: "destroy",
    cookie: {
      httpOnly: false,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      ttl: 24 * 60 * 60 * 1000,
    }),
  })
);

app.use(passportConfig.passport.initialize());
app.use(passportConfig.passport.session());

// Use the exported strategy
passportConfig.passport.use(passportConfig.strategy);

passport.serializeUser(passportConfig.serializeUser);
passport.deserializeUser(passportConfig.deserializeUser);

app.use((req, res, next) => {
  console.log("authenticated app?", req.isAuthenticated());
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});
// Enable passport authentication, session and plug strategies
// app.use(passport.initialize());
// app.use(passport.session());

app.use(bodyParser.json()); // currently not working.

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
// middleware checking if user is logged in before accessing todo's.
// function checkLoggedIn(req, res, next) {
//   console.log("current user is", req.foundUser);
//   const isLoggedIn = req.isAuthenticated() && req.foundUser;
//   if (!isLoggedIn) {
//     return res.status(401).json({
//       // *** TODO update this later so it does back to log in page
//       error: "You must log in!",
//     });
//   }
//   next();
// }

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers["Authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (token == null) {
//     return res.sendStatus(401); // Unauthorized
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.sendStatus(403); // Forbidden
//     }
//     req.user = user;
//     next();
//   });
// }

app.use("/", authenticateRouter);
app.use("/", todosRouter);

module.exports = app;
