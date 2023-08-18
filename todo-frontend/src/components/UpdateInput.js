import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";

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
      alert("Please enter something");
      return;
    }

    const payload = {
      id: props.idTask,
      task: updateTask,
    };

    setShowInputEle(false);
    setUpdateTask(""); // setting back to empty here does not prevent the payload with data to be shared

    return props.onUpdateTodo(payload);
  };

  // delete
  const deleteTodo = async (e) => {
    const id = props.idTask;
    e.stopPropagation();
    return props.onDeleteTodo(id);
  };

  return (
    <>
      {showInputEle ? (
        <div className="container-update-input">
          <input
            className="update-input"
            type="text"
            value={updateTask}
            onChange={({ target }) => setUpdateTask(target.value)} // destructuring, get the target of the event
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button className="button-confirm" onClick={updateTodo}>
            Confirm
          </button>
        </div>
      ) : (
        <div className="container-task">
          {/* // onClick event to toggle showInputEle & assign props value for input field*/}
          <Tooltip title="Click to modify the task">
            <div className="display-task" onClick={handleClick}>
              {props.idTask}
              {props.value}
            </div>
          </Tooltip>
          <div className="delete-task">
            <Tooltip title="Delete" onClick={deleteTodo}>
              X
            </Tooltip>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateInput;
