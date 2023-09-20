import React from "react";
import { useNavigate } from "react-router-dom";

import Form from "../components/Form";
import NavigationLogIn from "../components/NavigationLogIn";
import APIHelper from "../APIHelper";

function Register() {
  const navigate = useNavigate();

  const handleClick = async (credentials) => {
    try {
      const response = await APIHelper.signUp(
        credentials.username,
        credentials.email,
        credentials.password
      );
      if (response) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container-formOutside">
        <div className="container-formInside">
          <NavigationLogIn />
          <Form handleClick={handleClick} textButton={"Register"} />
        </div>
      </div>
    </>
  );
}

export default Register;
