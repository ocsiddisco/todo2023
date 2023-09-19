const User = require("./user.mongo");

// Get all the todos
async function findAllTodos(userId) {
  try {
    const user = await User.findOne({ _id: userId });

    if (user.todos.length === 0) {
      console.log("empty todo list");

      return [];
    }
    const listTodos = user.todos;
    return listTodos;
  } catch (error) {
    console.error("Error finding todos:", error);
    throw error;
  }
}

const DEFAULT_TODO_NUMBER = 10;

// GET HIGHEST TODOID IN THE DB
async function getLatestTodoNumber(userId) {
  try {
    const user = await User.findById(userId);

    if (user.todos.length === 0) {
      return DEFAULT_TODO_NUMBER;
    }

    if (!user) {
      console.log("no user found");
    }

    // Sort the user's todos by todoID in descending order
    const sortedTodos = user.todos.sort(
      (a, b) => user.todos[0].todoID - user.todos[1].todoID
    );

    // Return the todoID of the latest todo
    return sortedTodos[0].todoID;
  } catch (error) {
    console.error("Error getting latest todo number:", error);
    throw error;
  }
}

// CREATE NEW TODO
async function createTodo(userId, todo) {
  try {
    const getId = await getLatestTodoNumber(userId);

    const newId = getId + 1;

    const newTodo = Object.assign(todo, {
      todoID: newId,
      completed: false,
    });
    console.log("newTodo createtodo", newTodo);

    const updateUser = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { todos: newTodo } },
      { new: true } // To return the updated user document
    );

    console.log("this is the new list of todos", updateUser.todos);

    return true;
  } catch (error) {
    console.log("message", error);
  }
}

// UPDATE TODO
async function updateTodo(userId, todoID, updatedTodo) {
  console.log("got here");
  try {
    const result = await User.findOneAndUpdate(
      { _id: userId, "todos.todoID": todoID }, // Use $elemMatch to match the specific todo
      { $set: { "todos.$.todo": updatedTodo } }, // Use $ to update the matched todo
      { new: true }
    );
    // console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    // console.log(`${result.modifiedCount} document(s) was/were updated.`);
    console.log("result update in model.", result);

    if (!result) {
      // User or todo not found
      return null;
    }

    return true;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
}

// DELETE TODO (Yeah one done!)
async function deleteTodo(userId, todoID) {
  console.log("in todo model", todoID);
  try {
    const result = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { todos: { todoID: todoID } } }, // Use $pull to remove the specific todo
      { new: true }
    );

    if (!result) {
      // User not found
      return false;
    }

    console.log(`Todo ${todoID} was delete.`);

    return true;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
}

module.exports = {
  findAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
