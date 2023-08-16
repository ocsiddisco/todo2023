import React, { useState, useEffect } from "react";
import "./App.css";
import APIHelper from "./APIHelper.js";
import UpdateInput from "./UpdateInput";
import "animate.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");

  //get all todos
  useEffect(() => {
    const fetchTodoAndSetTodos = async () => {
      const todos = await APIHelper.getAllTodos();
      setTodos(todos);
    };
    fetchTodoAndSetTodos();
  }, []);

  // create
  const createTodo = async (e) => {
    console.log("in create todo", newTask, typeof newTask);

    e.preventDefault();

    if (!newTask) {
      alert("please enter something");
      return;
    }

    const addNewTodo = await APIHelper.createTodo(newTask);
    if (addNewTodo) {
      setTodos([...todos, addNewTodo]);
    }
    setNewTask("");
    return console.log("list updated");
  };

  // handle delete from child component
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(({ id: i }) => id !== i));
  };

  // handle update from child component
  const handleUpdateTodo = (id, updatedTodo) => {
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  };

  return (
    <div className="App">
      <div className="title">To Do List</div>
      <div className="container-input">
        <input
          id="todo-input"
          type="text"
          placeholder="Type a new task..."
          value={newTask}
          onChange={({ target }) => setNewTask(target.value)}
        />
        <button type="button" onClick={createTodo}>
          Add to the list
        </button>
      </div>

      <ul>
        {todos.map(({ id, task }, i) => (
          <li
            key={i}
            className="animate__animated animate__fadeInUp animate__delay-0.5s"
          >
            <UpdateInput
              value={task}
              idTask={id}
              onUpdateTodo={handleUpdateTodo}
              onDeleteTodo={handleDeleteTodo}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
