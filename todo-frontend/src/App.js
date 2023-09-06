import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./App.css";
import APIHelper from "./APIHelper.js";
import UpdateInput from "./components/UpdateInput";
import "animate.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");

  // hooks to keep the focus on the inputfield: not working
  const inputField = useCallback((inputElement) => {
    console.log("got here");
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  //get all todos
  const fetchTodosAndSetTodos = async () => {
    const fetchTodos = await APIHelper.getAllTodos();
    setTodos(fetchTodos);
  };

  useEffect(() => {
    fetchTodosAndSetTodos();
  }, []);

  // create a copy of the todos list and always returns it sorted by id
  const sortedList = useMemo(
    () => [...todos].sort((a, b) => b.id - a.id),
    [todos]
  );

  // handle key down on confirmation
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      createTodo(e);
    }
  };

  // create
  const createTodo = async (e) => {
    console.log("in create todo", newTask, typeof newTask);
    e.target.blur();
    e.preventDefault();

    if (!newTask) {
      alert("please enter something");
      return;
    }

    const addNewTodo = await APIHelper.createTodo(newTask);
    console.log("new todo", addNewTodo);
    if (addNewTodo) {
      setTodos([...todos, addNewTodo]);
    }
    setNewTask("");
    console.log("list updated");
  };

  // handle delete from child component
  const handleDeleteTodo = async (id) => {
    try {
      const deleted = await APIHelper.deleteTodo(id);
      if (deleted) {
        setTodos(todos.filter(({ id: i }) => id !== i));
        console.log("it is deleted");
      }
    } catch (err) {
      console.log("error delete", err);
    }
  };

  // handle update from child component
  const handleUpdateTodo = async (payload) => {
    console.log("2", payload);
    const updatedTodo = await APIHelper.updateTodo(payload);
    console.log("4", updatedTodo);
    console.log(typeof updatedTodo.id);
    console.log(todos);
    // if (updatedTodo) {
    //   console.log("Updating todo:", updatedTodo);

    //   const updatingList = todos.filter((todo) =>
    //     todo.id === updatedTodo.id ? updatedTodo.task : todo.task
    //   );
    //   console.log("Updated list:", updatingList);

    //   setTodos(updatingList);
    // }

    // fetchTodosAndSetTodos();
    if (updatedTodo) {
      setTodos(
        todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      );
    }
  };

  return (
    <div className="App animate__animated animate__fadeIn animate__slower">
      <div className="title">To Do List</div>
      <div className="container-input">
        <input
          id="todo-input"
          ref={inputField}
          type="text"
          placeholder="Type a new task..."
          value={newTask}
          onChange={({ target }) => setNewTask(target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="button" onClick={createTodo}>
          Add to the list
        </button>
      </div>

      <ul className="">
        {sortedList.map(({ id, task }, i) => (
          <li key={i}>
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
