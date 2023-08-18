const API_URL = "http://localhost:8000/";

//fetch all
async function getAllTodos() {
  const response = await fetch(API_URL);
  console.log("response fetch", response);
  return await response.json();
}

// create
async function createTodo(newTask) {
  console.log("apihelp task", newTask, typeof newTask);
  // const requestBody = JSON.stringify({ task: newTask });
  const addNewTodo = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ task: newTask }),
    headers: {
      "Content-Type": "application/json", // Set the appropriate content type header
    },
  });
  console.log("result createtodo", addNewTodo);
  return await addNewTodo.json();
}

// update
async function updateTodo(payload) {
  console.log("3", payload);
  const updatedTodo = await fetch(`${API_URL}${payload.id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json", // Set the appropriate content type header
    },
  });
  return await updatedTodo.json();
}

// delete
async function deleteTodo(id) {
  const numberId = Number(id);
  const response = await fetch(`${API_URL}${numberId}`, {
    method: "DELETE",
  });
  console.log("response delete", response);
  return response;
}

const exportFunctions = { getAllTodos, createTodo, updateTodo, deleteTodo };

export default exportFunctions;
