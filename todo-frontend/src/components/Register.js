import React from "react";
import jwtDecode from "jwt-decode";

function Register() {
  // const handleRegisterUser = async (e) => {
  //   const createUser = await APIHelperUser.createUser();
  //   if (!createUser) {
  //     alert("the register did not success. Please try again");
  //   }
  // else I want them to be redirected to the todo page
  return (
    <>
      <div>
        <h4>Register</h4>
        <a href="https://localhost:8000/auth/google">Login in google</a>
      </div>
    </>
  );
}

export default Register;
