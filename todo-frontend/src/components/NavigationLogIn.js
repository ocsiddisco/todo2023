import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navForm">
      <div className="container-a">
        <NavLink className="navlink register" to="/">
          Register
        </NavLink>
      </div>
      <div className="container-a">
        <NavLink className="navlink signin" to="/signin">
          Sign In
        </NavLink>
      </div>
    </nav>
  );
}

export default Navigation;
