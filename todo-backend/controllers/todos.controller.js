const {
  findAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../models/todo.model");

// fetch all todo of user
async function httpFindAllTodos(req, res) {
  console.log("httpFindAllTodos");
  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ error: "Missing required id property" });
  }
  // controller manipulates data into a format that works for the api, then transforms it into json to return it to the front end
  const todos = await findAllTodos(userId);
  console.log("todos controlers findalltodos");

  if (!todos) {
    return res.status(500).json({ Error: "Failed to fetch todo" });
  } else {
    return res.status(200).json(todos);
  }
}

// CREATE TODO
async function httpCreateTodo(req, res) {
  console.log("http createtodo controller");
  const newTodo = req.body;
  const userId = req.userId;

  if (!newTodo) {
    return res.status(400).json({ error: "Missing required task property" });
  }

  const response = await createTodo(userId, newTodo);
  if (!response) {
    return res.status(500).json({ Error: "Failed to add todo" });
  } else {
    return res.status(201).json(response);
  }
}

// UPDATE TODO
async function httpUpdateTodo(req, res) {
  console.log("updatedtodo Controller");

  const userId = req.userId;
  const todoID = Number(req.body.todoID);
  const updatedTodo = req.body.todo;
  if (!todoID) {
    return res.status(400).json({ error: "Missing required id property" });
  }

  const response = await updateTodo(userId, todoID, updatedTodo);

  if (!response) {
    return res.status(500).json({ Error: "Failed to update todo" });
  } else {
    return res.status(200).json(response);
  }
}

// DELETE TODO
async function httpDeleteTodo(req, res) {
  const userId = req.userId;
  const todoID = Number(req.body.todoID);

  const response = await deleteTodo(userId, todoID);
  if (!response) {
    return res.status(500).json({
      error: "Todo not deleted",
    });
  }
  return res.status(200).json(response);
}

module.exports = {
  httpFindAllTodos,
  httpCreateTodo,
  httpUpdateTodo,
  httpDeleteTodo,
};
