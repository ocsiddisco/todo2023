import toast from "react-hot-toast";

// const API_URL = "https://localhost:8000";

//api address for production
const API_URL = "https://todo-app-backend-8q6w.onrender.com";

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
    const token = data.token;
    sessionStorage.setItem("token", token);
    return true;
  } else {
    // Registration failed, handle errors
    const errorData = await response.json(); // Parse the error JSON
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
      toast.error("Incorrect credentials.");
    }
  } catch (error) {
    console.log(error);
  }
}

// SIGN OUT

async function signOut() {
  const token = sessionStorage.getItem("token");
  sessionStorage.removeItem("token");
  const response = await fetch(`${API_URL}/api/auth/signout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    return true;
  } else {
    const errorData = await response.json();
  }
}

// DELETE ACCOUNT
async function deleteAccount() {
  const token = sessionStorage.getItem("token");
  sessionStorage.removeItem("token");
  const response = await fetch(`${API_URL}/delete/user`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    toast.success("Account deleted!");
    return true;
  } else {
    const errorData = await response.json();
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
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_URL}/todos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const getTodos = await response.json();
  return getTodos;
}

// CREATE TODO
async function createTodo(newTask) {
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
    toast.error("Task could not be updated.");
  }
}

// DELETE TODO
async function deleteTodo(id) {
  const numberId = Number(id);
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
