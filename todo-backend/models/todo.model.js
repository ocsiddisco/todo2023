// validation schema todo for mongo db

// db.createCollection("todo-list", {
//   validator: {
//     $jsonSchema: {
//       bsonType: "object",
//       title: "Todo Object Validation",
//       required: [task, completed, id],
//       properties: {
//         task: {
//           bsonType: "String",
//         },
//         completed: {
//           bsonType: "Bool",
//         },
//         id: {
//           bsonType: "Int",
//         },
//         // userID: {
//         //   bsonType: "Int",
//         // },
//       },
//     },
//   },
// });

// Get all the todos
async function findAllTodos(client, userId) {
  const listTodo = await client
    .db("todos-app")
    .collection("todo-list")
    .find({ userId: userId });
  const result = await listTodo.toArray();
  if (result.length > 0) {
    return result;
  } else {
    console.log(`No todo found.`);
  }
}

// get last todo number in DB
const DEFAULT_TODO_NUMBER = 10;

async function getLatestTodoNumber(client) {
  const latestTodo = await client
    .db("todos-app")
    .collection("todo-list")
    //we pass an empty filter {} as the first argument
    // to findOne to match all documents in the collection.
    // We then provide the sort option { id: -1 } to sort the documents based on the "id" field in descending order.
    .findOne({}, { sort: { id: -1 } });

  if (!latestTodo) {
    // if there is currently no todo in DB
    return DEFAULT_TODO_NUMBER;
  }
  return latestTodo.id;
}

// Create new todo
async function createTodo(client, newTodo) {
  const getId = await getLatestTodoNumber(client);
  const newId = getId + 1;
  const addNewTodo = Object.assign(newTodo, {
    id: newId,
    completed: false,
  });

  // const addNewTodo = {
  //   id: newId,
  //   task: newTodo.task,
  //   completed: false,
  //   userId: newTodo.userID
  // };
  const result = await client
    .db("todos-app")
    .collection("todo-list")
    .insertOne(addNewTodo);
  console.log(`New todo created with the following id: ${addNewTodo.id}`);
  console.log("result create todo model", { result });
  return result;
}

// Update Todo
async function updateTodo(client, todoId, updatedTodo) {
  const result = await client
    .db("todos-app")
    .collection("todo-list")
    .updateOne({ id: todoId }, { $set: updatedTodo });
  // console.log(`${result.matchedCount} document(s) matched the query criteria.`);
  // console.log(`${result.modifiedCount} document(s) was/were updated.`);
  console.log("result update in model.", { result });
  return result;
}

// Delete Todo (Yeah one done!)
async function deleteTodo(client, todoId) {
  console.log("in todo model", todoId);
  const result = await client
    .db("todos-app")
    .collection("todo-list")
    .deleteOne({ id: todoId });

  console.log({ result });
  console.log(`Todo ${todoId} was delete.`);

  return result?.deletedCount === 1;
}

module.exports = {
  findAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
