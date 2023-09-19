import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import { Icon } from "react-icons-kit";
import { trash2 } from "react-icons-kit/feather/trash2";
import { save } from "react-icons-kit/feather/save";
import toast from "react-hot-toast";

// Create an UpdateInput component
function UpdateInput(props) {
  console.log("here");
  const [updateTask, setUpdateTask] = useState("");
  const [showInputEle, setShowInputEle] = useState(false);

  // prepare for update task
  const handleClick = async (_, _id) => {
    setShowInputEle(true);
    setUpdateTask(props.value);
  };

  // handle key down on confirmation
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      updateTodo(e);
    }
  };

  // update
  const updateTodo = async (e) => {
    e.stopPropagation();

    if (!updateTask) {
      toast.error("Please enter your task.");
      return;
    }

    const payload = {
      todoID: props.todoID,
      todo: updateTask,
    };

    setShowInputEle(false);
    setUpdateTask(""); // setting back to empty here does not prevent the payload with data to be shared

    return props.onUpdateTodo(payload);
  };

  // delete
  const deleteTodo = async (e) => {
    const id = props.todoID;
    e.stopPropagation();
    return props.onDeleteTodo(id);
  };

  return (
    <>
      {showInputEle ? (
        <div className="container-update-input">
          <label for="Update todo" class="visuallyhidden">
            Update todo
          </label>
          <input
            className="update-input"
            type="text"
            value={updateTask}
            onChange={({ target }) => setUpdateTask(target.value)} // destructuring, get the target of the event
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button className="button-confirm" onClick={updateTodo}>
            <Icon size={24} icon={save} />
          </button>
        </div>
      ) : (
        <div className="container-task">
          {/* // onClick event to toggle showInputEle & assign props value for input field*/}
          <Tooltip title="Click to modify the task">
            <div className="display-task" onClick={handleClick}>
              {props.value}
            </div>
          </Tooltip>
          <Tooltip title="Delete" onClick={deleteTodo}>
            <button className="delete-task">
              <Icon size={20} icon={trash2} />
            </button>
          </Tooltip>
        </div>
      )}
    </>
  );
}

export default UpdateInput;
