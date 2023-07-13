const { client } = require("../services/mongo");

const {
  findAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../models/todo.model");

// fetch all
async function httpFindAllTodos(req, res) {
  console.log(req.query);
  // controller manipulates data into a format that works for the api, then transforms it into json to return it to the front end
  // passing parameters skip and limit to send this info to the DB
  const todos = await findAllTodos(client);
  return res.status(200).json(todos);
}

// create
async function httpCreateTodo(req, res) {
  console.log("create controller", req.body);
  const newTodo = req.body;
  console.log("create controller", newTodo);

  if (!newTodo) {
    return res.status(400).json({ error: "Missing required task property" });
  }

  const success = await createTodo(client, newTodo);
  if (!success) {
    return res.status(500).json({ Error: "Failed to add todo" });
  } else {
    return res.status(201).json(newTodo);
  }
}

// update
async function httpUpdateTodo(req, res) {
  console.log("updatedtodo Controller", req.body);

  const todoId = Number(req.params.id);
  const updatedTodo = req.body;
  if (!todoId) {
    return res.status(400).json({ error: "Missing required id property" });
  }

  const response = await updateTodo(client, todoId, updatedTodo);

  if (!response) {
    return res.status(500).json({ Error: "Failed to update todo" });
  } else {
    return res.status(201).json(updatedTodo);
  }
}

// delete
async function httpDeleteTodo(req, res) {
  console.log("in controller", typeof req.params.id);
  const todoId = Number(req.params.id);

  const deleted = await deleteTodo(client, todoId);
  console.log({ deleted });
  if (!deleted) {
    return res.status(400).json({
      error: "Todo not deleted",
    });
  }
  return res.status(200).json({
    ok: true,
  });
}

module.exports = {
  httpFindAllTodos,
  httpCreateTodo,
  httpUpdateTodo,
  httpDeleteTodo,
};
