import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import APIHelper from "../APIHelper";
import UpdateInput from "../components/UpdateInput";

function ListTodos() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const navigate = useNavigate();

  function checkToken() {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }

  // GET ALL TODOS OF A USER
  const fetchTodosAndSetTodos = async () => {
    checkToken();
    const listTodos = await APIHelper.getAllTodos();
    setTodos(listTodos);
  };

  useEffect(() => {
    fetchTodosAndSetTodos();
  }, []);

  // create a copy of the todos list and always returns it sorted by id
  const sortedList = useMemo(
    () => [...todos].sort((a, b) => b.todoID - a.todoID),
    [todos]
  );

  // handle key down on confirmation
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      createTodo(e);
    }
  };

  // FIND HIGHEST TODOID
  let maxId = 0;

  const findTodoID = async () => {
    if (!sortedList) {
      return maxId;
    }
    sortedList.forEach((todo) => {
      if (todo.todoID > maxId) {
        maxId = todo.todoID + 1;
      }
    });
    return maxId;
  };

  // CREATE TODO
  const createTodo = async (e) => {
    e.target.blur();
    e.preventDefault();

    if (!newTask) {
      toast.error("Please enter a task.");
      return;
    }
    try {
      const newId = await findTodoID();
      const addNewTodo = await APIHelper.createTodo(newTask);
      if (addNewTodo) {
        const newTodo = { todo: newTask, todoID: newId };
        setTodos([...todos, newTodo]);
      }

      setNewTask("");
    } catch (error) {
      console.log("createtodo", error);
    }
  };

  // HANDLE DELETE TODO from child component
  // find todo by todoID and delete todo

  const handleDeleteTodo = async (todoID) => {
    try {
      const deleteTodo = await APIHelper.deleteTodo(todoID);
      if (deleteTodo) {
        const newList = todos.filter((todo) => todo.todoID !== todoID);
        setTodos(newList);
      }
    } catch (err) {
      console.log("error delete", err);
    }
  };

  // HANDLE UPDATE TODO from child component
  // find todo by todoID and update todo

  const handleUpdateTodo = async (payload) => {
    try {
      const updatedTodo = await APIHelper.updateTodo(payload);
      if (updatedTodo) {
        let todoToUpdate = sortedList.findIndex(
          (todo) => todo.todoID === payload.todoID
        );
        sortedList[todoToUpdate].todo = payload.todo;
        setTodos(sortedList);
      } else {
        console.log("todo not updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-container-todo">
      <div className="container-input">
        <input
          id="todo-input"
          // ref={inputField}
          type="text"
          placeholder="Type a new task..."
          value={newTask}
          onChange={({ target }) => setNewTask(target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="button" className="button white" onClick={createTodo}>
          Add to the list
        </button>
      </div>
      <div className="container-todos">
        <ul>
          {sortedList.map(({ todoID, todo }, i) => (
            <li key={i}>
              <UpdateInput
                value={todo}
                todoID={todoID}
                onUpdateTodo={handleUpdateTodo}
                onDeleteTodo={handleDeleteTodo}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ListTodos;
