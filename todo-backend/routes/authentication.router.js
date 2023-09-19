const express = require("express");
const { verifySignUp, authJwt } = require("../middlewares");
const {
  httpSignUp,
  httpSignIn,
  httpSignOut,
} = require("../controllers/auth.controller");

const URL_FE = "http://localhost:3000/";

const authenticateRouter = express.Router();

authenticateRouter.post(
  "/api/auth/signup",
  [verifySignUp.checkDuplicateUsernameOrEmail],
  httpSignUp
);

authenticateRouter.post("/api/auth/signin", httpSignIn);
authenticateRouter.post(
  "/api/auth/signout",
  [authJwt.verifyToken],
  httpSignOut
);

module.exports = authenticateRouter;
