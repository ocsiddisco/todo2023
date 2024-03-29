import React from "react";
import APIHelper from "../APIHelper";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  function checkToken() {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }
  checkToken();

  //
  //
  //---------------------- USER ----------------------
  //
  //

  //
  // SIGN OUT USER
  //

  const handleSignOut = async () => {
    try {
      const signedOut = await APIHelper.signOut();

      if (signedOut) {
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //
  // DELETE USER
  //

  const handleDeleteAccount = async () => {
    try {
      const deleteUser = await APIHelper.deleteAccount();
      if (deleteUser) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container-logout-outside">
        <div className="container-logout-inside">
          <p>See you soon!</p>
          <button className="button" onClick={handleSignOut}>
            Sign out
          </button>
          <button className="buttonDeleteAccount" onClick={handleDeleteAccount}>
            Delete your account
          </button>
        </div>
      </div>
    </>
  );
}

export default Logout;
