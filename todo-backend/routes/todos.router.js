const express = require("express");

const {
  httpFindAllTodos,
  httpCreateTodo,
  httpUpdateTodo,
  httpDeleteTodo,
} = require("../controllers/todos.controller");

const todosRouter = express.Router();

function isAuthenticated(req, res, next) {
  console.log("todos router, isAuthenticated", req.isAuthenticated());
  if (req.isAuthenticated()) {
    // User is authenticated, continue to the next middleware or route handler
    return next();
  } else {
    // User is not authenticated, redirect or send an error response
    return res.redirect("/auth/google"); // Redirect to the authentication route
    // Or return res.status(401).json({ error: "Unauthorized" }); // Send an error response
  }
}

// Apply the isAuthenticated middleware to all routes in todosRouter
todosRouter.use(isAuthenticated);

todosRouter.get("/user/:userId", httpFindAllTodos);
todosRouter.post("/todos", httpCreateTodo);
todosRouter.put("/todos/:id", httpUpdateTodo);
todosRouter.delete("/todos/:id", httpDeleteTodo);

module.exports = todosRouter;
