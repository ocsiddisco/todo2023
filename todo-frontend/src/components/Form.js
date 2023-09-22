import React, { useState } from "react";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

function Form(props) {
  const [icon, setIcon] = useState(eyeOff);
  const [type, setType] = useState("password");
  const [submitted, setSubmitted] = useState(false);

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

  // Function to validate email using regular expression
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // gather all credentials user
  const onInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "email" && submitted) {
      if (!validateEmail(value)) {
        return;
      }
    }

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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateEmail(credentials.email)) {
      setSubmitted(true);
      return;
    }

    setSubmitted(false); // Reset submitted state

    props.handleClick(credentials);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container-inputForm">
          <label className="visuallyhidden" htmlFor="username">
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
          <label className="visuallyhidden" htmlFor="email">
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
          <div className="container-error-message">
            {submitted && !validateEmail(credentials.email) && (
              <p className="error-message">
                Please enter a valid email address.
              </p>
            )}
          </div>
          <label className="visuallyhidden" htmlFor="password">
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
            type="submit"
            value="signUp"
            // onClick={() => props.handleClick(credentials)}
          >
            {props.textButton}
          </button>
        </div>
      </form>
    </>
  );
}

export default Form;
