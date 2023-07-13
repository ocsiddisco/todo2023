import React, { useState, useEffect } from "react";
import "./App.css";
import APIHelper from "./APIHelper.js";
import UpdateInput from "./UpdateInput";

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

  // delete
  const deleteTodo = async (e, id) => {
    try {
      e.stopPropagation();
      const deleted = await APIHelper.deleteTodo(id);
      setTodos(todos.filter(({ id: i }) => id !== i));
      if (deleted) {
        return console.log("it is deleted");
      }
    } catch (err) {
      console.log("error delete", err);
    }
  };

  // handle update from child component
  const handleUpdateTodo = (id, updatedTodo) => {
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  };

  return (
    <div className="App">
      <div>
        <input
          id="todo-input"
          type="text"
          value={newTask}
          onChange={({ target }) => setNewTask(target.value)}
        />
        <button type="button" onClick={createTodo}>
          Add
        </button>
      </div>

      <ul>
        {todos.map(({ id, task, completed }, i) => (
          <li
            key={i}
            // onClick={(e) => updateTodo(e, id)}
            // className={completed ? "completed" : ""}
          >
            <UpdateInput
              value={task}
              idTask={id}
              onUpdateTodo={handleUpdateTodo}
            />
            <span onClick={(e) => deleteTodo(e, id)}>X</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
