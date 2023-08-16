import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import APIHelper from "./APIHelper.js";

// Create an UpdateInput component
function UpdateInput(props) {
  console.log("here");

  const [updateTask, setUpdateTask] = useState("");
  const [showInputEle, setShowInputEle] = useState(false);

  const handleClick = async (_, _id) => {
    setShowInputEle(true);
  };

  // update
  const updateTodo = async (e, id) => {
    e.stopPropagation();
    console.log("input id", id, typeof id);
    const payload = {
      task: updateTask,
    };

    if (!updateTask) {
      alert("please enter something");
      return;
    }
    const updatedTodo = await APIHelper.updateTodo(id, payload);
    setShowInputEle(false);
    setUpdateTask("");
    console.log("updatedTodo in update input", updatedTodo);
    return props.onUpdateTodo(id, updatedTodo);
  };

  // delete
  const deleteTodo = async (e, id) => {
    console.log("id delete updateinput", id);
    try {
      e.stopPropagation();
      const deleted = await APIHelper.deleteTodo(id);
      if (deleted) {
        console.log("it is deleted");
        return props.onDeleteTodo(id);
      }
    } catch (err) {
      console.log("error delete", err);
    }
  };

  return (
    <>
      {showInputEle ? (
        <div className="container-update-input">
          <input
            className="update-input"
            type="text"
            placeholder={props.value}
            value={updateTask}
            onChange={(e) => setUpdateTask(e.target.value)}
            autoFocus
          />
          <button
            className="button-confirm"
            onClick={(e) => updateTodo(e, props.idTask)}
          >
            confirm
          </button>
        </div>
      ) : (
        <div className="container-task">
          {/* // onClick event to toggle showInputEle */}
          <Tooltip title="Click to modify the task">
            <div className="display-task" onClick={handleClick}>
              {props.value}
            </div>
          </Tooltip>
          <div className="delete-task">
            <Tooltip
              title="Delete"
              onClick={(e) => deleteTodo(e, props.idTask)}
            >
              X
            </Tooltip>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateInput;
