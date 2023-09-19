import React from "react";
import { useNavigate } from "react-router-dom";

import Form from "../components/Form";
import NavigationLogIn from "../components/NavigationLogIn";
import APIHelper from "../APIHelper";

function SignIn() {
  const navigate = useNavigate();

  const handleClick = async (credentials) => {
    console.log("regiser", credentials);

    const response = await APIHelper.signIn(
      credentials.username,
      credentials.email,
      credentials.password
    );
    if (response) {
      console.log("register response", response);
      navigate("/");
    }
  };

  return (
    <>
      <div className="container-formOutside">
        <div className="container-formInside">
          <NavigationLogIn />
          <Form handleClick={handleClick} textButton={"Sign In"} />
        </div>
      </div>
    </>
  );
}

export default SignIn;