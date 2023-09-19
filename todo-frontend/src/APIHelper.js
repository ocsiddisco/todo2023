import toast from "react-hot-toast";

const API_URL = "https://localhost:8000";

//
//
//---------------------- USER ----------------------
//
//

// SIGN UP

async function signUp(username, email, password) {
  const response = await fetch(`${API_URL}/api/auth/signup`, {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
    // credentials: "include",
    headers: {
      "Content-Type": "application/json", // Set the appropriate content type header
    },
  });
  if (response.status === 201) {
    const data = await response.json();
    console.log("data in sign up", data);
    const token = data.token;
    sessionStorage.setItem("token", token);
    return true;
  } else {
    // Registration failed, handle errors
    const errorData = await response.json(); // Parse the error JSON
    console.error("Registration failed:", errorData);
    toast.error("Username already used.");
  }
}

// SIGN IN

async function signIn(username, email, password) {
  try {
    const response = await fetch(`${API_URL}/api/auth/signin`, {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      // credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      const token = data.token;
      sessionStorage.setItem("token", token);
      return true;
    } else {
      // Registration failed, handle errors
      const errorData = await response.json(); // Parse the error JSON
      console.error("Registration failed:", errorData);
      toast.error("Incorrect credentials.");
    }
  } catch (error) {
    console.log(error);
  }
}

// SIGN OUT

async function signOut() {
  console.log("start sign out");
  const token = sessionStorage.getItem("token");
  sessionStorage.removeItem("token");
  const response = await fetch(`${API_URL}/api/auth/signout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("getting back here", response);

  if (response.status === 200) {
    return true;
  } else {
    const errorData = await response.json();
    console.error("Registration failed:", errorData);
  }
}

// DELETE ACCOUNT
async function deleteAccount() {
  console.log("start deleting account");
  const token = sessionStorage.getItem("token");
  sessionStorage.removeItem("token");
  const response = await fetch(`${API_URL}/delete/user`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("getting back here", response);

  if (response.status === 200) {
    toast.success("Account deleted!");
    return true;
  } else {
    const errorData = await response.json();
    console.error("Registration failed:", errorData);
    toast.error("Account not deleted.");
  }
}

//
//
//---------------------- TODOS ----------------------
//
//

// FETCH ALL TODOS FOR X USER
async function getAllTodos() {
  console.log("getalltodos apihelper");
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_URL}/todos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const getTodos = await response.json();
  console.log("getAllTodos, getTodos", getTodos);
  return getTodos;
}

// CREATE TODO
async function createTodo(newTask) {
  console.log("apihelp task", newTask, typeof newTask);
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_URL}/todos`, {
    method: "POST",
    body: JSON.stringify({ todo: newTask }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 201) {
    return true;
  } else {
    console.log("to do not created");
    toast.error("Task could not be created.");
  }
}

// UPDATE TODO
async function updateTodo(payload) {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_URL}/todos`, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    return true;
  } else {
    console.log("todo not updated");
    toast.error("Task could not be updated.");
  }
}

// DELETE TODO
async function deleteTodo(id) {
  const numberId = Number(id);
  console.log("apihelper delete", typeof numberId, numberId);
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_URL}/todos`, {
    method: "DELETE",
    body: JSON.stringify({ todoID: numberId }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    toast.success("Task is now deleted.");

    return true;
  } else {
    console.log("todo not deleted");
    toast.error("Task could not be deleted.");
  }
}

const exportFunctions = {
  signUp,
  signIn,
  signOut,
  deleteAccount,
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};

export default exportFunctions;
