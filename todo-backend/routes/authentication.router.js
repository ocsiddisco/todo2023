const express = require("express");
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const { findUser, createUser } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const passportConfig = require("../config/passport");

const { httpCreateUser } = require("../controllers/users.controller");

const URL_FE = "http://localhost:3000/";

const authenticateRouter = express.Router();

authenticateRouter.get(
  "/auth/google",
  passportConfig.passport.authenticate("google", { scope: ["email"] })
);

// The callback URL is what specifies the redirect from our authorization server.
// That's Google when it sends back the authorization code, which is what we use to get back that access
// token, which we use in all of our requests to gain access to restricted data in our application.
// The callback URL where Google will send this authorization code lives in our application.

//route handler for the call back is a function of passport, parameter is here 'google'.
authenticateRouter.get(
  "/auth/google/callback",
  passportConfig.passport.authenticate("google", {
    failureRedirect: "/auth/google",
    session: true,
  }),
  (req, res) => {
    console.log(req.isAuthenticated());

    res.redirect(`${URL_FE}?userId=${req.user.userId}`);
  }
);

// destroy method from express-session
authenticateRouter.get("/auth/logout", (req, res) => {
  console.log("and here?", req.isAuthenticated());
  try {
    console.log("Logging out...");

    req.session.destroy((err) => {
      if (err) {
        console.log("aut router log out destroy", err);
        return res.redirect("/");
      } // *** TODO
      res.clearCookie("sid"); // Session ID
      req.logout(); // removes req.user and clears any logged in session
      res.redirect(URL_FE);
    });
  } catch (error) {
    console.log("the error you are looking for", error);
  }
});

authenticateRouter.get("/failure", (req, res) => {
  console.log("failed to log in- auth router");
  return res.send("Failed to log in!");
});

// authenticateRouter.post("/register", httpCreateUser);
// authenticateRouter.post("/signin", httpSignInUser);

module.exports = authenticateRouter;
