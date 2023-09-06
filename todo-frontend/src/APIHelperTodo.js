const API_URL = "https://localhost:8000";

// // get access token from store
// const accessToken = "YOUR_ACCESS_TOKEN_HERE";

// async function login() {
//   const response = await fetch(`${API_URL}/auth/google/callback`, {
//     method: "POST",
//     body:
//       "grant_type=client_credentials&client_id=" +
//       key +
//       "&client_secret=" +
//       secret,
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//   });
//   const data = await response.json();
//   console.log("data apihelper", data);
// }

//fetch all todos
async function getAllTodos(userId) {
  console.log("userid apihelper", userId);
  const numberuserId = Number(userId);
  const response = await fetch(`https://localhost:8000/user/${numberuserId}`);
  console.log("response fetch", response);
  return await response.json();
}

// , {
//   headers: {
//     Authorization: `Bearer ${accessToken}`,
//   },

// create todo
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

// update todo
async function updateTodo(payload) {
  console.log("3", payload);
  const updatedTodo = await fetch(`${API_URL}${payload.id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await updatedTodo.json();
}

// delete todo
async function deleteTodo(id) {
  const numberId = Number(id);
  const response = await fetch(`${API_URL}${numberId}`, {
    method: "DELETE",
  });
  console.log("response delete", response);
  return response;
}

const exportFunctions = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};

export default exportFunctions;
