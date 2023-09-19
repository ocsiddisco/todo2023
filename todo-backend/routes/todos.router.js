const express = require("express");

const {
  httpFindAllTodos,
  httpCreateTodo,
  httpUpdateTodo,
  httpDeleteTodo,
} = require("../controllers/todos.controller");
const { authJwt } = require("../middlewares");

const todosRouter = express.Router();

// function isAuthenticated(req, res, next) {
//   console.log("todos router, isAuthenticated", req.isAuthenticated());
//   if (req.isAuthenticated()) {
//     // User is authenticated, continue to the next middleware or route handler
//     return next();
//   } else {
//     // User is not authenticated, redirect or send an error response
//     return res.redirect("/auth/google"); // Redirect to the authentication route
//     // Or return res.status(401).json({ error: "Unauthorized" }); // Send an error response
//   }
// }

// Apply the isAuthenticated middleware to all routes in todosRouter
// todosRouter.use(isAuthenticated);

todosRouter.get("/", [authJwt.verifyToken], httpFindAllTodos);
todosRouter.post("/", [authJwt.verifyToken], httpCreateTodo);
todosRouter.put("/", [authJwt.verifyToken], httpUpdateTodo);
todosRouter.delete("/", [authJwt.verifyToken], httpDeleteTodo);

module.exports = todosRouter;
