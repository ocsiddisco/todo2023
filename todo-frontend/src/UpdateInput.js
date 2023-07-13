import React, { useState } from "react";
import APIHelper from "./APIHelper.js";

// Create an UpdateInput component
function UpdateInput(props) {
  console.log("here");

  const [updateTask, setUpdateTask] = useState("");
  const [showInputEle, setShowInputEle] = useState(false);

  const handleClick = async (_, _id) => {
    setShowInputEle(true);
  };

  const updateTodo = async (e, id) => {
    e.stopPropagation();
    console.log("input id", id, typeof id);
    const payload = {
      task: updateTask,
    };
    const updatedTodo = await APIHelper.updateTodo(id, payload);
    setShowInputEle(false);
    setUpdateTask("");
    console.log("updatedTodo in update input", updatedTodo);
    return props.onUpdateTodo(id, updatedTodo);
  };

  return (
    <span>
      {showInputEle ? (
        <div>
          <input
            type="text"
            value={updateTask}
            onChange={(e) => setUpdateTask(e.target.value)}
            autoFocus
          />
          <button onClick={(e) => updateTodo(e, props.idTask)}>confirm</button>
        </div>
      ) : (
        <span
          style={{
            display: "inline-block",
            height: "25px",
            minWidth: "300px",
          }}
          onClick={handleClick} // onClick event to toggle showInputEle
        >
          {props.value} {props.idTask}
        </span>
      )}
    </span>
  );
}

export default UpdateInput;
