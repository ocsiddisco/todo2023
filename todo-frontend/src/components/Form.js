import React, { useState } from "react";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

function Form(props) {
  const [icon, setIcon] = useState(eyeOff);
  const [type, setType] = useState("password");

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  // handle key down on confirmation
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onInputChange(e);
    }
  };
  // gather all credentials user
  const onInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  // handle visibily password for user
  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  return (
    <>
      <form>
        <div className="container-inputForm">
          <label className="visuallyhidden" for="username">
            Username
          </label>
          <input
            className="inputForm"
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            onKeyDown={handleKeyDown}
            onChange={onInputChange}
            required
          />
          <label className="visuallyhidden" for="email">
            Email
          </label>
          <input
            className="inputForm"
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            onKeyDown={handleKeyDown}
            onChange={onInputChange}
            required
          />
          <label className="visuallyhidden" for="password">
            Password
          </label>
          <div className="input-password">
            <input
              className="inputForm"
              type={type}
              name="password"
              id="password"
              placeholder="Password"
              required
              onChange={onInputChange}
              onKeyDown={handleKeyDown}
            />
            <button className="" onClick={handleToggle}>
              <Icon className="" icon={icon} size={25} />
            </button>
          </div>
        </div>
        <div className="container-buttonForm">
          <button
            className="button"
            type="button"
            value="signUp"
            onClick={() => props.handleClick(credentials)}
          >
            {props.textButton}
          </button>
        </div>
      </form>
    </>
  );
}

export default Form;
