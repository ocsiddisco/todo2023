const express = require("express");

const { authJwt } = require("../middlewares");
const { httpDeleteUser } = require("../controllers/users.controller");

const userRouter = express.Router();

userRouter.delete("/", [authJwt.verifyToken], httpDeleteUser);

module.exports = userRouter;
