import React, { useEffect, useState } from "react";
import "animate.css";
import Register from "./components/Register";
import ListTodos from "./ListTodos";

function App() {
  const [userId, setUserID] = useState(null);

  const CallbackHandler = () => {
    useEffect(() => {
      console.log("fot heres");
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const getUserId = urlParams.get("userId");
      console.log("getUserId", getUserId);
      setUserID(getUserId);
    }, []);
  };

  CallbackHandler();

  return (
    <div className="App animate__animated animate__fadeIn animate__slower">
      <div className="title">To Do List</div>
      {!userId ? <Register /> : <ListTodos userId={userId} />}
    </div>
  );
}

export default App;
