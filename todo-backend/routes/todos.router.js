const express = require("express");

const {
  httpFindAllTodos,
  httpCreateTodo,
  httpUpdateTodo,
  httpDeleteTodo,
} = require("./todos.controller");

const todosRouter = express.Router();

todosRouter.get("/", httpFindAllTodos);
todosRouter.post("/", httpCreateTodo);
todosRouter.put("/:id", httpUpdateTodo);
todosRouter.delete("/:id", httpDeleteTodo);

module.exports = todosRouter;
